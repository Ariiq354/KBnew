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
        "Belum Dibayar": "error" as const,
        "Sudah Dibayar": "info" as const,
        "Sudah Diverif": "success" as const,
      }[row.getValue("status") as string];

      return h(UBadge, { class: "capitalize rounded-full", color }, () =>
        row.getValue("status"),
      );
    },
  },
];

export const statusOptions = [
  "Belum Dibayar",
  "Sudah Dibayar",
  "Sudah Diverif",
];

export const schema = z.object({
  id: z.number().check(z.minimum(1, "Required")),
  status: z.enum(statusOptions),
});

export const initFormData: Schema = {
  id: 0,
  status: "Belum Dibayar",
};

export type Schema = z.infer<typeof schema>;
