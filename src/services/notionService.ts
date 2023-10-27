import { config } from "../../config";

const { Client, APIErrorCode } = require("@notionhq/client");

export const notion = new Client({
  auth: config.notion.token,
});



