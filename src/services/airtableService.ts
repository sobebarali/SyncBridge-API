import Airtable from "airtable";
import { config } from "../../config";


export const base = new Airtable({
  apiKey: config.airtable.personalAccessToken,
}).base("appdeKvxGIhfIyfVq");







