import { z } from "zod/mini";

export const DaerahDto = z.object({
  data: z.array(
    z.object({
      code: z.string(),
      name: z.string(),
    })
  ),
  meta: z.object({
    administrative_area_level: z.number(),
    updated_at: z.string(),
  }),
});
