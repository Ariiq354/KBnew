import { z } from "zod/v4-mini";

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
  gender: z.enum(["laki", "perempuan"]),
});

export type TAnggotaDetailCreate = z.infer<typeof OAnggotaDetailCreate>;
