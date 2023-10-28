import { Request, Response } from "express";
import Joi, { ValidationError } from "joi";
import runValidation from "../../../../utils/runValidation";
import { webhookCreate } from "../../../../handlers/airtableHandler/webhooks/webhookCreate";

export type typePayload = { baseId: string; notificationUrl: string; specification: any };

export type typeResultData = {
  isCreated: boolean;
  webhookId: string;
  macSecretBase64: string;
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

export default async function endpointWebhookCreate(
  req: Request,
  res: Response
): Promise<any> {
    if (req?.body?.["baseId"] === "" || req?.body?.["baseId"] === null) {
        delete req?.body?.["baseId"];
    }

    if (req?.body?.["notificationUrl"] === "" || req?.body?.["notificationUrl"] === null) {
        delete req?.body?.["notificationUrl"];
    }

    if (req?.body?.["specification"] === "" || req?.body?.["specification"] === null) {
        delete req?.body?.["specification"];
    }

  let schema = Joi.object({
    baseId: Joi.string().required(),
    notificationUrl: Joi.string().required(),
    specification: Joi.object().required(),
  });

  let validationResult = runValidation({
    payload: req.body,
    schema,
  });

  if (typeof validationResult.error !== "undefined") {
    res.status(400);
    res.send({ error: validationResult.error });
  } else {
    let result = await webhookCreate({ req, res });
    res.send(result);
  }
}
