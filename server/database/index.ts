import * as auth from "./schema/auth";
import * as bootcamp from "./schema/bootcamp";
import * as taaruf from "./schema/taaruf";
import * as diskon from "./schema/diskon";
import ENV from "~~/shared/env";
import { drizzle } from "drizzle-orm/neon-http";

export const db = drizzle({
  connection: {
    connectionString: ENV.DATABASE_URL,
  },
  schema: {
    ...auth,
    ...bootcamp,
    ...taaruf,
    ...diskon,
  },
  casing: "snake_case",
});
