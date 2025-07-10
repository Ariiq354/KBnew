import { z } from "zod/mini";
import { OPagination } from "../../common/pagination";

export const OAnggotaList = z.object({
  ...OPagination.def.shape,
  search: z.optional(z.string()),
});

export const OAnggotaPasangan = z.object({
  ...OPagination.def.shape,
  statusKawin: z.optional(z.string()),
  pendidikan: z.optional(z.string()),
  provinsi: z.optional(z.string()),
  kota: z.optional(z.string()),
  kecamatan: z.optional(z.string()),
  kelurahan: z.optional(z.string()),
  suku: z.optional(z.string()),
  umurMin: z.optional(z.coerce.number()),
  umurMax: z.optional(z.coerce.number()),
  kodeUser: z.optional(z.string()),
});

export type TAnggotaList = z.infer<typeof OAnggotaList>;
export type TAnggotaPasangan = z.infer<typeof OAnggotaPasangan>;
