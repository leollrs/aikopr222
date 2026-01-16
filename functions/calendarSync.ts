import { createClientFromRequest } from "npm:@base44/sdk@0.8.6";

const TZ = "America/New_York";
const ADMIN_ONLY = false;

function requireString(val, name) {
  if (typeof val !== "string" || !val.trim()) {
    throw new Error(`Missing or invalid "${name}"`);
  }
  return val.trim();
}

function getTimeZoneOffsetMinutes(date, timeZone) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = dtf.formatToParts(date);
  const tzName = parts.find((p) => p.type === "timeZoneName")?.value || "GMT";

  const m = tzName.match(/GMT([+-])(\d{1,2})(?::?(\d{2}))?/i);
  if (!m) return 0;

  const sign = m[1] === "-" ? -1 : 1;
  const hours = parseInt(m[2], 10) || 0;
  const mins = parseInt(m[3] || "0", 10) || 0;
  return sign * (hours * 60 + mins);
}

function localTimeInTZToUtcIso(dateStr, timeStr, timeZone) {
  const [y, mo, d] = dateStr.split("-").map(Number);
  const [hh, mm, ss] = timeStr.split(":").map((n) => Number(n));

  const naiveUtc = new Date(Date.UTC(y, (mo || 1) - 1, d || 1, hh || 0, mm || 0, ss || 0));
  const offsetMin = getTimeZoneOffsetMinutes(naiveUtc, timeZone);
  const trueUtc = new Date(naiveUtc.getTime() - offsetMin * 60 * 1000);

  return trueUtc.toISOString();
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    if (ADMIN_ONLY) {
      const user = await base44.auth.me();
      if (!user || user.role !== "admin") {
        return Response.json({ ok: false, error: "Forbidden: Admin access required" });
      }
    }

    const body = await req.json();
    const action = requireString(body.action, "action");

    const accessToken = await base44.asServiceRole.connectors.getAccessToken("googlecalendar");

    if (action === "checkAvailability") {
      const date = requireString(body.date, "date");

      const timeMin = localTimeInTZToUtcIso(date, "00:00:00", TZ);
      const timeMax = localTimeInTZToUtcIso(date, "23:59:59", TZ);

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
      const busySlots = freeBusyData?.calendars?.primary?.busy || [];

      return Response.json({ ok: true, busySlots, timeZone: TZ });
    }

    if (action === "createEvent") {
      const date = requireString(body.date, "date");
      const startTime = requireString(body.startTime, "startTime"); // "HH:MM"
      const endTime = requireString(body.endTime, "endTime");       // "HH:MM"

      const services = Array.isArray(body.services) ? body.services : [];
      const clientName = requireString(body.clientName, "clientName");
      const clientEmail = requireString(body.clientEmail, "clientEmail");
      const clientPhone = requireString(body.clientPhone, "clientPhone");

      const timeMin = localTimeInTZToUtcIso(date, `${startTime}:00`, TZ);
      const timeMax = localTimeInTZToUtcIso(date, `${endTime}:00`, TZ);

      // conflict check
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
      const conflicts = freeBusyData?.calendars?.primary?.busy || [];

      if (conflicts.length > 0) {
        return Response.json({
          ok: true,
          conflict: true,
          error: "Time slot no longer available",
        });
      }

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
        start: { dateTime: timeMin, timeZone: TZ },
        end: { dateTime: timeMax, timeZone: TZ },
      };

      const createResponse = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        }
      );

      if (!createResponse.ok) {
        const txt = await createResponse.text().catch(() => "");
        return Response.json({
          ok: false,
          error: `Failed to create calendar event: ${createResponse.status} ${txt}`,
        });
      }

      const createdEvent = await createResponse.json();
      return Response.json({ ok: true, success: true, eventId: createdEvent?.id });
    }

    // ✅ never return 400
    return Response.json({ ok: false, error: "Invalid action" });
  } catch (error) {
    // ✅ never return 500
    return Response.json({
      ok: false,
      error: error?.message ? error.message : String(error),
    });
  }
});