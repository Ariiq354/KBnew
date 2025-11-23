import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const OAnggotaDetailCreate = z.object({
  statusKawin: z.string(),
  tanggalLahir: z.string(),
  provinsi: z.string(),
  kelurahan: z.string(),
  kota: z.string(),
  kecamatan: z.string(),
  namaAyah: z.string(),
  anakKe: z.coerce.number(),
  dariBersaudara: z.coerce.number(),
  suku: z.string(),
  pendidikan: z.string(),
  pekerjaan: z.string(),
  jurusan: z.string(),
  tinggi: z.coerce.number(),
  berat: z.coerce.number(),
  hobi: z.string(),
  kriteria: z.string(),
  deskripsi: z.string(),
  foto: z.string(),
  instagram: z.string(),
  perokok: z.stringbool(),
  gaji: z.coerce.number(),
  agama: z.string(),
  gender: z.enum(["laki", "perempuan"]),
});

export type TAnggotaDetailCreate = z.infer<typeof OAnggotaDetailCreate>;

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

export const OToggleActive = z.object({
  id: z.number(),
  isActive: z.boolean(),
});

export type TAnggotaPasangan = z.infer<typeof OAnggotaPasangan>;
