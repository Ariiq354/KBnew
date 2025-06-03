import { z } from "zod/v4-mini";

export const OBootcampCreate = z.object({
  judul: z.string(),
  deskripsi: z.string(),
  status: z.coerce.boolean(),
  harga: z.coerce.number(),
  googleMap: z.string(),
  tempat: z.string(),
  waktu: z.string(),
  foto: z.string(),
  pembicara: z.string(),
});

export type TBootcampCreate = z.infer<typeof OBootcampCreate>;
