import { base } from "../../../../services/airtableService";

export async function getRecord({
  tableId,
  recordId,
}: {
  tableId: string;
  recordId: string;
}) {
  try {
    return await base(tableId).find(recordId);
  } catch (error: any) {
    throw error;
  }
}
