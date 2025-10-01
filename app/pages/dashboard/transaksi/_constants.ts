import { UBadge } from "#components";
import type { TableColumn } from "@nuxt/ui";
import { z } from "zod/mini";

export const columns: TableColumn<any>[] = [
  {
    accessorKey: "nama",
    header: "Nama User",
  },
  {
    accessorKey: "namaBootcamp",
    header: "Bootcamp",
  },
  {
    accessorKey: "harga",
    header: "Harga",
    cell: ({ row }) => row.original.harga.toLocaleString("id-ID"),
  },
  {
    accessorKey: "diskon",
    header: "Diskon",
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
        row.getValue("status") ? "Sudah Dibayar" : "Belum Dibayar"
      );
    },
  },
];

export const schema = z.object({
  id: z.number().check(z.minimum(1, "Required")),
  status: z.boolean(),
});

export const initFormData: Schema = {
  id: 0,
  status: false,
};

export type Schema = z.infer<typeof schema>;
