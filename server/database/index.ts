import { drizzle } from "drizzle-orm/libsql";
import * as auth from "./schema/auth";
import * as bootcamp from "./schema/bootcamp";
import * as taaruf from "./schema/taaruf";
import * as diskon from "./schema/diskon";

const config = useRuntimeConfig();

export const db = drizzle({
  connection: {
    url: config.databaseUrl,
    authToken: config.databaseAuthToken,
  },
  schema: {
    ...auth,
    ...bootcamp,
    ...taaruf,
    ...diskon,
  },
  casing: "snake_case",
});
