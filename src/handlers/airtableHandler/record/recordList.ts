import { Request, Response } from "express";
import { listRecord } from "../../../api/controllers/airtableController/record/listRecord";
import {
  typePayload,
  typeResult,
  typeResultData,
  typeResultError,
} from "../../../api/endpoints/airtableEndpoint/record/list";

export async function recordList({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  const tableId: typePayload["tableId"] = req.body.tableId;


  try {
    const record = await listRecord({
      tableId,
    });

    data = {
      tableId,
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
