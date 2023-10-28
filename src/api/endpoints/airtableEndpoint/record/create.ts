import { Request, Response } from "express";
import Joi, { ValidationError } from "joi";
import runValidation from "../../../../utils/runValidation";
import { recordCreate } from "../../../../handlers/airtableHandler/record/recordCreate";

export type typePayload = { tableId: string; fields: any };

export type typeResultData = {
  isCreated: boolean;
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

export default async function endpointRecordCreate(
  req: Request,
  res: Response
): Promise<any> {
  if (req?.body?.["tableId"] === "" || req?.body?.["tableId"] === null) {
    delete req?.body?.["tableId"];
  }

  if (req?.body?.["fields"] === "" || req?.body?.["fields"] === null) {
    delete req?.body?.["fields"];
  }

  let schema = Joi.object({
    tableId: Joi.string().required(),
    fields: Joi.alternatives()
      .try(Joi.object(), Joi.array().max(10).items(Joi.object()))
      .required(),
  });

  let validationResult = runValidation({
    payload: req.body,
    schema,
  });

  if (typeof validationResult.error !== "undefined") {
    res.status(400);
    res.send({ error: validationResult.error });
  } else {
    let result = await recordCreate({ req, res });
    res.send(result);
  }
}
