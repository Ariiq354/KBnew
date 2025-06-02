import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamp } from "./common";

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
