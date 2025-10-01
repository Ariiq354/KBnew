import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin as adminPlugins } from "better-auth/plugins";
import { ac, admin, user } from "~~/shared/permission";
import { db } from "../database";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 1,
  },
  advanced: {
    database: {
      generateId: false,
      useNumberId: true,
    },
  },
  user: {
    modelName: "userTable",
    additionalFields: {
      noTelepon: {
        type: "string",
        required: true,
      },
      isAvailable: {
        type: "boolean",
        required: false,
      },
      isActive: {
        type: "boolean",
        required: false,
      },
    },
  },
  plugins: [
    adminPlugins({
      ac,
      roles: {
        admin,
        user,
      },
    }),
  ],
});

export type UserWithId = Omit<typeof auth.$Infer.Session.user, "id"> & {
  id: number;
};
