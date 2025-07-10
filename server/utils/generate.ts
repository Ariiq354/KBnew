import { and, eq } from "drizzle-orm";
import { db } from "../database";
import { pemilikBootcampTable } from "../database/schema/bootcamp";

export function generateUserCode(length = 4): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * chars.length);
    result += chars[randIndex];
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

    const exist = await db
      .select()
      .from(pemilikBootcampTable)
      .where(
        and(
          eq(pemilikBootcampTable.harga, newPrice),
          eq(pemilikBootcampTable.status, false)
        )
      );

    if (exist.length === 0) {
      return newPrice;
    }
  }
}
