import {
  sqliteTable,
  text,
  int,
  uniqueIndex,
  index,
} from "drizzle-orm/sqlite-core";
import { timestamp } from "./common";

export const user = sqliteTable(
  "user",
  {
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
    isActive: int({ mode: "boolean" }).notNull().default(false),
    isAvailable: int({ mode: "boolean" }).notNull().default(true),
    ...timestamp,
  },
  (table) => [uniqueIndex("email_idx").on(table.email)],
);

export const userDtlTable = sqliteTable("user_dtl", {
  id: int().primaryKey({ autoIncrement: true }),
  kodeUser: text().notNull(),
  userId: int()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" })
    .unique(),
  statusKawin: text().notNull(),
  tanggalLahir: text().notNull(),
  kelurahan: text().notNull(),
  gender: text({ enum: ["laki", "perempuan"] }).notNull(),
  kecamatan: text().notNull(),
  kota: text().notNull(),
  provinsi: text().notNull(),
  namaAyah: text().notNull(),
  anakKe: int().notNull(),
  dariBersaudara: int().notNull(),
  suku: text().notNull(),
  pendidikan: text().notNull(),
  pekerjaan: text().notNull(),
  jurusan: text().notNull(),
  tinggi: int().notNull(),
  berat: int().notNull(),
  hobi: text().notNull(),
  instagram: text().notNull(),
  kriteria: text().notNull(),
  perokok: int({ mode: "boolean" }).notNull().default(false),
  gaji: int().notNull().default(0),
  deskripsi: text().notNull().default(""),
  foto: text().notNull(),
  ...timestamp,
});

export const session = sqliteTable(
  "session",
  {
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
  },
  (table) => [
    index("userid_idx_session").on(table.userId),
    index("token_idx").on(table.token),
  ],
);

export const account = sqliteTable(
  "account",
  {
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
  },
  (table) => [index("userid_idx").on(table.userId)],
);

export const verification = sqliteTable(
  "verification",
  {
    id: int().primaryKey({ autoIncrement: true }),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: int({ mode: "timestamp" }).notNull(),
    ...timestamp,
  },
  (table) => [index("identifier_idx").on(table.identifier)],
);
