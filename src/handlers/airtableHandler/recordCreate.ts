import { Request, Response } from "express";
import { createRecord } from "../../controllers/airtableController/createRecord";

export async function recordCreate(req: Request, res: Response) {
  try {
    const { table, data } = req.body;

    if (!table || !data) {
      return res
        .status(400)
        .json({ error: "Table and data are required in the request body." });
    }

    const recordsResult = await createRecord(table, data);
 
    res.status(200).json({ recordsResult });
  } catch (error) {
    console.error("Error creating record", error);
    res.status(500).send({
      error,
      message: "Internal server error",
    });
  }
}
