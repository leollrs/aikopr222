import { createClientFromRequest } from "npm:@base44/sdk@0.8.6";

// Puerto Rico shares time with New York; this is a safe IANA TZ
const TZ = "America/New_York";

// If true: only admin can call. If your booking page is public, keep FALSE.
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

    // Optional admin gate
    if (ADMIN_ONLY) {
      const user = await base44.auth.me();
      if (!user || user.role !== "admin") {
        return Response.json({ error: "Forbidden: Admin access required" }, { status: 403 });
      }
    }

    const body = await req.json();

    const action = requireString(body.action, "action");
    const date =
      action === "checkAvailability" || action === "createEvent"
        ? requireString(body.date, "date")
        : "";

    const accessToken = await base44.asServiceRole.connectors.getAccessToken("googlecalendar");

    // -------------------------
    // ACTION: checkAvailability
    // -------------------------
    if (action === "checkAvailability") {
      // IMPORTANT: Use local date-time strings + pass timeZone.
      // Avoid toISOString() here (it converts to UTC and can shift the day).
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
        throw new Error(`Failed to fetch calendar availability: ${freeBusyResponse.status} ${txt}`);
      }

      const freeBusyData = await freeBusyResponse.json();
      const busySlots = (freeBusyData && freeBusyData.calendars && freeBusyData.calendars.primary && freeBusyData.calendars.primary.busy) || [];

      return Response.json({ busySlots, timeZone: TZ });
    }

    // -------------------------
    // ACTION: createEvent
    // -------------------------
    if (action === "createEvent") {
      const startTime = requireString(body.startTime, "startTime"); // "HH:MM"
      const endTime = requireString(body.endTime, "endTime");       // "HH:MM"

      const services = Array.isArray(body.services) ? body.services : [];
      const clientName = requireString(body.clientName, "clientName");
      const clientEmail = requireString(body.clientEmail, "clientEmail");
      const clientPhone = requireString(body.clientPhone, "clientPhone");

      const timeMin = `${date}T${startTime}:00`;
      const timeMax = `${date}T${endTime}:00`;

      // 1) Conflict check immediately before creating
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
        throw new Error(`Failed to check conflicts: ${freeBusyResponse.status} ${txt}`);
      }

      const freeBusyData = await freeBusyResponse.json();
      const conflicts = (freeBusyData && freeBusyData.calendars && freeBusyData.calendars.primary && freeBusyData.calendars.primary.busy) || [];

      if (conflicts.length > 0) {
        return Response.json({ error: "Time slot no longer available", conflict: true }, { status: 409 });
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
        throw new Error(`Failed to create calendar event: ${createResponse.status} ${txt}`);
      }

      const createdEvent = await createResponse.json();
      return Response.json({ success: true, eventId: createdEvent && createdEvent.id });
    }

    return Response.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error && error.message ? error.message : String(error) }, { status: 500 });
  }
});