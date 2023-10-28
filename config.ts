import dotenv from "dotenv";
dotenv.config();

export const config = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    redirectUri: process.env.GOOGLE_REDIRECT_URI || "",
    scopes: (process.env.GOOGLE_SCOPES || "").split(" "), // Split the scopes into an array
  },
  airtable: {
    personalAccessToken: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || "",
    baseId: process.env.AIRTABLE_BASE_ID || "",
  },
  notion: {
    token: process.env.NOTION_TOKEN || "",
  },
};
