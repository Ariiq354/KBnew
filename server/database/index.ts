import { drizzle } from "drizzle-orm/libsql";
import * as auth from "./schema/auth";
import * as bootcamp from "./schema/bootcamp";
import * as taaruf from "./schema/taaruf";
import * as diskon from "./schema/diskon";
import ENV from "~~/shared/env";

export const db = drizzle({
  connection: {
    url: ENV.DATABASE_URL,
    authToken: ENV.DATABASE_AUTH_TOKEN,
  },
  schema: {
    ...auth,
    ...bootcamp,
    ...taaruf,
    ...diskon,
  },
  casing: "snake_case",
});
