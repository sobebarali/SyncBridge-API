import { Request, Response } from "express";
import Joi, { ValidationError } from "joi";
import runValidation from "../../../../utils/runValidation";
import { recordGet } from "../../../../handlers/airtableHandler/record/recordGet";

export type typePayload = { tableId: string; recordId: string };

export type typeResultData = {
  tableId: string;
  recordId: string;
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

export default async function endpointRecordGet(
  req: Request,
  res: Response
): Promise<any> {
  if (req?.body?.["tableId"] === "" || req?.body?.["tableId"] === null) {
    delete req?.body?.["tableId"];
  }

  if (req?.body?.["recordId"] === "" || req?.body?.["recordId"] === null) {
    delete req?.body?.["recordId"];
  }

  let schema = Joi.object({
    tableId: Joi.string().required(),
    recordId: Joi.string().required(),   
  });

  let validationResult = runValidation({
    payload: req.body,
    schema,
  });

  if (typeof validationResult.error !== "undefined") {
    res.status(400);
    res.send({ error: validationResult.error });
  } else {
    let result = await recordGet({ req, res });
    res.send(result);
  }
}
