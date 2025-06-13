import { and, desc, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { taarufTable } from "~~/server/database/schema/taaruf";
import type { TDeleteDto } from "../common/dto";
import type { TTaarufCreate, TTaarufUpdate } from "./dto/create-taaruf.dto";
import type { TTaarufList } from "./dto/list-taaruf.dto";
import { user, userDtlTable } from "~~/server/database/schema/auth";
import { alias } from "drizzle-orm/sqlite-core";

export async function listAllTaaruf({ limit, page, search }: TTaarufList) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [];

  const userAsPenuju = alias(user, "user_penuju");
  const userAsDituju = alias(user, "user_dituju");
  const userDtlAsPenuju = alias(userDtlTable, "detail_penuju");
  const userDtlAsDituju = alias(userDtlTable, "detail_dituju");

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(
      or(
        like(userAsPenuju.name, searchCondition),
        like(userAsDituju.name, searchCondition)
      )
    );
  }

  const query = db
    .select({
      id: taarufTable.id,
      status: taarufTable.status,
      idPenuju: taarufTable.idPenuju,
      idDituju: taarufTable.idDituju,
    })
    .from(taarufTable)
    .leftJoin(userAsPenuju, eq(taarufTable.idPenuju, userAsPenuju.id))
    .leftJoin(userAsDituju, eq(taarufTable.idDituju, userAsDituju.id))
    .leftJoin(userDtlAsPenuju, eq(userAsPenuju.id, userDtlAsPenuju.userId))
    .leftJoin(userDtlAsDituju, eq(userAsDituju.id, userDtlAsDituju.userId))
    .where(and(...conditions))
    .orderBy(desc(taarufTable.createdAt))
    .$dynamic();

  try {
    const total = await getTotalQuery(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Taaruf", error);
    throw InternalError;
  }
}

export async function createTaaruf(idPenuju: number, body: TTaarufCreate) {
  try {
    await db.insert(taarufTable).values({
      idPenuju,
      ...body,
    });

    await db
      .update(user)
      .set({
        isAvailable: false,
      })
      .where(inArray(user.id, [idPenuju, body.idDituju]));
  } catch (error) {
    console.error("Failed to insert Taaruf", error);
    throw InternalError;
  }
}

export async function updateTaaruf(id: number, body: TTaarufUpdate) {
  try {
    await db
      .update(taarufTable)
      .set({
        ...body,
      })
      .where(eq(taarufTable.id, id));
  } catch (error) {
    console.error("Failed to update Taaruf", error);
    throw InternalError;
  }
}

export async function deleteTaaruf({ id }: TDeleteDto) {
  try {
    const userIds: number[] = [];

    for (const i of id) {
      const taaruf = await db.query.taarufTable.findFirst({
        where: eq(taarufTable.id, i),
      });
      if (taaruf) {
        userIds.push(taaruf.idDituju, taaruf.idPenuju);
      }
    }

    await db
      .update(user)
      .set({ isAvailable: true })
      .where(inArray(user.id, userIds));

    await db.delete(taarufTable).where(inArray(taarufTable.id, id));
  } catch (error) {
    console.error("Failed to delete Taaruf", error);
    throw InternalError;
  }
}
