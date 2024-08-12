import { z } from "zod";

export const createOrderSchema = z.object({
  market: z.string().min(1, "This field cant be empty"),
  price: z.string().min(1, "This field cant be empty"),
  quantity: z.string().min(1, "This field cant be empty"),
  side: z.enum(["buy", "sell"]),
});

export type createOrderType = z.infer<typeof createOrderSchema>;
