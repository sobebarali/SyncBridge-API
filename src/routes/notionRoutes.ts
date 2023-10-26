import express from "express";
import { blockCreate } from "../handlers/notionHandler/blockCreate";
import { blockUpdate } from "../handlers/notionHandler/blockUpdate";

const notionRouter = express.Router();

notionRouter.post("/block/create", blockCreate );
notionRouter.patch("/block/update", blockUpdate );

export default notionRouter;
