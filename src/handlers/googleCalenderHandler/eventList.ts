import { Request, Response } from "express";
import { listEvent } from "../../controllers/googleCalenderController/listEvent";

export async function eventList(req: Request, res: Response) {
  try {
    const { calendarId, timeMin, maxResults, singleEvents, orderBy } = req.body;

    const events = await listEvent({
      calendarId,
      timeMin,
      maxResults,
      singleEvents,
      orderBy,
    });

    let data = events?.items?.map((event) => {
      return {
        id: event.id,
        summary: event.summary,
        description: event.description,
        start: event.start,
        end: event.end,
        htmlLink: event.htmlLink,
      };
    });

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error listing events", error);
    res.status(500).send({
      error,
      message: "Internal server error",
    });
  }
}
