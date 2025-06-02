import { UBadge } from "#components";
import type { TableColumn } from "@nuxt/ui";
import * as v from "valibot";

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

export const schema = v.object({
  id: v.optional(v.number()),
  judul: v.pipe(v.string(), v.minLength(1, "Required")),
  deskripsi: v.pipe(v.string(), v.minLength(1, "Required")),
  harga: v.number(),
  googleMap: v.pipe(v.string(), v.minLength(1, "Required")),
  tempat: v.pipe(v.string(), v.minLength(1, "Required")),
  waktu: v.pipe(v.string(), v.minLength(1, "Required")),
  foto: v.string(),
  pembicara: v.pipe(v.string(), v.minLength(1, "Required")),
  status: v.boolean(),
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

export type Schema = v.InferOutput<typeof schema>;
