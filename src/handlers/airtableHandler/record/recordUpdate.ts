import { Request, Response } from "express";
import { updateRecord } from "../../../api/controllers/airtableController/record/updateRecord";
import {
  typePayload,
  typeResult,
  typeResultData,
  typeResultError,
} from "../../../api/endpoints/airtableEndpoint/record/update";

export async function recordUpdate({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  const tableId: typePayload["tableId"] = req.body.tableId;
  const recordId: typePayload["recordId"] = req.body.recordId;
  const field: typePayload["field"] = req.body.field;

  try {
    const record = await updateRecord({
      tableId,
      recordId,
      field,
    });

    data = {
      isUpdated: true,
      tableId,
      recordId,
    };
  } catch (err: any) {
    console.log("err: ", err);
    res.status(err.statusCode);
    error = {
      code: err.error,
      message: err.message,
    };
  }

  return { data, error };
}
