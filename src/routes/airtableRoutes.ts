import express from "express";
import endpointRecordCreate from "../api/endpoints/airtableEndpoint/record/create";
import endpointRecordDelete from "../api/endpoints/airtableEndpoint/record/delete";
import endpointRecordGet from "../api/endpoints/airtableEndpoint/record/get";
import endpointRecordList from "../api/endpoints/airtableEndpoint/record/list";
import endpointRecordUpdate from "../api/endpoints/airtableEndpoint/record/update";
import endpointWebhookCreate from "../api/endpoints/airtableEndpoint/webhook/create";

const airtableRouter = express.Router();

airtableRouter.post("/record/create", endpointRecordCreate);
airtableRouter.delete("/record/delete", endpointRecordDelete);
airtableRouter.get("/record/get", endpointRecordGet);
airtableRouter.get("/record/list", endpointRecordList);
airtableRouter.put("/record/update", endpointRecordUpdate);

airtableRouter.post("/webhook/create", endpointWebhookCreate);

export default airtableRouter;
