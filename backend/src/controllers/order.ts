import { Request, Response } from "express";
import { RedisManager } from "../RedisManager";
import { createOrderSchema } from "../zod/createOrder";
import { deleteOrderSchema } from "../zod/deteteOrder";
import { openOrderSchema } from "../zod/openOrders";

export async function createOrder(req: Request, res: Response) {
  try {
    const userId = req.headers["id"] as string;

    const parsedInput = createOrderSchema.safeParse(req.body);

    if (parsedInput.success === false) {
      console.log(parsedInput.error.issues[0]);
      return res.status(400).json({ msg: parsedInput.error.issues[0] });
    }

    const { market, price, quantity, side } = parsedInput.data;

    const response = await RedisManager.getInstance().sendAndAwait({
      type: "CREATE_ORDER",
      data: {
        market,
        price,
        quantity,
        side,
        userId,
      },
    });

    return res.status(201).json({ msg: response.payload });
  } catch (error) {
    return res.status(500).json({ msg: error });
    console.error(error);
  }
}

export async function deleteOrder(req: Request, res: Response) {
  try {
    const userId = req.headers["id"] as string;

    const parsedInput = deleteOrderSchema.safeParse(req.body);

    if (parsedInput.success === false) {
      console.log(parsedInput.error.issues[0]);
      return res.status(400).json({ msg: parsedInput.error.issues[0] });
    }

    const { market, orderId } = parsedInput.data;

    const response = await RedisManager.getInstance().sendAndAwait({
      type: "CANCEL_ORDER",
      data: {
        market,
        orderId,
      },
    });

    return res.status(201).json({ msg: response.payload });
  } catch (error) {
    return res.status(500).json({ msg: error });
    console.error(error);
  }
}

export async function getOpenOrder(req: Request, res: Response) {
  try {
    const userId = req.headers["id"] as string;
    const query = req.query["market"];

    const parsedInput = openOrderSchema.safeParse({ query });

    if (parsedInput.success === false) {
      console.log(parsedInput.error.issues[0]);
      return res.status(400).json({ msg: parsedInput.error.issues[0] });
    }

    const { market } = parsedInput.data;

    const response = await RedisManager.getInstance().sendAndAwait({
      type: "GET_OPEN_ORDERS",
      data: {
        market,
        userId,
      },
    });

    return res.status(201).json({ msg: response.payload });
  } catch (error) {
    return res.status(500).json({ msg: error });
    console.error(error);
  }
}
