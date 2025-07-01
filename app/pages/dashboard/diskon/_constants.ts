import type { TableColumn } from "@nuxt/ui";
import { z } from "zod/v4-mini";

export const columns: TableColumn<any>[] = [
  {
    accessorKey: "kode",
    header: "Kode diskon",
  },
  {
    accessorKey: "persen",
    header: "Persen %",
  },
  {
    accessorKey: "batasWaktu",
    header: "Batas Waktu",
  },
  {
    accessorKey: "batasPemakai",
    header: "Batas Pemakai",
  },
  {
    accessorKey: "jumlahDipakai",
    header: "Jumlah Dipakai",
  },
];

export const schema = z.object({
  id: z.optional(z.number()),
  persen: z.number().check(z.minimum(0), z.maximum(100)),
  kode: z.string().check(z.minLength(1, "Required")),
  batasWaktu: z.iso.date(),
  batasPemakai: z.number(),
});

export const getInitialFormData = (): Schema => ({
  id: undefined,
  persen: 0,
  batasPemakai: 0,
  kode: "",
  batasWaktu: "",
});

export type Schema = z.infer<typeof schema>;
