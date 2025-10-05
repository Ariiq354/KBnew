import { and, eq, ne } from "drizzle-orm";
import { db } from "../database";
import { pemilikBootcampTable } from "../database/schema/bootcamp";
import type { AnyPgTable, PgColumn } from "drizzle-orm/pg-core";

export async function generateUniqueCode(
  table: AnyPgTable,
  column: PgColumn,
  length = 4,
) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * chars.length);
    result += chars[randIndex];
  }

  const exist = await tryCatch(
    "failed to select unique code",
    db.select().from(table).where(eq(column, result)),
  );

  if (exist.length > 0) {
    return generateUniqueCode(table, column, length);
  }

  return result;
}

export function subtractYears(date: Date, years: number): Date {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() - years);
  return d;
}

export function formatDateToYMD(date: Date): string {
  return date.toISOString().split("T")[0]!;
}

export async function getUniquePrice(price: number) {
  while (true) {
    const newPrice = price + Math.floor(Math.random() * 900) + 100;

    const exist = await tryCatch(
      "failed to get unique price",
      db.query.pemilikBootcampTable.findFirst({
        where: and(
          eq(pemilikBootcampTable.harga, newPrice),
          ne(pemilikBootcampTable.status, "Sudah Diverif"),
        ),
      }),
    );

    if (!exist) {
      return newPrice;
    }
  }
}
