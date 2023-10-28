import { Request, Response } from "express";
import { createEvent } from "../../api/controllers/googleCalenderController/createEvent";

export async function eventCreate(req: Request, res: Response) {
  try {
    const { summary, description, start, end } = req.body;

    if (!summary || !start || !end) {
      return res.status(400).json({
        error: "Summary, start, and end are required in the request body.",
      });
    }

    const event = await createEvent({
      summary,
      description,
      start,
      end,
    });

    let data = {
      id: event.id,
      summary: event.summary,
      description: event.description,
      start: event.start,
      end: event.end,
      htmlLink: event.htmlLink,
    };

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error creating event", error);
    res.status(500).send({
      error,
      message: "Internal server error",
    });
  }
}
