import { z } from "zod/mini";

export const schema = z
  .object({
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
    file: z.optional(
      z
        .file()
        .check(
          z.maxSize(5_000_000),
          z.mime(["image/png", "image/jpeg", "image/webp"]),
        ),
    ),
    instagram: z.string().check(z.minLength(1, "Required")),
    gender: z.enum(["laki", "perempuan"]),
    perokok: z.boolean(),
    gaji: z.number(),
  })
  .check(
    z.refine((val) => val.file || val.foto, {
      error: "Required",
      path: ["foto"],
    }),
  );

export const statusKawinOptions = [
  "Belum Pernah Menikah",
  "Janda / Duda",
  "Sudah Menikah",
];

export const pendidikanOptions = [
  "Tidak Sekolah",
  "SD/Sederajat",
  "SMP/Sederajat",
  "SMA/SMK/Sederajat",
  "Diploma (D1/D2/D3)",
  "Sarjana (S1)",
  "Magister (S2)",
  "Doktor (S3)",
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

export const perokokOptions = [
  {
    label: "Iya",
    value: true,
  },
  {
    label: "Tidak",
    value: false,
  },
];

export type Schema = z.infer<typeof schema>;

export const getInitialFormData = (): Schema => ({
  statusKawin: "",
  tanggalLahir: "",
  provinsi: "Aceh",
  kota: "Kabupaten Aceh Barat",
  kecamatan: "Arongan Lambalek",
  kelurahan: "Alue Bagok",
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
  gaji: 0,
  perokok: false,
});
