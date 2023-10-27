import { getAuth } from "../../services/authService";

export default async function getTokens(code: string) {
  try {
    const { tokens } = await getAuth().getToken(code);

    getAuth().on("tokens", (tokens) => {
      if (tokens.refresh_token) {
        // store the refresh_token in my database!
        console.log(tokens.refresh_token);
      }
      console.log(tokens.access_token);
    });

    getAuth().setCredentials(tokens);
  } catch (error) {
    console.error("Error getting tokens:", error);
    throw error;
  }
}
