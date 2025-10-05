import { z } from "zod/mini";

export const ODiskonCreate = z.object({
  persen: z.number(),
  kode: z.string(),
  batasWaktu: z.string(),
  batasPemakai: z.number(),
  status: z.boolean(),
});

export type TDiskonCreate = z.infer<typeof ODiskonCreate>;

export const ODiskonDipakai = z.object({
  status: z.boolean(),
  jumlahDipakai: z.number(),
});

export type TDiskonDipakai = z.infer<typeof ODiskonDipakai>;
