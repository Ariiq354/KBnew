import { UBadge } from "#components";
import type { TableColumn } from "@nuxt/ui";

export const columns: TableColumn<any>[] = [
  {
    accessorKey: "dituju.namaAnggota",
    header: "Nama Dituju",
  },
  {
    accessorKey: "dituju.kodeUser",
    header: "Kode User",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const color = {
        permintaan: "info" as const,
        taaruf: "primary" as const,
        selesai: "success" as const,
        ditolak: "warning" as const,
      }[row.getValue("status") as string];

      return h(UBadge, { class: "capitalize rounded-full", color }, () =>
        row.getValue("status")
      );
    },
  },
];

export const columnsPenuju: TableColumn<any>[] = [
  {
    accessorKey: "penuju.namaAnggota",
    header: "Nama Dituju",
  },
  {
    accessorKey: "penuju.kodeUser",
    header: "Kode User",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const color = {
        permintaan: "info" as const,
        taaruf: "primary" as const,
        selesai: "success" as const,
        ditolak: "warning" as const,
      }[row.getValue("status") as string];

      return h(UBadge, { class: "capitalize rounded-full", color }, () =>
        row.getValue("status")
      );
    },
  },
];
