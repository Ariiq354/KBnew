import { and, desc, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { bootcampTable } from "~~/server/database/schema/bootcamp";
import type { TDeleteDto } from "../common/dto";
import type { TBootcampCreate } from "./dto/create-bootcamp.dto";
import type { TBootcampList } from "./dto/list-bootcamp.dto";

export async function listAllBootcamp({ limit, page, search }: TBootcampList) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [];
  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(
      or(
        like(bootcampTable.deskripsi, searchCondition),
        like(bootcampTable.judul, searchCondition),
        like(bootcampTable.tempat, searchCondition),
        like(bootcampTable.pembicara, searchCondition),
        like(bootcampTable.harga, searchCondition),
        like(bootcampTable.waktu, searchCondition)
      )
    );
  }

  const query = db
    .select({
      id: bootcampTable.id,
      judul: bootcampTable.judul,
      foto: bootcampTable.foto,
      pembicara: bootcampTable.pembicara,
      deskripsi: bootcampTable.deskripsi,
      googleMap: bootcampTable.googleMap,
      harga: bootcampTable.harga,
      status: bootcampTable.status,
      tempat: bootcampTable.tempat,
      waktu: bootcampTable.waktu,
    })
    .from(bootcampTable)
    .where(and(...conditions))
    .orderBy(desc(bootcampTable.createdAt))
    .$dynamic();

  try {
    const total = await getTotalQuery(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Bootcamp", error);
    throw InternalError;
  }
}

export async function getBootcampById(id: number) {
  try {
    return await db.query.bootcampTable.findFirst({
      where: eq(bootcampTable.id, id),
      columns: {
        id: true,
        deskripsi: true,
        foto: true,
        googleMap: true,
        harga: true,
        judul: true,
        pembicara: true,
        status: true,
        tempat: true,
        waktu: true,
      },
    });
  } catch (error) {
    console.error("Failed to get Bootcamp", error);
    throw InternalError;
  }
}

export async function createBootcamp(body: TBootcampCreate) {
  try {
    await db.insert(bootcampTable).values({
      ...body,
    });
  } catch (error) {
    console.error("Failed to insert Bootcamp", error);
    throw InternalError;
  }
}

export async function updateBootcamp(id: number, body: TBootcampCreate) {
  try {
    await db
      .update(bootcampTable)
      .set({
        ...body,
      })
      .where(eq(bootcampTable.id, id));
  } catch (error) {
    console.error("Failed to update Bootcamp", error);
    throw InternalError;
  }
}

export async function deleteBootcamp({ id }: TDeleteDto) {
  try {
    await db.delete(bootcampTable).where(inArray(bootcampTable.id, id));
  } catch (error) {
    console.error("Failed to delete Bootcamp", error);
    throw InternalError;
  }
}
