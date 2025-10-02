import { and, desc, eq, inArray, like, lte, or } from "drizzle-orm";
import type { SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { diskonTable } from "~~/server/database/schema/diskon";
import type { TDiskonCreate } from "../api/v1/diskon/_dto";
import { pemilikBootcampTable } from "../database/schema/bootcamp";

export async function listAllDiskon({
  limit,
  page,
  search,
}: TSearchPagination) {
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
      status: diskonTable.status,
    })
    .from(diskonTable)
    .where(and(...conditions))
    .orderBy(desc(diskonTable.createdAt));

  const total = await assertToErr(
    "Failed to get total count of diskon",
    db.$count(query),
  );
  const data = await assertToErr(
    "Failed to get diskon",
    query.limit(limit).offset(offset),
  );
  return { data, total };
}

export async function getDiskonByCode(kode: string) {
  const today = new Date().toISOString().slice(0, 10);
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(diskonTable.kode, kode),
    eq(diskonTable.status, true),
    lte(diskonTable.jumlahDipakai, diskonTable.batasPemakai),
    lte(diskonTable.batasWaktu, today),
  ];

  return await assertToErr(
    "Failed to get Diskon by code",
    db.query.diskonTable.findFirst({
      where: and(...conditions),
      columns: {
        batasPemakai: true,
        batasWaktu: true,
        jumlahDipakai: true,
        kode: true,
        persen: true,
      },
    }),
  );
}

export async function createDiskon(body: TDiskonCreate) {
  await assertToErr(
    "Failed to insert Diskon",
    db.insert(diskonTable).values({
      ...body,
    }),
  );
}

export async function updateDiskonByKode(
  kode: string,
  body: Partial<TDiskonCreate>,
) {
  await assertToErr(
    "Failed to update Diskon by kode",
    db
      .update(diskonTable)
      .set({
        ...body,
      })
      .where(eq(diskonTable.kode, kode)),
  );
}

export async function getDiskonDipakai(kode: string) {
  return await assertToErr(
    "Failed to get Diskon dipakai",
    db.$count(
      pemilikBootcampTable,
      and(
        eq(pemilikBootcampTable.diskon, kode),
        eq(pemilikBootcampTable.status, true),
      ),
    ),
  );
}

export async function updateDiskon(id: number, body: Partial<TDiskonCreate>) {
  await assertToErr(
    "Failed to update Diskon",
    db
      .update(diskonTable)
      .set({
        ...body,
      })
      .where(eq(diskonTable.id, id)),
  );
}

export async function deleteDiskon({ id }: TDelete) {
  await assertToErr(
    "Failed to delete Diskon",
    db.delete(diskonTable).where(inArray(diskonTable.id, id)),
  );
}
