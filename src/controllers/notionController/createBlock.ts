import { notion } from "../../services/notionService";
import { APIErrorCode } from "@notionhq/client";

export async function createBlock({
  pageId,
  headingContent,
  paragraphContent,
}: {
  pageId: string;
  headingContent?: string;
  paragraphContent?: string;
}) {
  try {
    const response = await notion.blocks.children.append({
      block_id: pageId,
      children: [
        {
          heading_2: {
            rich_text: [
              {
                text: {
                  content: headingContent || "Lacinato Kale",
                },
              },
            ],
          },
        },
        {
          paragraph: {
            rich_text: [
              {
                text: {
                  content: paragraphContent || "Default paragraph content",
                  link: {
                    url: "https://en.wikipedia.org/wiki/Lacinato_kale",
                  },
                },
              },
            ],
          },
        },
      ],
    });

    return response;
  } catch (error) {
    console.error(`Error creating block: ${error}`);
    throw error;
  }
}
