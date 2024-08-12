import { z } from "zod";

export const depthSchema = z.object({
  symbol: z.string().min(1, "This field cant be empty"),
});

export type depthType = z.infer<typeof depthSchema>;
