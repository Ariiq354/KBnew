import { z } from "zod/v4-mini";
import { OPagination } from "../../common/pagination";

export const OAnggotaList = z.extend(OPagination, {
  search: z.optional(z.string()),
});

export const OAnggotaPasangan = z.extend(OPagination, {
  statusKawin: z.optional(z.string()),
  pendidikan: z.optional(z.string()),
  provinsi: z.optional(z.string()),
  kota: z.optional(z.string()),
  kecamatan: z.optional(z.string()),
  kelurahan: z.optional(z.string()),
  suku: z.optional(z.string()),
  umurMin: z.optional(z.number()),
  umurMax: z.optional(z.number()),
});

export type TAnggotaList = z.infer<typeof OAnggotaList>;
export type TAnggotaPasangan = z.infer<typeof OAnggotaPasangan>;
