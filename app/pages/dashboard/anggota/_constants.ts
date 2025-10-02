import { UBadge } from "#components";
import type { TableColumn } from "@nuxt/ui";

export const columns: TableColumn<any>[] = [
  {
    accessorKey: "namaAnggota",
    header: "Nama Anggota",
  },
  {
    accessorKey: "noTelepon",
    header: "No Telepon",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const color = {
        true: "success" as const,
        false: "info" as const,
      }[row.original.detail ? "true" : "false"];

      return h(UBadge, { class: "capitalize rounded-full", color }, () =>
        row.original.detail ? "Aktif" : "Tidak Aktif",
      );
    },
  },
];
