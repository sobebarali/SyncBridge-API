import express from "express";
import { recordCreate } from "../handlers/airtableHandler/recordCreate";
import { recordList } from "../handlers/airtableHandler/recordList";


const taskRouter = express.Router();

taskRouter.post("/task/create", recordCreate);
taskRouter.get("/task/list", recordList);


export default taskRouter;
