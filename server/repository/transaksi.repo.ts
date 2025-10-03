import type { SQL } from "drizzle-orm";
import { and, desc, eq, inArray, like, or } from "drizzle-orm";
import { db } from "~~/server/database";
import { userTable } from "~~/server/database/schema/auth";
import {
  bootcampTable,
  pemilikBootcampTable,
} from "~~/server/database/schema/bootcamp";
import { diskonTable } from "../database/schema/diskon";

export async function listAllTransaksi({
  limit,
  page,
  search,
}: TSearchPagination) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [];
  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(
      or(
        like(pemilikBootcampTable.harga, searchCondition),
        like(userTable.name, searchCondition),
        like(bootcampTable.judul, searchCondition),
        like(pemilikBootcampTable.diskon, searchCondition),
      ),
    );
  }

  const query = db
    .select({
      id: pemilikBootcampTable.id,
      nama: userTable.name,
      namaBootcamp: bootcampTable.judul,
      harga: pemilikBootcampTable.harga,
      diskon: pemilikBootcampTable.diskon,
      status: pemilikBootcampTable.status,
    })
    .from(pemilikBootcampTable)
    .leftJoin(userTable, eq(pemilikBootcampTable.idUser, userTable.id))
    .leftJoin(
      bootcampTable,
      eq(pemilikBootcampTable.idBootcamp, bootcampTable.id),
    )
    .where(and(...conditions))
    .orderBy(desc(pemilikBootcampTable.createdAt))
    .$dynamic();

  const total = await assertToErr(
    "Failed to get total transaksi",
    db.$count(query),
  );

  const data = await assertToErr(
    "Failed to get data transaksi",
    query.limit(limit).offset(offset),
  );

  return {
    data,
    total,
  };
}

export async function listAllTransaksiUser(
  id: number,
  { limit, page }: TPagination,
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [eq(userTable.id, id)];

  const query = db
    .select({
      id: pemilikBootcampTable.id,
      harga: pemilikBootcampTable.harga,
      status: pemilikBootcampTable.status,
      kode: pemilikBootcampTable.kode,
      createdAt: pemilikBootcampTable.createdAt,
      bootcamp: {
        namaBootcamp: bootcampTable.judul,
        hargaBootcamp: bootcampTable.harga,
        waktu: bootcampTable.waktu,
        foto: bootcampTable.foto,
        tempat: bootcampTable.tempat,
      },
      diskon: {
        kode: pemilikBootcampTable.diskon,
        persen: diskonTable.persen,
      },
    })
    .from(pemilikBootcampTable)
    .leftJoin(userTable, eq(pemilikBootcampTable.idUser, userTable.id))
    .leftJoin(
      bootcampTable,
      eq(pemilikBootcampTable.idBootcamp, bootcampTable.id),
    )
    .leftJoin(diskonTable, eq(pemilikBootcampTable.diskon, diskonTable.kode))
    .where(and(...conditions))
    .orderBy(desc(pemilikBootcampTable.createdAt))
    .$dynamic();

  const total = await assertToErr(
    "Failed to get total transaksi user",
    db.$count(query),
  );

  const data = await assertToErr(
    "Failed to get data transaksi user",
    query.limit(limit).offset(offset),
  );

  return {
    data,
    total,
  };
}

export async function updateTransaksiStatus(
  id: number,
  status: "Belum Dibayar" | "Sudah Dibayar" | "Sudah Diverif",
  idUser?: number,
  kode?: string,
) {
  await assertToErr(
    "Failed to update Transaksi",
    db
      .update(pemilikBootcampTable)
      .set({
        status,
        kode,
      })
      .where(
        and(
          eq(pemilikBootcampTable.id, id),
          ...(idUser ? [eq(pemilikBootcampTable.idUser, idUser)] : []),
        ),
      ),
  );
}

export async function deleteTransaksi(id: number[]) {
  await assertToErr(
    "Failed to delete Transaksi",
    db.delete(pemilikBootcampTable).where(inArray(pemilikBootcampTable.id, id)),
  );
}

export async function deleteTransaksiUser(userId: number, id: number[]) {
  await assertToErr(
    "Failed to delete Transaksi User",
    db
      .delete(pemilikBootcampTable)
      .where(
        and(
          inArray(pemilikBootcampTable.id, id),
          eq(pemilikBootcampTable.idUser, userId),
        ),
      ),
  );
}
