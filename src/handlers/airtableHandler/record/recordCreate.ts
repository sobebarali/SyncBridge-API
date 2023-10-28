import { Request, Response } from "express";
import { createRecord } from "../../../api/controllers/airtableController/record/createRecord";
import {
  typePayload,
  typeResult,
  typeResultData,
  typeResultError,
} from "../../../api/endpoints/airtableEndpoint/record/create";

export async function recordCreate({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  const tableId: typePayload["tableId"] = req.body.tableId;
  const fields: typePayload["fields"] = req.body.fields;

  try {
    const record = await createRecord({
      tableId,
      fields,
    });

    data = {
      isCreated: true,
      tableId,
      recordIds: record.map((record) => record.id),
    };
  } catch (err: any) {
    console.log("error", err);
    res.status(err.statusCode);
    error = {
      code: err.error,
      message: err.message,
    };
  }

  return { data, error };
}
