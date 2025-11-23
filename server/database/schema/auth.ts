import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createdUpdated } from "./common";

export const userTable = pgTable(
  "user",
  {
    id: serial().primaryKey(),
    name: text().notNull(),
    email: text().notNull().unique(),
    emailVerified: boolean().notNull(),
    image: text(),
    noTelepon: text().notNull(),
    role: text(),
    banned: boolean(),
    banReason: text(),
    banExpires: timestamp({ withTimezone: true }),
    isActive: boolean().notNull().default(false),
    isAvailable: boolean().notNull().default(true),
    ...createdUpdated,
  },
  (table) => [uniqueIndex("email_idx").on(table.email)],
);

export const userDtlTable = pgTable("user_dtl", {
  id: serial().primaryKey(),
  kodeUser: text().notNull(),
  userId: integer()
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" })
    .unique(),
  statusKawin: text().notNull(),
  tanggalLahir: text().notNull(),
  kelurahan: text().notNull(),
  gender: text({ enum: ["laki", "perempuan"] }).notNull(),
  kecamatan: text().notNull(),
  kota: text().notNull(),
  provinsi: text().notNull(),
  namaAyah: text().notNull(),
  anakKe: integer().notNull(),
  dariBersaudara: integer().notNull(),
  suku: text().notNull(),
  pendidikan: text().notNull(),
  pekerjaan: text().notNull(),
  jurusan: text().notNull(),
  tinggi: integer().notNull(),
  berat: integer().notNull(),
  hobi: text().notNull(),
  instagram: text().notNull(),
  kriteria: text().notNull(),
  perokok: boolean().notNull().default(false),
  gaji: integer().notNull().default(0),
  agama: text().notNull().default(""),
  deskripsi: text().notNull().default(""),
  foto: text().notNull(),
  ...createdUpdated,
});

export const session = pgTable(
  "session",
  {
    id: serial().primaryKey(),
    expiresAt: timestamp({ withTimezone: true }).notNull(),
    token: text().notNull().unique(),
    ipAddress: text(),
    userAgent: text(),
    userId: integer()
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    impersonatedBy: text(),
    ...createdUpdated,
  },
  (table) => [
    index("userid_idx_session").on(table.userId),
    index("token_idx").on(table.token),
  ],
);

export const account = pgTable(
  "account",
  {
    id: serial().primaryKey(),
    accountId: text().notNull(),
    providerId: text().notNull(),
    userId: integer()
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: timestamp({ withTimezone: true }),
    refreshTokenExpiresAt: timestamp({ withTimezone: true }),
    scope: text(),
    password: text(),
    ...createdUpdated,
  },
  (table) => [index("userid_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: serial().primaryKey(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: timestamp({ withTimezone: true }).notNull(),
    ...createdUpdated,
  },
  (table) => [index("identifier_idx").on(table.identifier)],
);
