import express from "express";
import { eventList } from "../handlers/googleCalenderHandler/eventList";
import { eventCreate } from "../handlers/googleCalenderHandler/eventCreate";


const calendarRouter = express.Router();

calendarRouter.get("/calender/list", eventList);
calendarRouter.post("/calender/create", eventCreate);

export default calendarRouter;
