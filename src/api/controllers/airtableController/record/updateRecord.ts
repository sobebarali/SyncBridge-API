import { base } from "../../../../services/airtableService";

export async function updateRecord({
  tableId,
  recordId,
  field,
}: {
  tableId: string;
  recordId: string;
  field: object;
}) {
  try {
    return await base(tableId).update(recordId, field);
  } catch (error: any) {
    throw error;
  }
}
