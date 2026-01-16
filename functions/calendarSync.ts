import { createClientFromRequest } from "npm:@base44/sdk@0.8.6";

const TZ = "America/New_York";
const ADMIN_ONLY = false;

function requireString(val, name) {
  if (typeof val !== "string" || !val.trim()) {
    throw new Error(`Missing or invalid "${name}"`);
  }
  return val.trim();
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    if (ADMIN_ONLY) {
      const user = await base44.auth.me();
      if (!user || user.role !== "admin") {
        // ✅ Return 200 with error payload to avoid invoke() throwing
        return Response.json({ ok: false, error: "Forbidden: Admin access required" });
      }
    }

    const body = await req.json();
    const action = requireString(body.action, "action");

    const accessToken = await base44.asServiceRole.connectors.getAccessToken("googlecalendar");

    // -------------------------
    // ACTION: checkAvailability
    // -------------------------
    if (action === "checkAvailability") {
      const date = requireString(body.date, "date");

      // ✅ Use local dateTime strings + explicit TZ
      const timeMin = `${date}T00:00:00`;
      const timeMax = `${date}T23:59:59`;

      const freeBusyResponse = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timeMin,
          timeMax,
          timeZone: TZ,
          items: [{ id: "primary" }],
        }),
      });

      if (!freeBusyResponse.ok) {
        const txt = await freeBusyResponse.text().catch(() => "");
        return Response.json({
          ok: false,
          error: `Failed to fetch availability: ${freeBusyResponse.status} ${txt}`,
        });
      }

      const freeBusyData = await freeBusyResponse.json();
      const busySlots =
        (freeBusyData &&
          freeBusyData.calendars &&
          freeBusyData.calendars.primary &&
          freeBusyData.calendars.primary.busy) ||
        [];

      return Response.json({ ok: true, busySlots, timeZone: TZ });
    }

    // -------------------------
    // ACTION: createEvent
    // -------------------------
    if (action === "createEvent") {
      const date = requireString(body.date, "date");
      const startTime = requireString(body.startTime, "startTime");
      const endTime = requireString(body.endTime, "endTime");

      const services = Array.isArray(body.services) ? body.services : [];
      const clientName = requireString(body.clientName, "clientName");
      const clientEmail = requireString(body.clientEmail, "clientEmail");
      const clientPhone = requireString(body.clientPhone, "clientPhone");

      const timeMin = `${date}T${startTime}:00`;
      const timeMax = `${date}T${endTime}:00`;

      // 1) Conflict check (IMPORTANT: return 200 even if conflict)
      const freeBusyResponse = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timeMin,
          timeMax,
          timeZone: TZ,
          items: [{ id: "primary" }],
        }),
      });

      if (!freeBusyResponse.ok) {
        const txt = await freeBusyResponse.text().catch(() => "");
        return Response.json({
          ok: false,
          error: `Failed to check conflicts: ${freeBusyResponse.status} ${txt}`,
        });
      }

      const freeBusyData = await freeBusyResponse.json();
      const conflicts =
        (freeBusyData &&
          freeBusyData.calendars &&
          freeBusyData.calendars.primary &&
          freeBusyData.calendars.primary.busy) ||
        [];

      if (conflicts.length > 0) {
        // ✅ No 409. Return 200 so Base44 invoke doesn't throw.
        return Response.json({
          ok: true,
          conflict: true,
          error: "Time slot no longer available",
        });
      }

      // 2) Build services list
      const servicesList = services
        .map((s) => {
          const name = String((s && (s.nameEn || s.nameEs)) || "Service");
          const dur = String((s && s.duration) || "").trim();
          return dur ? `${name} (${dur})` : name;
        })
        .join(", ");

      const event = {
        summary: servicesList ? `Appointment – ${servicesList}` : "Appointment",
        description:
          `Client: ${clientName}\n` +
          `Phone: ${clientPhone}\n` +
          `Email: ${clientEmail}\n\n` +
          (servicesList ? `Services:\n${servicesList}` : ""),
        start: {
          dateTime: timeMin,
          timeZone: TZ,
        },
        end: {
          dateTime: timeMax,
          timeZone: TZ,
        },
      };

      // 3) Create event
      const createResponse = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (!createResponse.ok) {
        const txt = await createResponse.text().catch(() => "");
        return Response.json({
          ok: false,
          error: `Failed to create calendar event: ${createResponse.status} ${txt}`,
        });
      }

      const createdEvent = await createResponse.json();
      return Response.json({ ok: true, success: true, eventId: createdEvent && createdEvent.id });
    }

    return Response.json({ ok: false, error: "Invalid action" });
  } catch (error) {
    return Response.json({
      ok: false,
      error: error && error.message ? error.message : String(error),
    });
  }
});