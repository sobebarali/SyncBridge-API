import { base } from "../../services/airtableService";

export const listRecord = async (table: string) => {
  try {
    const records = await base(table).select().all();
    return records;
  } catch (error) {
    console.error("Error fetching records", error);
    throw error;
  }
};
