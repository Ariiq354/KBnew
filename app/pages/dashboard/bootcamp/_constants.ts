import { UBadge } from "#components";
import type { TableColumn } from "@nuxt/ui";
import { z } from "zod/v4-mini";

export const columns: TableColumn<any>[] = [
  {
    accessorKey: "judul",
    header: "Judul",
  },
  {
    accessorKey: "tempat",
    header: "Lokasi",
  },
  {
    accessorKey: "waktu",
    header: "Jadwal",
  },
  {
    accessorKey: "pembicara",
    header: "Pembicara",
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
  judul: z.string().check(z.minLength(1, "Required")),
  deskripsi: z.string().check(z.minLength(1, "Required")),
  harga: z.number(),
  googleMap: z.string().check(z.minLength(1, "Required")),
  tempat: z.string().check(z.minLength(1, "Required")),
  waktu: z.string().check(z.minLength(1, "Required")),
  foto: z.string(),
  pembicara: z.string().check(z.minLength(1, "Required")),
  status: z.boolean(),
});

export const getInitialFormData = (): Schema => ({
  id: undefined,
  deskripsi: "",
  foto: "",
  googleMap: "",
  harga: 0,
  judul: "",
  pembicara: "",
  tempat: "",
  waktu: "",
  status: false,
});

export type Schema = z.infer<typeof schema>;
