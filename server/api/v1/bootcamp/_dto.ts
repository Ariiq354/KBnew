import { z } from "zod/mini";

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

export const OUserBootcampCreate = z.object({
  idBootcamp: z.number(),
  harga: z.number(),
  diskon: z.string(),
});

export type TUserBootcampCreate = z.infer<typeof OUserBootcampCreate>;
