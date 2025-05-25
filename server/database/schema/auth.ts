import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { timestamp } from "./common";

export const user = sqliteTable("user", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: int({ mode: "boolean" }).notNull(),
  image: text(),
  noTelepon: text().notNull(),
  role: text(),
  banned: int({ mode: "boolean" }),
  banReason: text(),
  banExpires: int({ mode: "timestamp" }),
  ...timestamp,
});

export const session = sqliteTable("session", {
  id: int().primaryKey({ autoIncrement: true }),
  expiresAt: int({ mode: "timestamp" }).notNull(),
  token: text().notNull().unique(),
  ipAddress: text(),
  userAgent: text(),
  userId: int()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text(),
  ...timestamp,
});

export const account = sqliteTable("account", {
  id: int().primaryKey({ autoIncrement: true }),
  accountId: text().notNull(),
  providerId: text().notNull(),
  userId: int()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  accessTokenExpiresAt: int({
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: int({
    mode: "timestamp",
  }),
  scope: text(),
  password: text(),
  ...timestamp,
});

export const verification = sqliteTable("verification", {
  id: int().primaryKey({ autoIncrement: true }),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: int({ mode: "timestamp" }).notNull(),
  ...timestamp,
});
