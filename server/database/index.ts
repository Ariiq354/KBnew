import { drizzle } from "drizzle-orm/libsql";
import * as auth from "./schema/auth";
import * as bootcamp from "./schema/bootcamp";
import * as taaruf from "./schema/taaruf";

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
  },
  casing: "snake_case",
});
