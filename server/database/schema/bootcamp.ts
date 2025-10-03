import { boolean, integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { userTable } from "./auth";
import { createdUpdated } from "./common";

export const bootcampTable = pgTable("bootcamp", {
  id: serial().primaryKey(),
  judul: text().notNull(),
  deskripsi: text().notNull(),
  status: boolean().notNull().default(false),
  harga: integer().notNull(),
  googleMap: text().notNull(),
  tempat: text().notNull(),
  waktu: text().notNull(),
  foto: text().notNull(),
  pembicara: text().notNull(),
  ...createdUpdated,
});

export const pemilikBootcampTable = pgTable("pemilikBootcamp", {
  id: serial().primaryKey(),
  idUser: integer()
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  idBootcamp: integer()
    .notNull()
    .references(() => bootcampTable.id, { onDelete: "cascade" }),
  harga: integer().notNull(),
  diskon: text().notNull(),
  status: text({ enum: ["Belum Dibayar", "Sudah Dibayar", "Sudah Diverif"] })
    .notNull()
    .default("Belum Dibayar"),
  kode: text().notNull().default(""),
  ...createdUpdated,
});
