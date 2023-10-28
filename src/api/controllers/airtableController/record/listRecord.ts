import { base } from "../../../../services/airtableService";

export async function listRecord({
  tableId,
}: {
  tableId: string;
}) {
  //TODO: add pagination
  try {
    return await base(tableId).select().all();
  } catch (error: any) {
    throw error;
  }
}
