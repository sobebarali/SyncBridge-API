import { google } from "googleapis";
import { config } from "../../config";

const oauth2Client = new google.auth.OAuth2(
  config.google.clientId,
  config.google.clientSecret,
  config.google.redirectUri
);

oauth2Client.setCredentials({
  refresh_token:
    "1//0g0ZrAL0qG6o_CgYIARAAGBASNwF-L9Ir_c-0m-SuS52I3z457oS-E_k7bY3PDJOtUiXR_KESd9oGkVmxMVBqmymENtbBSEUK4gg",
});

export function getAuth() {
  return oauth2Client;
}
