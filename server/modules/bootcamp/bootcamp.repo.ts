import type { SQL } from "drizzle-orm";
import { and, desc, eq, inArray, like, or } from "drizzle-orm";
import { db } from "~~/server/database";
import { userTable } from "~~/server/database/schema/auth";
import {
  bootcampTable,
  pemilikBootcampTable,
} from "~~/server/database/schema/bootcamp";
import type { TBootcampCreate, TUserBootcampCreate } from "./bootcamp.dto";

export async function getAllBootcamp({
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
        like(bootcampTable.deskripsi, searchCondition),
        like(bootcampTable.judul, searchCondition),
        like(bootcampTable.tempat, searchCondition),
        like(bootcampTable.pembicara, searchCondition),
        like(bootcampTable.harga, searchCondition),
        like(bootcampTable.waktu, searchCondition),
      ),
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
    .orderBy(desc(bootcampTable.createdAt));

  const total = await tryCatch(
    "Failed to get total bootcamp",
    db.$count(query),
  );

  const data = await tryCatch(
    "Failed to get data bootcamp",
    query.limit(limit).offset(offset),
  );

  return {
    data,
    total,
  };
}

export async function getAllBootcampActive({
  limit,
  page,
  search,
}: TSearchPagination) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(bootcampTable.status, true),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(bootcampTable.judul, searchCondition)));
  }

  const query = db
    .select({
      id: bootcampTable.id,
      judul: bootcampTable.judul,
      tempat: bootcampTable.tempat,
      waktu: bootcampTable.waktu,
      foto: bootcampTable.foto,
      deskripsi: bootcampTable.deskripsi,
      harga: bootcampTable.harga,
    })
    .from(bootcampTable)
    .where(and(...conditions))
    .orderBy(desc(bootcampTable.createdAt));

  const total = await tryCatch(
    "Failed to get total bootcamp active",
    db.$count(query),
  );

  const data = await tryCatch(
    "Failed to get data bootcamp active",
    query.limit(limit).offset(offset),
  );

  return {
    data,
    total,
  };
}

export async function getUserByBootcampId(
  bootcampId: number,
  { page, limit, search }: TSearchPagination,
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(pemilikBootcampTable.idBootcamp, bootcampId),
    eq(pemilikBootcampTable.status, "Sudah Diverif"),
  ];
  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(
      or(
        like(pemilikBootcampTable.kode, searchCondition),
        like(userTable.name, searchCondition),
      ),
    );
  }

  const query = db
    .select({
      id: pemilikBootcampTable.id,
      kode: pemilikBootcampTable.kode,
      nama: userTable.name,
    })
    .from(pemilikBootcampTable)
    .leftJoin(userTable, eq(pemilikBootcampTable.idUser, userTable.id))
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to total user by bootcamp id",
    db.$count(query),
  );

  const data = await tryCatch(
    "Failed to get user by bootcamp id",
    query.limit(limit).offset(offset),
  );

  return {
    data,
    total,
  };
}

export async function getBootcampById(id: number) {
  return await tryCatch(
    "Failed to get Bootcamp by id",
    db.query.bootcampTable.findFirst({
      where: and(eq(bootcampTable.id, id), eq(bootcampTable.status, true)),
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
    }),
  );
}

export async function createBootcamp(body: TBootcampCreate) {
  await tryCatch(
    "Failed to insert Bootcamp",
    db.insert(bootcampTable).values({
      ...body,
    }),
  );
}

export async function updateBootcamp(id: number, body: TBootcampCreate) {
  await tryCatch(
    "Failed to update Bootcamp",
    db
      .update(bootcampTable)
      .set({
        ...body,
      })
      .where(eq(bootcampTable.id, id)),
  );
}

export async function deleteBootcamp({ id }: TDelete) {
  await tryCatch(
    "Failed to delete Bootcamp",
    db.delete(bootcampTable).where(inArray(bootcampTable.id, id)),
  );
}

export async function createUserBootcamp(
  userId: number,
  body: TUserBootcampCreate,
) {
  return await tryCatch(
    "Failed to insert user Bootcamp",
    db
      .insert(pemilikBootcampTable)
      .values({
        ...body,
        idUser: userId,
      })
      .returning({ id: pemilikBootcampTable.id }),
  );
}
