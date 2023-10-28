import { Request, Response } from "express";
import { createBlock } from "../../api/controllers/notionController/createBlock";

export async function blockCreate(req: Request, res: Response) {
  try {
    const { pageId, headingContent, paragraphContent } = req.body;

    if (!pageId) {
      return res
        .status(400)
        .json({ error: "PageId is required in the request body." });
    }

    /*
        The pageId is a 32 character string that is used to identify a page in Notion.
        It is formatted as follows:
        8 characters - 4 characters - 4 characters - 4 characters - 12 characters
        e.g. 12345678-1234-1234-1234-123456789012
    */
    const formattedPageId = `${pageId.substring(0, 8)}-${pageId.substring(
      8,
      12
    )}-${pageId.substring(12, 16)}-${pageId.substring(
      16,
      20
    )}-${pageId.substring(20)}`;

    const block = await createBlock({
      pageId: formattedPageId,
      headingContent,
      paragraphContent,
    });

    let data: any = block?.results?.map((block: any) => {
      return {
        id: block.id,
        type: block.type,
        has_children: block.has_children,
        created_time: block.created_time,
        last_edited_time: block.last_edited_time,
      };
    });

    res.status(200).json({ data });
  } catch (error: any) {
    console.error("Error creating event", error);
    if (error.name === "APIResponseError" && error.status === 404) {
      console.error(
        "Block not found. Make sure it is shared with the integration."
      );
    }

    res.status(500).send({
      error,
      message: "Internal server error",
    });
  }
}
