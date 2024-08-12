import { z } from "zod";

export const deleteOrderSchema = z.object({
  orderId: z.string().min(1, "This field cant be empty"),
  market: z.string().min(1, "This field cant be empty"),
});

export type deleteOrderType = z.infer<typeof deleteOrderSchema>;
