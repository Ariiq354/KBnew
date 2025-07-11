import { and, desc, eq, inArray, like, or } from "drizzle-orm";
import type { SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  bootcampTable,
  pemilikBootcampTable,
} from "~~/server/database/schema/bootcamp";
import type { TDeleteDto } from "../common/dto";
import type { TBootcampCreate } from "./dto/create-bootcamp.dto";
import type { TBootcampList } from "./dto/list-bootcamp.dto";
import type { TUserBootcampCreate } from "./dto/create-user-bootcamp.dto";
import type { TPagination } from "../common/pagination";
import type { TUserBootcampList } from "./dto/list-user-bootcamp.dto";
import { user } from "~~/server/database/schema/auth";

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

export async function updateBootcamp(
  id: number,
  body: Partial<TBootcampCreate>
) {
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

export async function listUserBootcamp({
  limit,
  page,
  search,
}: TUserBootcampList) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [];
  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(pemilikBootcampTable.diskon, searchCondition)));
  }

  const query = db
    .select({
      id: pemilikBootcampTable.id,
      diskon: pemilikBootcampTable.diskon,
      harga: pemilikBootcampTable.harga,
      status: pemilikBootcampTable.status,
      username: user.name,
      bootcamp: bootcampTable.judul,
    })
    .from(pemilikBootcampTable)
    .leftJoin(user, eq(pemilikBootcampTable.idUser, user.id))
    .leftJoin(
      bootcampTable,
      eq(bootcampTable.id, pemilikBootcampTable.idBootcamp)
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
    console.error("Failed to get List User Bootcamp", error);
    throw InternalError;
  }
}

export async function listUserCurrentBootcamp(
  userId: number,
  { limit, page }: TPagination
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(pemilikBootcampTable.idUser, userId),
  ];

  const query = db
    .select({
      id: pemilikBootcampTable.id,
      diskon: pemilikBootcampTable.diskon,
      harga: pemilikBootcampTable.harga,
      status: pemilikBootcampTable.status,
      bootcamp: bootcampTable.judul,
      image: bootcampTable.foto,
    })
    .from(pemilikBootcampTable)
    .leftJoin(
      bootcampTable,
      eq(bootcampTable.id, pemilikBootcampTable.idBootcamp)
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
    console.error("Failed to get User Bootcamp", error);
    throw InternalError;
  }
}

export async function createUserBootcamp(
  userId: number,
  body: TUserBootcampCreate
) {
  try {
    await db.insert(pemilikBootcampTable).values({
      ...body,
      idUser: userId,
    });
  } catch (error) {
    console.error("Failed to insert Bootcamp", error);
    throw InternalError;
  }
}

export async function updateUserBootcamp(
  id: number,
  body: { status: boolean }
) {
  try {
    await db
      .update(pemilikBootcampTable)
      .set({
        ...body,
      })
      .where(eq(pemilikBootcampTable, id));
  } catch (error) {
    console.error("Failed to insert Bootcamp", error);
    throw InternalError;
  }
}
