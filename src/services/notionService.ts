import { config } from "../../config";

const { Client } = require("@notionhq/client");

export const notion = new Client({
  auth: config.notion.token,
});



