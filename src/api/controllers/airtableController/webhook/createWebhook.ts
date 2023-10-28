import axios from "axios";
import { config } from "../../../../../config";

export async function createWebhook({
  baseId,
  notificationUrl,
  specification,
}: {
  baseId: string;
  notificationUrl: string;
  specification: any;
}) {
  try {
    const response = await axios.post(
      `https://api.airtable.com/v0/bases/${baseId}/webhooks`,
      {
        notificationUrl,
        specification,
      },
      {
        headers: {
          Authorization: `Bearer ${config.airtable.personalAccessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw error;
  }
}
