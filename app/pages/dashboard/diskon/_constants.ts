import { UBadge } from "#components";
import type { TableColumn } from "@nuxt/ui";
import { z } from "zod/mini";

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
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const color = {
        true: "success" as const,
        false: "info" as const,
      }[row.getValue("status") ? "true" : "false"];

      return h(UBadge, { class: "capitalize rounded-full", color }, () =>
        row.getValue("status") ? "Aktif" : "Tidak Aktif"
      );
    },
  },
];

export const schema = z.object({
  id: z.optional(z.number()),
  persen: z.number().check(z.minimum(0), z.maximum(100)),
  kode: z.string().check(z.minLength(1, "Required")),
  batasWaktu: z.iso.date(),
  batasPemakai: z.number(),
  status: z.boolean(),
});

export const getInitialFormData = (): Schema => ({
  id: undefined,
  persen: 0,
  kode: "",
  batasWaktu: "",
  batasPemakai: 0,
  status: false,
});

export type Schema = z.infer<typeof schema>;
