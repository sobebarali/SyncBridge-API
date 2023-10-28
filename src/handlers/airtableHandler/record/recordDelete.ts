import { Request, Response } from "express";
import { deleteRecord } from "../../../api/controllers/airtableController/record/deleteRecord";
import {
  typePayload,
  typeResult,
  typeResultData,
  typeResultError,
} from "../../../api/endpoints/airtableEndpoint/record/delete";

export async function recordDelete({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  const tableId: typePayload["tableId"] = req.body.tableId;
  const recordIds: typePayload["recordIds"] = req.body.recordIds;

  try {
    const record = await deleteRecord({
      tableId,
      recordIds,
    });

    data = {
      isDeleted: true,
      tableId,
      recordIds: record.map((record) => record.id),
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
