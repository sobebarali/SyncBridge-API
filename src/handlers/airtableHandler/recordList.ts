import { Request, Response } from "express";
import { listRecord } from "../../controllers/airtableController/listRecord";

export async function recordList(req: Request, res: Response) {
  try {
    const { table } = req.body;

    if (!table) {
      return res
        .status(400)
        .json({ error: "Table is required in the request body." });
    }

    const records = await listRecord(table);

    let data = records?.map((record) => {
      return {
        id: record.id,
        fields: record.fields,
      };
    })

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error listing records", error);
    res.status(500).send({
      error,
      message: "Internal server error",
    });
  }
}
