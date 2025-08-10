import type { TableColumn } from "@nuxt/ui";

export const columns: TableColumn<any>[] = [
  {
    accessorKey: "judul",
    header: "Judul",
  },
  {
    accessorKey: "waktu",
    header: "Jadwal",
  },
];

export const columnsTiket: TableColumn<any>[] = [
  {
    accessorKey: "kode",
    header: "Kode",
  },
  {
    accessorKey: "nama",
    header: "Nama User",
  },
];
