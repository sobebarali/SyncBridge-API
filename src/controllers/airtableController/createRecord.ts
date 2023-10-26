import { base } from "../../services/airtableService";

export const createRecord = async (table: string, data: any) => {
  try {
    const record = await base(table).create(data);
    return record;
  } catch (error) {
    console.error("Error creating record", error);
    throw error;
  }
};
