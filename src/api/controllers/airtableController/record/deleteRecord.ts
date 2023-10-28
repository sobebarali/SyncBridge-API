import { base } from "../../../../services/airtableService";

export async function deleteRecord({
  tableId,
  recordIds,
}: {
  tableId: string;
  recordIds: string[];
}) {
  try {
    return await base(tableId).destroy(recordIds);
  } catch (error: any) {
    throw error;
  }
}
