import { z } from "zod/v4-mini";

export const ODiskonCreate = z.object({
  persen: z.number(),
  kode: z.string(),
  batasWaktu: z.string(),
  batasPemakai: z.number(),
});

export type TDiskonCreate = z.infer<typeof ODiskonCreate>;
