import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamp } from "./common";
import { user } from "./auth";

export const bootcampTable = sqliteTable("bootcamp", {
  id: int().primaryKey({ autoIncrement: true }),
  judul: text().notNull(),
  deskripsi: text().notNull(),
  status: int({ mode: "boolean" }).notNull().default(false),
  harga: int().notNull(),
  googleMap: text().notNull(),
  tempat: text().notNull(),
  waktu: text().notNull(),
  foto: text().notNull(),
  pembicara: text().notNull(),
  ...timestamp,
});

export const pemilikBootcampTable = sqliteTable("pemilikBootcamp", {
  id: int().primaryKey({ autoIncrement: true }),
  idUser: int()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  idBootcamp: int()
    .notNull()
    .references(() => bootcampTable.id, { onDelete: "cascade" }),
  status: int({ mode: "boolean" }).notNull().default(false),
  ...timestamp,
});
