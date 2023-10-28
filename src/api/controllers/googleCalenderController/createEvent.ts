import { google } from "googleapis";
import { getAuth } from "../../../services/authService";

export async function createEvent({
  summary,
  description,
  start,
  end,
}: {
  summary: string;
  description: string;
  start: string;
  end: string;
}) {
  const timeZone = "Asia/Kolkata";
  const event = buildEventObject(summary, description, start, end, timeZone);

  const calendar = google.calendar({ version: "v3", auth: getAuth() });
  const response = await insertEvent(calendar, event);

  return response.data;
}

function buildEventObject(
  summary: string,
  description: string,
  start: string,
  end: string,
  timeZone: string
) {
  return {
    summary,
    description,
    start: {
      dateTime: start,
      timeZone,
    },
    end: {
      dateTime: end,
      timeZone,
    },
  };
}

async function insertEvent(calendar: any, event: any) {
  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });

    return response;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
}
