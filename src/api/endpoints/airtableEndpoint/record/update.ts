import { Request, Response } from "express";
import Joi, { ValidationError } from "joi";
import runValidation from "../../../../utils/runValidation";
import { recordUpdate } from "../../../../handlers/airtableHandler/record/recordUpdate";


export type typePayload = { tableId: string; recordId: string; field: object };

export type typeResultData = {
  isUpdated: boolean;
  tableId: string;
  recordId: string;
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

export default async function endpointRecordUpdate(
  req: Request,
  res: Response
): Promise<any> {
  if (req?.body?.["tableId"] === "" || req?.body?.["tableId"] === null) {
    delete req?.body?.["tableId"];
  }

  if (req?.body?.["recordId"] === "" || req?.body?.["recordId"] === null) {
    delete req?.body?.["recordId"];
  }

  if (req?.body?.["field"] === "" || req?.body?.["field"] === null) {
    delete req?.body?.["field"];
  }

  let schema = Joi.object({
    tableId: Joi.string().required(),
    recordId: Joi.string().required(),
    field: Joi.object().required(),
  });

  let validationResult = runValidation({
    payload: req.body,
    schema,
  });

  if (typeof validationResult.error !== "undefined") {
    res.status(400);
    res.send({ error: validationResult.error });
  } else {
    let result = await recordUpdate({ req, res });
    res.send(result);
  }
}
