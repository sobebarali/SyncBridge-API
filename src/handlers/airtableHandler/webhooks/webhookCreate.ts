import { Request, Response } from "express";
import {
  typePayload,
  typeResult,
  typeResultData,
  typeResultError,
} from "../../../api/endpoints/airtableEndpoint/webhook/create";
import { createWebhook } from "../../../api/controllers/airtableController/webhook/createWebhook";

export async function webhookCreate({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  const baseId: typePayload["baseId"] = req.body.baseId;
  const notificationUrl: typePayload["notificationUrl"] =
    req.body.notificationUrl;
  const specification: typePayload["specification"] = req.body.specification;

  try {
    const record = await createWebhook({
      baseId,
      notificationUrl,
      specification,
    });

    data = {
      isCreated: true,
      webhookId: record.id,
      macSecretBase64: record.macSecret,
    };
  } catch (err: any) {
    console.log("error", err);
    res.status(err.statusCode);
    error = {
      code: err.error,
      message: err.message,
    };
  }

  return { data, error };
}
