import { UBadge } from "#components";
import type { TableColumn } from "@nuxt/ui";
import { z } from "zod/v4-mini";

export const columns: TableColumn<any>[] = [
  {
    accessorKey: "penuju.namaAnggota",
    header: "Nama Penuju",
  },
  {
    accessorKey: "dituju.namaAnggota",
    header: "Nama Dituju",
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

export const StatusOptions = ["permintaan", "taaruf", "selesai", "ditolak"];

export const schema = z.object({
  id: z.optional(z.number()),
  status: z.enum(["permintaan", "taaruf", "selesai", "ditolak"]),
});

export const getInitialFormData = (): Schema => ({
  id: undefined,
  status: "permintaan",
});

export type Schema = z.infer<typeof schema>;
