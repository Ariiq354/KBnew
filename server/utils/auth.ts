import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin as adminPlugins } from "better-auth/plugins";
import { ac, admin, user } from "~~/shared/permission";
import { db } from "../database";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  basePath: "/api/v1/auth",
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  advanced: {
    database: {
      generateId: false,
      useNumberId: true,
    },
  },
  user: {
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

export type UserWithId = {
  id: number;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null | undefined | undefined;
  banned: boolean | null | undefined;
  role?: string | null | undefined;
  banReason?: string | null | undefined;
  banExpires?: Date | null | undefined;
  noTelepon: string;
};
