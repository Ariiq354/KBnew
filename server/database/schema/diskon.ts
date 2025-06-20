import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamp } from "./common";

export const diskonTable = sqliteTable("diskon", {
  id: int().primaryKey({ autoIncrement: true }),
  persen: int().notNull(),
  kode: text().notNull(),
  batasWaktu: text().notNull(),
  batasPemakai: int().notNull(),
  jumlahDipakai: int().notNull().default(0),
  ...timestamp,
});
