import { Request, Response } from "express";
import generateAuthUrl from "../../api/controllers/googleOauth2Controller/generateAuthUrl";
import getTokens from "../../api/controllers/googleOauth2Controller/setToken";

export async function authUrlGenerate(
  req: Request,
  res: Response
): Promise<void> {
  try {
    let url = await generateAuthUrl();
    res.status(200).json({ url });
  } catch (error) {
    console.error("Error setting tokens:", error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
}

export async function tokenSet(req: Request, res: Response): Promise<void> {
  try {
    const { code } = req.query;
    const tokens = await getTokens(code as string);
    res.status(200).json({ message: "Token Set Successfully", tokens });
  } catch (error) {
    console.error("Error setting tokens:", error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
}
