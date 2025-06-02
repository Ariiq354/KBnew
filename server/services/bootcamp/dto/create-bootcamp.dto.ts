import * as v from "valibot";

export const OBootcampCreate = v.object({
  judul: v.string(),
  deskripsi: v.string(),
  status: v.boolean(),
  harga: v.number(),
  googleMap: v.string(),
  tempat: v.string(),
  waktu: v.string(),
  foto: v.string(),
  pembicara: v.string(),
});

export type TBootcampCreate = v.InferOutput<typeof OBootcampCreate>;
