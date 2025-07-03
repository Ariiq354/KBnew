import { and, desc, eq, inArray, like, or  } from "drizzle-orm";
import type {SQL} from "drizzle-orm";
import { db } from "~~/server/database";
import { diskonTable } from "~~/server/database/schema/diskon";
import type { TDeleteDto } from "../common/dto";
import type { TDiskonCreate } from "./dto/create-diskon.dto";
import type { TDiskonList } from "./dto/list-diskon.dto";

export async function listAllDiskon({ limit, page, search }: TDiskonList) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [];
  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(diskonTable.kode, searchCondition)));
  }

  const query = db
    .select({
      id: diskonTable.id,
      batasPemakai: diskonTable.batasPemakai,
      batasWaktu: diskonTable.batasWaktu,
      jumlahDipakai: diskonTable.jumlahDipakai,
      kode: diskonTable.kode,
      persen: diskonTable.persen,
    })
    .from(diskonTable)
    .where(and(...conditions))
    .orderBy(desc(diskonTable.createdAt))
    .$dynamic();

  try {
    const total = await getTotalQuery(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Diskon", error);
    throw InternalError;
  }
}

export async function getDiskonById(id: number) {
  try {
    return await db.query.diskonTable.findFirst({
      where: eq(diskonTable.id, id),
      columns: {
        batasPemakai: true,
        batasWaktu: true,
        jumlahDipakai: true,
        kode: true,
        persen: true,
      },
    });
  } catch (error) {
    console.error("Failed to get Diskon", error);
    throw InternalError;
  }
}

export async function createDiskon(body: TDiskonCreate) {
  try {
    await db.insert(diskonTable).values({
      ...body,
    });
  } catch (error) {
    console.error("Failed to insert Diskon", error);
    throw InternalError;
  }
}

export async function updateDiskon(id: number, body: Partial<TDiskonCreate>) {
  try {
    await db
      .update(diskonTable)
      .set({
        ...body,
      })
      .where(eq(diskonTable.id, id));
  } catch (error) {
    console.error("Failed to update Diskon", error);
    throw InternalError;
  }
}

export async function deleteDiskon({ id }: TDeleteDto) {
  try {
    await db.delete(diskonTable).where(inArray(diskonTable.id, id));
  } catch (error) {
    console.error("Failed to delete Diskon", error);
    throw InternalError;
  }
}
