import { google } from "googleapis";
import { getAuth } from "../../../services/authService";

export async function listEvent({
  calendarId,
  timeMin,
  maxResults,
  singleEvents,
  orderBy,
}: {
  calendarId?: string;
  timeMin?: string;
  maxResults?: number;
  singleEvents?: boolean;
  orderBy?: string;
}) {
  try {
    const calendar = google.calendar({ version: "v3", auth: getAuth() });
    const response = await calendar.events.list({
      calendarId: calendarId || "primary",
      timeMin: timeMin || new Date().toISOString(),
      maxResults: maxResults || 10,
      singleEvents: singleEvents || true,
      orderBy: orderBy || "startTime",
    });

    return response.data;
  } catch (error) {
    console.error("Error listing events:", error);
    throw error;
  }
}
