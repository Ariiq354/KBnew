import { drizzle } from "drizzle-orm/libsql";
import * as auth from "./schema/auth";
import * as bootcamp from "./schema/bootcamp";

const config = useRuntimeConfig();

export const db = drizzle({
  connection: {
    url: config.databaseUrl,
    authToken: config.databaseAuthToken,
  },
  schema: {
    ...auth,
    ...bootcamp,
  },
  casing: "snake_case",
});
