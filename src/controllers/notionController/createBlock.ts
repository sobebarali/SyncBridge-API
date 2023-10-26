import { notion } from "../../services/notionService";

export async function createBlock({ pageId }: { pageId: string }) {
  try {
    const response = await notion.blocks.children.append({
      block_id: pageId,
      children: [
        {
          heading_2: {
            rich_text: [
              {
                text: {
                  content: "Lacinato kale",
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
                  content:
                    "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
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
    console.error(error);
    throw error;
  }
}
