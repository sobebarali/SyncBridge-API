import { Request, Response } from "express";
import Joi, { ValidationError } from "joi";
import runValidation from "../../../../utils/runValidation";
import { recordDelete } from "../../../../handlers/airtableHandler/record/recordDelete";

export type typePayload = { tableId: string; recordIds: string[] };

export type typeResultData = {
  isDeleted: boolean;
  tableId: string;
  recordIds: string[];
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

export default async function endpointRecordDelete(
  req: Request,
  res: Response
): Promise<any> {
  if (req?.body?.["tableId"] === "" || req?.body?.["tableId"] === null) {
    delete req?.body?.["tableId"];
  }

  if (req?.body?.["recordIds"] === "" || req?.body?.["recordIds"] === null) {
    delete req?.body?.["recordIds"];
  }

  let schema = Joi.object({
    tableId: Joi.string().required(),
    recordIds: Joi.array().max(10).items(Joi.string()).required(),
  });

  let validationResult = runValidation({
    payload: req.body,
    schema,
  });

  if (typeof validationResult.error !== "undefined") {
    res.status(400);
    res.send({ error: validationResult.error });
  } else {
    let result = await recordDelete({ req, res });
    res.send(result);
  }
}
