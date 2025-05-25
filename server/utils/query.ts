import { sql } from "drizzle-orm";
import { db } from "../database";

export async function getTotalQuery(query: any): Promise<number> {
  const newQuery = query.as("sq");

  const countResult = await db
    .select({
      count: sql<number>`COUNT(*)`,
    })
    .from(newQuery);
  return countResult[0]?.count ?? 0;
}
