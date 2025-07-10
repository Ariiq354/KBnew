import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamp } from "./common";
import { user } from "./auth";

export const taarufTable = sqliteTable("taaruf", {
  id: int().primaryKey({ autoIncrement: true }),
  idPenuju: int()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  idDituju: int()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  status: text({
    enum: ["permintaan", "taaruf", "selesai", "ditolak"],
  })
    .notNull()
    .default("permintaan"),
  ...timestamp,
});
