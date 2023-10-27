import { base } from "../../services/airtableService";

export const createRecord = async (table: string, data: any): Promise<any> => {
  try {
    const record = await base(table).create(data);
    return record;
  } catch (error) {
    console.error(
      `Error creating record in table '${table}' with data:`,
      data,
      error
    );
    throw error;
  }
};
