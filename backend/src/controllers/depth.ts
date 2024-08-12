import { Request, Response } from "express";
import { depthSchema } from "../zod/depth";
import { RedisManager } from "../RedisManager";

export async function getDepth(req: Request, res: Response) {
  try {
    const query = req.query["symbol"];

    const parsedInput = depthSchema.safeParse({ query });

    if (parsedInput.success === false) {
      console.log(parsedInput.error.issues[0]);
      return res.status(400).json({ msg: parsedInput.error.issues[0] });
    }

    const { symbol } = parsedInput.data;

    const response = await RedisManager.getInstance().sendAndAwait({
      type: "DEPTH",
      data: {
        symbol,
      },
    });

    return res.status(201).json({ msg: response.payload });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: error });
  }
}
