import { z } from "zod/mini";

export const schema = z.object({
  statusKawin: z.string().check(z.minLength(1, "Required")),
  tanggalLahir: z.string().check(z.minLength(1, "Required")),
  provinsi: z.string().check(z.minLength(1, "Required")),
  kelurahan: z.string().check(z.minLength(1, "Required")),
  kota: z.string().check(z.minLength(1, "Required")),
  kecamatan: z.string().check(z.minLength(1, "Required")),
  namaAyah: z.string().check(z.minLength(1, "Required")),
  anakKe: z.number(),
  dariBersaudara: z.number(),
  suku: z.string().check(z.minLength(1, "Required")),
  pendidikan: z.string().check(z.minLength(1, "Required")),
  pekerjaan: z.string(),
  jurusan: z.string(),
  tinggi: z.number(),
  berat: z.number(),
  hobi: z.string().check(z.minLength(1, "Required")),
  kriteria: z.string().check(z.minLength(1, "Required")),
  deskripsi: z.string().check(z.minLength(1, "Required")),
  foto: z.string(),
  instagram: z.string().check(z.minLength(1, "Required")),
  gender: z.enum(["laki", "perempuan"]),
});

export const statusKawinOptions = [
  { name: "Belum Pernah Menikah" },
  { name: "Janda / Duda" },
  { name: "Sudah Menikah" },
];

export const pendidikanOptions = [
  { name: "Tidak Sekolah" },
  { name: "SD/Sederajat" },
  { name: "SMP/Sederajat" },
  { name: "SMA/SMK/Sederajat" },
  { name: "Diploma (D1/D2/D3)" },
  { name: "Sarjana (S1)" },
  { name: "Magister (S2)" },
  { name: "Doktor (S3)" },
];

export const genderOptions = [
  {
    name: "Laki - laki",
    value: "laki",
  },
  {
    name: "Perempuan",
    value: "perempuan",
  },
];

export type Schema = z.infer<typeof schema>;

export const getInitialFormData = (): Schema => ({
  statusKawin: "",
  tanggalLahir: "",
  kota: "",
  kecamatan: "",
  kelurahan: "",
  provinsi: "",
  namaAyah: "",
  anakKe: 0,
  dariBersaudara: 0,
  jurusan: "",
  suku: "",
  pendidikan: "",
  pekerjaan: "",
  tinggi: 0,
  berat: 0,
  hobi: "",
  kriteria: "",
  deskripsi: "",
  foto: "",
  instagram: "",
  gender: "laki",
});
