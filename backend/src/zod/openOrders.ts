import { z } from "zod";

export const openOrderSchema = z.object({
  market: z.string().min(1, "This field cant be empty"),
});

export type openOrderType = z.infer<typeof openOrderSchema>;
