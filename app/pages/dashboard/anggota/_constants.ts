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
];
