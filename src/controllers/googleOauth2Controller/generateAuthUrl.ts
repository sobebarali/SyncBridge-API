import { getAuth } from "../../services/authService";

export default async function generateAuthUrl() {
  try {
    const url = await getAuth().generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: "offline",
      scope: "https://www.googleapis.com/auth/calendar",
    });

    return url;
  } catch (error) {
    console.error("Error generating authentication URL:", error);
    return error;
  }
}
