import { createdUpdated } from "./common";
import { userTable } from "./auth";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const taarufTable = pgTable("taaruf", {
  id: serial().primaryKey(),
  idPenuju: integer()
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  idDituju: integer()
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  status: text({
    enum: ["permintaan", "taaruf", "selesai", "ditolak"],
  })
    .notNull()
    .default("permintaan"),
  ...createdUpdated,
});
