import { z } from "zod/v4-mini";

export const ODeleteSchema = z.object({
  id: z.array(z.number()),
});

export type TDeleteDto = z.infer<typeof ODeleteSchema>;
