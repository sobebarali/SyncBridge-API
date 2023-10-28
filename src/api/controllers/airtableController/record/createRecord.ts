import { base } from "../../../../services/airtableService";

export async function createRecord({
  tableId,
  fields,
}: {
  tableId: string;
  fields: any;
}) {
  try {
    return await base(tableId).create(fields);
  } catch (error: any) {
    throw error
  }
}
