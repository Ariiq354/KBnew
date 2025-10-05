import { z } from "zod/mini";

export const OTransaksiCreate = z.object({
  idBootcamp: z.number(),
  harga: z.number(),
  diskon: z.string(),
  status: z.enum(["Belum Dibayar", "Sudah Dibayar", "Sudah Diverif"]),
});

export type TTransaksiCreate = z.infer<typeof OTransaksiCreate>;

export const OTransaksiUpdate = z.object({
  status: z.enum(["Belum Dibayar", "Sudah Dibayar", "Sudah Diverif"]),
});

export type TTransaksiUpdate = z.infer<typeof OTransaksiUpdate>;
