import { and, desc, eq, like, ne, or, type SQL } from "drizzle-orm";
import type { TAnggotaList } from "./dto/list-anggota.dto";
import { user, userDtlTable } from "~~/server/database/schema/auth";
import { db } from "~~/server/database";
import { TAnggotaDetailCreate } from "./dto/create-anggota.dto";

export async function listAllAnggota({ limit, page, search }: TAnggotaList) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    ne(user.email, "admin@gmail.com"),
  ];
  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(
      or(
        like(user.name, searchCondition),
        like(user.email, searchCondition),
        like(user.noTelepon, searchCondition),
        like(user.role, searchCondition)
      )
    );
  }

  const query = db
    .select({
      id: user.id,
      namaAnggota: user.name,
      noTelepon: user.noTelepon,
      email: user.email,
      role: user.role,
      detail: {
        kodeUser: userDtlTable.kodeUser,
        statusKawin: userDtlTable.statusKawin,
        tanggalLahir: userDtlTable.tanggalLahir,
        kelurahan: userDtlTable.kelurahan,
        kecamatan: userDtlTable.kecamatan,
        kota: userDtlTable.kota,
        provinsi: userDtlTable.provinsi,
        gender: userDtlTable.gender,
        namaAyah: userDtlTable.namaAyah,
        anakKe: userDtlTable.anakKe,
        dariBersaudara: userDtlTable.dariBersaudara,
        suku: userDtlTable.suku,
        pendidikan: userDtlTable.pendidikan,
        pekerjaan: userDtlTable.pekerjaan,
        jurusan: userDtlTable.jurusan,
        tinggi: userDtlTable.tinggi,
        berat: userDtlTable.berat,
        hobi: userDtlTable.hobi,
        instagram: userDtlTable.instagram,
        kriteria: userDtlTable.kriteria,
        deskripsi: userDtlTable.deskripsi,
        foto: userDtlTable.foto,
      },
    })
    .from(user)
    .where(and(...conditions))
    .leftJoin(userDtlTable, eq(user.id, userDtlTable.userId))
    .orderBy(desc(user.createdAt))
    .$dynamic();

  try {
    const total = await getTotalQuery(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Anggota", error);
    throw InternalError;
  }
}

export async function getAnggotaById(id: number) {
  const query = db
    .select({
      id: user.id,
      namaAnggota: user.name,
      noTelepon: user.noTelepon,
      email: user.email,
      role: user.role,
      detail: {
        kodeUser: userDtlTable.kodeUser,
        statusKawin: userDtlTable.statusKawin,
        tanggalLahir: userDtlTable.tanggalLahir,
        kelurahan: userDtlTable.kelurahan,
        kecamatan: userDtlTable.kecamatan,
        kota: userDtlTable.kota,
        provinsi: userDtlTable.provinsi,
        gender: userDtlTable.gender,
        namaAyah: userDtlTable.namaAyah,
        anakKe: userDtlTable.anakKe,
        dariBersaudara: userDtlTable.dariBersaudara,
        suku: userDtlTable.suku,
        pendidikan: userDtlTable.pendidikan,
        pekerjaan: userDtlTable.pekerjaan,
        jurusan: userDtlTable.jurusan,
        tinggi: userDtlTable.tinggi,
        berat: userDtlTable.berat,
        hobi: userDtlTable.hobi,
        instagram: userDtlTable.instagram,
        kriteria: userDtlTable.kriteria,
        deskripsi: userDtlTable.deskripsi,
        foto: userDtlTable.foto,
      },
    })
    .from(user)
    .where(eq(user.id, id))
    .leftJoin(userDtlTable, eq(user.id, userDtlTable.userId));

  try {
    const data = await query;

    return data[0];
  } catch (error) {
    console.error("Failed to get Anggota", error);
    throw InternalError;
  }
}

export async function createAnggotaDetail(
  id: number,
  body: TAnggotaDetailCreate
) {
  try {
    const kodeUser = generateUserCode(4);

    await db
      .insert(userDtlTable)
      .values({
        ...body,
        userId: id,
        kodeUser: kodeUser,
      })
      .onConflictDoUpdate({
        target: userDtlTable.userId,
        set: body,
      });
  } catch (error) {
    console.error("Failed to insert Bootcamp", error);
    throw InternalError;
  }
}
