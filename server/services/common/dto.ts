import { z } from "zod/mini";

export const ODeleteSchema = z.object({
  id: z.array(z.number()),
});

export type TDeleteDto = z.infer<typeof ODeleteSchema>;
