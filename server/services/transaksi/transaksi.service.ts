import type { SQL } from "drizzle-orm";
import { and, desc, eq, like, or } from "drizzle-orm";
import { db } from "~~/server/database";
import { user } from "~~/server/database/schema/auth";
import {
  bootcampTable,
  pemilikBootcampTable,
} from "~~/server/database/schema/bootcamp";
import type { TTransaksiCreate } from "./dto/create-transaksi.dto";
import type { TTransaksiList } from "./dto/list-transaksi.dto";
import type { TPagination } from "../common/pagination";

export async function listAllTransaksi({
  limit,
  page,
  search,
}: TTransaksiList) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [];
  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(
      or(
        like(pemilikBootcampTable.harga, searchCondition),
        like(user.name, searchCondition),
        like(bootcampTable.judul, searchCondition),
        like(pemilikBootcampTable.diskon, searchCondition),
      ),
    );
  }

  const query = db
    .select({
      id: pemilikBootcampTable.id,
      nama: user.name,
      namaBootcamp: bootcampTable.judul,
      harga: pemilikBootcampTable.harga,
      diskon: pemilikBootcampTable.diskon,
      status: pemilikBootcampTable.status,
    })
    .from(pemilikBootcampTable)
    .leftJoin(user, eq(pemilikBootcampTable.idUser, user.id))
    .leftJoin(
      bootcampTable,
      eq(pemilikBootcampTable.idBootcamp, bootcampTable.id),
    )
    .where(and(...conditions))
    .orderBy(desc(pemilikBootcampTable.createdAt))
    .$dynamic();

  try {
    const total = await getTotalQuery(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Transaksi", error);
    throw InternalError;
  }
}

export async function listAllTransaksiUser(
  id: number,
  { limit, page }: TPagination,
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [eq(user.id, id)];

  const query = db
    .select({
      id: pemilikBootcampTable.id,
      namaBootcamp: bootcampTable.judul,
      harga: pemilikBootcampTable.harga,
      diskon: pemilikBootcampTable.diskon,
      status: pemilikBootcampTable.status,
    })
    .from(pemilikBootcampTable)
    .leftJoin(user, eq(pemilikBootcampTable.idUser, user.id))
    .leftJoin(
      bootcampTable,
      eq(pemilikBootcampTable.idBootcamp, bootcampTable.id),
    )
    .where(and(...conditions))
    .orderBy(desc(pemilikBootcampTable.createdAt))
    .$dynamic();

  try {
    const total = await getTotalQuery(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Transaksi User", error);
    throw InternalError;
  }
}

export async function updateTransaksi(
  id: number,
  body: Partial<TTransaksiCreate>,
) {
  try {
    await db
      .update(pemilikBootcampTable)
      .set({
        ...body,
      })
      .where(eq(pemilikBootcampTable.id, id));
  } catch (error) {
    console.error("Failed to update Transaksi", error);
    throw InternalError;
  }
}
