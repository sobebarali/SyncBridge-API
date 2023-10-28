import { Request, Response } from "express";
import Joi, { ValidationError } from "joi";
import runValidation from "../../../../utils/runValidation";
import { recordList } from "../../../../handlers/airtableHandler/record/recordList";

export type typePayload = { tableId: string; };

export type typeResultData = {
  tableId: string;
  data: any;
};

export type typeResultError = {
  code: string;
  message: string;
  validationError?: ValidationError;
  details?: Object;
};

export type typeResult = {
  data: null | typeResultData;
  error: null | typeResultError;
  meta?: null | Object;
};

export default async function endpointRecordList(
  req: Request,
  res: Response
): Promise<any> {
  if (req?.body?.["tableId"] === "" || req?.body?.["tableId"] === null) {
    delete req?.body?.["tableId"];
  }

  let schema = Joi.object({
    tableId: Joi.string().required(),
  });

  let validationResult = runValidation({
    payload: req.body,
    schema,
  });

  if (typeof validationResult.error !== "undefined") {
    res.status(400);
    res.send({ error: validationResult.error });
  } else {
    let result = await recordList({ req, res });
    res.send(result);
  }
}
