import { Request, Response } from "express";
import { getRecord } from "../../../api/controllers/airtableController/record/getRecord";
import {
  typePayload,
  typeResult,
  typeResultData,
  typeResultError,
} from "../../../api/endpoints/airtableEndpoint/record/get";

export async function recordGet({
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

  try {
    const record = await getRecord({
      tableId,
      recordId,
    });

    data = {
      tableId,
      recordId,
      data: record,
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
