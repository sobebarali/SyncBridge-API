import { Request, Response } from "express";
import updateBlock from "../../api/controllers/notionController/updateBlock";

export async function blockUpdate(req: Request, res: Response) {
  try {
    const { blockId, newText } = req.body;

    if (!blockId || !newText) {
      return res.status(400).json({
        error: "BlockId and newText are required in the request body.",
      });
    }
    /*
        The pageId is a 32 character string that is used to identify a page in Notion.
        It is formatted as follows:
        8 characters - 4 characters - 4 characters - 4 characters - 12 characters
        e.g. 12345678-1234-1234-1234-123456789012
    */
    const formattedBlockId = `${blockId.substring(0, 8)}-${blockId.substring(
      8,
      12
    )}-${blockId.substring(12, 16)}-${blockId.substring(
      16,
      20
    )}-${blockId.substring(20)}`;

    const block = await updateBlock({
      blockId: formattedBlockId,
      newText: newText,
    });

    let data = {
      id: block.id,
      type: block.type,
      has_children: block.has_children,
      created_time: block.created_time,
      last_edited_time: block.last_edited_time,
    };

    res.status(200).json({ data });
  } catch (error: any) {
    console.error("Error updating event", error);
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
