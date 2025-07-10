import { z } from "zod/mini";

export const OTaarufCreate = z.object({
  idDituju: z.number(),
});

export const OTaarufUpdate = z.object({
  status: z.enum(["permintaan", "taaruf", "selesai", "ditolak"]),
});

export type TTaarufCreate = z.infer<typeof OTaarufCreate>;
export type TTaarufUpdate = z.infer<typeof OTaarufUpdate>;
