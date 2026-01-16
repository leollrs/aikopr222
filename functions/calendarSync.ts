import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { action, date, startTime, endTime, services, clientName, clientEmail, clientPhone } = await req.json();

    const accessToken = await base44.asServiceRole.connectors.getAccessToken("googlecalendar");

    if (action === "checkAvailability") {
      // Fetch free/busy info for the selected date
      const dateObj = new Date(date);
      const timeMin = new Date(dateObj.setHours(0, 0, 0, 0)).toISOString();
      const timeMax = new Date(dateObj.setHours(23, 59, 59, 999)).toISOString();

      const freeBusyResponse = await fetch(
        "https://www.googleapis.com/calendar/v3/freeBusy",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            timeMin,
            timeMax,
            items: [{ id: "primary" }],
          }),
        }
      );

      if (!freeBusyResponse.ok) {
        throw new Error("Failed to fetch calendar availability");
      }

      const freeBusyData = await freeBusyResponse.json();
      const busySlots = freeBusyData.calendars?.primary?.busy || [];

      return Response.json({ busySlots });
    }

    if (action === "createEvent") {
      // Check for conflicts one more time before creating
      const eventStart = new Date(`${date}T${startTime}:00`);
      const eventEnd = new Date(`${date}T${endTime}:00`);

      const freeBusyResponse = await fetch(
        "https://www.googleapis.com/calendar/v3/freeBusy",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            timeMin: eventStart.toISOString(),
            timeMax: eventEnd.toISOString(),
            items: [{ id: "primary" }],
          }),
        }
      );

      if (!freeBusyResponse.ok) {
        throw new Error("Failed to check conflicts");
      }

      const freeBusyData = await freeBusyResponse.json();
      const conflicts = freeBusyData.calendars?.primary?.busy || [];

      if (conflicts.length > 0) {
        return Response.json({ error: "Time slot no longer available", conflict: true }, { status: 409 });
      }

      // Create the event
      const servicesList = services.map(s => `${s.nameEn} (${s.duration})`).join(", ");
      
      const event = {
        summary: `Appointment – ${servicesList}`,
        description: `Client: ${clientName}\nPhone: ${clientPhone}\nEmail: ${clientEmail}\n\nServices:\n${servicesList}`,
        start: {
          dateTime: eventStart.toISOString(),
          timeZone: "America/Puerto_Rico",
        },
        end: {
          dateTime: eventEnd.toISOString(),
          timeZone: "America/Puerto_Rico",
        },
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
        throw new Error("Failed to create calendar event");
      }

      const createdEvent = await createResponse.json();

      return Response.json({ success: true, eventId: createdEvent.id });
    }

    return Response.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});