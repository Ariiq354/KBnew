import { boolean, integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createdUpdated } from "./common";

export const diskonTable = pgTable("diskon", {
  id: serial().primaryKey(),
  persen: integer().notNull(),
  kode: text().notNull().unique(),
  batasWaktu: text().notNull(),
  batasPemakai: integer().notNull(),
  jumlahDipakai: integer().notNull().default(0),
  status: boolean().notNull().default(false),
  ...createdUpdated,
});
