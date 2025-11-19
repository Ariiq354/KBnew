import { and, desc, eq, inArray, like, ne, or } from "drizzle-orm";
import type { SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { taarufTable } from "~~/server/database/schema/taaruf";
import { userTable, userDtlTable } from "~~/server/database/schema/auth";
import { alias } from "drizzle-orm/pg-core";
import type { TTaarufCreate, TTaarufUpdate } from "./taaruf.dto";

export async function getTaarufById(id: number) {
  return await tryCatch(
    "Failed to get taaruf by id",
    db.query.taarufTable.findFirst({
      where: eq(taarufTable.id, id),
    }),
  );
}

export async function updateUserStatus(id: number, status: boolean) {
  return await tryCatch(
    "Failed to update user status",
    db
      .update(userTable)
      .set({ isAvailable: status })
      .where(eq(userTable.id, id)),
  );
}

export async function getCountTaarufUser(id: number) {
  return db.$count(
    taarufTable,
    and(or(eq(taarufTable.idPenuju, id)), ne(taarufTable.status, "ditolak")),
  );
}

export async function getAllTaaruf({ limit, page, search }: TSearchPagination) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [];

  const userAsPenuju = alias(userTable, "user_penuju");
  const userAsDituju = alias(userTable, "user_dituju");
  const userDtlAsPenuju = alias(userDtlTable, "detail_penuju");
  const userDtlAsDituju = alias(userDtlTable, "detail_dituju");

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(
      or(
        like(userAsPenuju.name, searchCondition),
        like(userAsDituju.name, searchCondition),
      ),
    );
  }

  const query = db
    .select({
      id: taarufTable.id,
      status: taarufTable.status,
      idPenuju: taarufTable.idPenuju,
      idDituju: taarufTable.idDituju,
      dituju: {
        namaAnggota: userAsDituju.name,
        kodeUser: userDtlAsDituju.kodeUser,
        statusKawin: userDtlAsDituju.statusKawin,
        tanggalLahir: userDtlAsDituju.tanggalLahir,
        kelurahan: userDtlAsDituju.kelurahan,
        kecamatan: userDtlAsDituju.kecamatan,
        kota: userDtlAsDituju.kota,
        provinsi: userDtlAsDituju.provinsi,
        gender: userDtlAsDituju.gender,
        namaAyah: userDtlAsDituju.namaAyah,
        anakKe: userDtlAsDituju.anakKe,
        dariBersaudara: userDtlAsDituju.dariBersaudara,
        suku: userDtlAsDituju.suku,
        pendidikan: userDtlAsDituju.pendidikan,
        pekerjaan: userDtlAsDituju.pekerjaan,
        jurusan: userDtlAsDituju.jurusan,
        tinggi: userDtlAsDituju.tinggi,
        berat: userDtlAsDituju.berat,
        hobi: userDtlAsDituju.hobi,
        instagram: userDtlAsDituju.instagram,
        kriteria: userDtlAsDituju.kriteria,
        deskripsi: userDtlAsDituju.deskripsi,
        foto: userDtlAsDituju.foto,
      },
      penuju: {
        namaAnggota: userAsPenuju.name,
        kodeUser: userDtlAsPenuju.kodeUser,
        statusKawin: userDtlAsPenuju.statusKawin,
        tanggalLahir: userDtlAsPenuju.tanggalLahir,
        kelurahan: userDtlAsPenuju.kelurahan,
        kecamatan: userDtlAsPenuju.kecamatan,
        kota: userDtlAsPenuju.kota,
        provinsi: userDtlAsPenuju.provinsi,
        gender: userDtlAsPenuju.gender,
        namaAyah: userDtlAsPenuju.namaAyah,
        anakKe: userDtlAsPenuju.anakKe,
        dariBersaudara: userDtlAsPenuju.dariBersaudara,
        suku: userDtlAsPenuju.suku,
        pendidikan: userDtlAsPenuju.pendidikan,
        pekerjaan: userDtlAsPenuju.pekerjaan,
        jurusan: userDtlAsPenuju.jurusan,
        tinggi: userDtlAsPenuju.tinggi,
        berat: userDtlAsPenuju.berat,
        hobi: userDtlAsPenuju.hobi,
        instagram: userDtlAsPenuju.instagram,
        kriteria: userDtlAsPenuju.kriteria,
        deskripsi: userDtlAsPenuju.deskripsi,
        foto: userDtlAsPenuju.foto,
      },
    })
    .from(taarufTable)
    .leftJoin(userAsPenuju, eq(taarufTable.idPenuju, userAsPenuju.id))
    .leftJoin(userAsDituju, eq(taarufTable.idDituju, userAsDituju.id))
    .leftJoin(userDtlAsPenuju, eq(userAsPenuju.id, userDtlAsPenuju.userId))
    .leftJoin(userDtlAsDituju, eq(userAsDituju.id, userDtlAsDituju.userId))
    .where(and(...conditions))
    .orderBy(desc(taarufTable.createdAt))
    .$dynamic();

  const total = await tryCatch(
    "Failed to get total count of Taaruf List",
    db.$count(query),
  );
  const data = await tryCatch(
    "Failed to get Taaruf List",
    query.limit(limit).offset(offset),
  );
  return { data, total };
}

export async function getUserTaaruf(
  userId: number,
  { limit, page, search }: TSearchPagination,
) {
  const offset = (page - 1) * limit;
  const userAsPenuju = alias(userTable, "user_penuju");
  const userDtlAsPenuju = alias(userDtlTable, "detail_penuju");
  const userAsDituju = alias(userTable, "user_dituju");
  const userDtlAsDituju = alias(userDtlTable, "detail_dituju");

  const conditions: (SQL<unknown> | undefined)[] = [
    or(eq(taarufTable.idPenuju, userId), eq(taarufTable.idDituju, userId)),
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(
      or(
        like(userAsDituju.name, searchCondition),
        like(userAsPenuju.name, searchCondition),
      ),
    );
  }

  const query = db
    .select({
      id: taarufTable.id,
      status: taarufTable.status,
      idDituju: taarufTable.idDituju,
      dituju: {
        namaAnggota: userAsDituju.name,
        kodeUser: userDtlAsDituju.kodeUser,
        statusKawin: userDtlAsDituju.statusKawin,
        tanggalLahir: userDtlAsDituju.tanggalLahir,
        kelurahan: userDtlAsDituju.kelurahan,
        kecamatan: userDtlAsDituju.kecamatan,
        kota: userDtlAsDituju.kota,
        provinsi: userDtlAsDituju.provinsi,
        gender: userDtlAsDituju.gender,
        namaAyah: userDtlAsDituju.namaAyah,
        anakKe: userDtlAsDituju.anakKe,
        dariBersaudara: userDtlAsDituju.dariBersaudara,
        suku: userDtlAsDituju.suku,
        pendidikan: userDtlAsDituju.pendidikan,
        pekerjaan: userDtlAsDituju.pekerjaan,
        jurusan: userDtlAsDituju.jurusan,
        tinggi: userDtlAsDituju.tinggi,
        berat: userDtlAsDituju.berat,
        hobi: userDtlAsDituju.hobi,
        kriteria: userDtlAsDituju.kriteria,
        deskripsi: userDtlAsDituju.deskripsi,
        foto: userDtlAsDituju.foto,
      },
      idPenuju: taarufTable.idPenuju,
      penuju: {
        namaAnggota: userAsPenuju.name,
        kodeUser: userDtlAsPenuju.kodeUser,
        statusKawin: userDtlAsPenuju.statusKawin,
        tanggalLahir: userDtlAsPenuju.tanggalLahir,
        kelurahan: userDtlAsPenuju.kelurahan,
        kecamatan: userDtlAsPenuju.kecamatan,
        kota: userDtlAsPenuju.kota,
        provinsi: userDtlAsPenuju.provinsi,
        gender: userDtlAsPenuju.gender,
        namaAyah: userDtlAsPenuju.namaAyah,
        anakKe: userDtlAsPenuju.anakKe,
        dariBersaudara: userDtlAsPenuju.dariBersaudara,
        suku: userDtlAsPenuju.suku,
        pendidikan: userDtlAsPenuju.pendidikan,
        pekerjaan: userDtlAsPenuju.pekerjaan,
        jurusan: userDtlAsPenuju.jurusan,
        tinggi: userDtlAsPenuju.tinggi,
        berat: userDtlAsPenuju.berat,
        hobi: userDtlAsPenuju.hobi,
        kriteria: userDtlAsPenuju.kriteria,
        deskripsi: userDtlAsPenuju.deskripsi,
        foto: userDtlAsPenuju.foto,
      },
    })
    .from(taarufTable)
    .leftJoin(userAsDituju, eq(taarufTable.idDituju, userAsDituju.id))
    .leftJoin(userDtlAsDituju, eq(userAsDituju.id, userDtlAsDituju.userId))
    .leftJoin(userAsPenuju, eq(taarufTable.idPenuju, userAsPenuju.id))
    .leftJoin(userDtlAsPenuju, eq(userAsPenuju.id, userDtlAsPenuju.userId))
    .where(and(...conditions))
    .orderBy(desc(taarufTable.createdAt))
    .$dynamic();

  const total = await tryCatch(
    "Failed to get total count of User Taaruf List",
    db.$count(query),
  );
  const data = await tryCatch(
    "Failed to get User Taaruf List",
    query.limit(limit).offset(offset),
  );
  return { data, total };
}

export async function createTaaruf(idPenuju: number, body: TTaarufCreate) {
  await tryCatch(
    "Failed to insert Taaruf",
    db.insert(taarufTable).values({
      idPenuju,
      ...body,
    }),
  );
}

export async function updateTaaruf(id: number, body: TTaarufUpdate) {
  await tryCatch(
    "Failed to update Taaruf",
    db
      .update(taarufTable)
      .set({
        ...body,
      })
      .where(eq(taarufTable.id, id)),
  );
}

export async function deleteTaaruf({ id }: TDelete) {
  await tryCatch(
    "Failed to delete Taaruf",
    db.delete(taarufTable).where(inArray(taarufTable.id, id)),
  );
}
