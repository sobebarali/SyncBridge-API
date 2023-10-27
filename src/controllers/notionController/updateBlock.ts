import { notion } from "../../services/notionService";

export default async function updateBlock({
  blockId,
  newText,
}: {
  blockId: string;
  newText: string;
}) {
  try {
    const response = await notion.blocks.update({
      block_id: blockId,
      heading_2: {
        rich_text: [
          {
            text: {
              content: newText,
            },
            annotations: {
              color: "green",
            },
          },
        ],
      },
    });

    return response;
  } catch (error) {
    console.error(`Error updating block: ${error}`);
    throw error;
  }
}
