import type { SQL } from "drizzle-orm";
import { and, desc, eq, gte, like, lte, ne, or, sql } from "drizzle-orm";
import { db } from "~~/server/database";
import { userDtlTable, userTable } from "~~/server/database/schema/auth";
import type { TAnggotaDetailCreate, TAnggotaPasangan } from "./anggota.dto";

export async function getAllAnggota({
  limit,
  page,
  search,
}: TSearchPagination) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    ne(userTable.email, "admin@gmail.com"),
  ];
  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(
      or(
        like(userTable.name, searchCondition),
        like(userTable.email, searchCondition),
        like(userTable.noTelepon, searchCondition),
        like(userTable.role, searchCondition),
      ),
    );
  }

  const query = db
    .select({
      id: userTable.id,
      namaAnggota: userTable.name,
      noTelepon: userTable.noTelepon,
      email: userTable.email,
      role: userTable.role,
      isActive: userTable.isActive,
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
        gaji: userDtlTable.gaji,
        perokok: userDtlTable.perokok,
        foto: userDtlTable.foto,
      },
    })
    .from(userTable)
    .where(and(...conditions))
    .leftJoin(userDtlTable, eq(userTable.id, userDtlTable.userId))
    .orderBy(desc(userTable.createdAt));

  const total = await tryCatch("Failed to get total anggota", db.$count(query));

  const data = await tryCatch(
    "Failed to get data anggota",
    query.limit(limit).offset(offset),
  );

  return {
    data,
    total,
  };
}

export async function getAnggotaById(id: number) {
  const query = db
    .select({
      id: userTable.id,
      namaAnggota: userTable.name,
      noTelepon: userTable.noTelepon,
      email: userTable.email,
      role: userTable.role,
      isAvailable: userTable.isAvailable,
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
        kriteria: userDtlTable.kriteria,
        deskripsi: userDtlTable.deskripsi,
        foto: userDtlTable.foto,
      },
    })
    .from(userTable)
    .where(eq(userTable.id, id))
    .leftJoin(userDtlTable, eq(userTable.id, userDtlTable.userId));

  const data = await tryCatch("Failed to get Anggota By Id", query);

  return data.length > 0 ? data[0] : null;
}

export async function createAnggotaDetail(
  id: number,
  body: TAnggotaDetailCreate,
  kodeUser: string,
) {
  return await tryCatch(
    "Failed to insert user detail",
    db
      .insert(userDtlTable)
      .values({
        ...body,
        userId: id,
        kodeUser: kodeUser,
      })
      .onConflictDoUpdate({
        target: userDtlTable.userId,
        set: body,
      }),
  );
}

export async function updateUserActive(id: number, isActive: boolean) {
  await tryCatch(
    "Failed to update user isActive",
    db.update(userTable).set({ isActive }).where(eq(userTable.id, id)),
  );
}

export async function getAnggotaPasangan(id: number, param: TAnggotaPasangan) {
  const offset = (param.page - 1) * param.limit;
  const today = new Date();

  const reqUser = await tryCatch(
    "Failed to get request user",
    db.query.userDtlTable.findFirst({
      where: eq(userDtlTable.userId, id),
    }),
  );

  const conditions: (SQL<unknown> | undefined)[] = [
    ne(userTable.email, "admin@gmail.com"),
    ne(userTable.id, id),
    eq(userTable.isActive, true),
    eq(userTable.isAvailable, true),
  ];

  if (reqUser) {
    conditions.push(ne(userDtlTable.gender, reqUser!.gender));
  }

  if (param.suku)
    conditions.push(
      like(sql`LOWER(${userDtlTable.suku})`, `%${param.suku.toLowerCase()}%`),
    );
  if (param.kodeUser)
    conditions.push(
      like(
        sql`LOWER(${userDtlTable.kodeUser})`,
        `%${param.kodeUser.toLowerCase()}%`,
      ),
    );
  if (param.statusKawin)
    conditions.push(eq(userDtlTable.statusKawin, param.statusKawin));
  if (param.pendidikan)
    conditions.push(eq(userDtlTable.pendidikan, param.pendidikan));
  if (param.provinsi)
    conditions.push(
      eq(userDtlTable.provinsi, `%${param.provinsi.toLowerCase()}%`),
    );
  if (param.kecamatan)
    conditions.push(
      eq(userDtlTable.kecamatan, `%${param.kecamatan.toLowerCase()}%`),
    );
  if (param.kota)
    conditions.push(eq(userDtlTable.kota, `%${param.kota.toLowerCase()}%`));
  if (param.kelurahan)
    conditions.push(
      eq(userDtlTable.kelurahan, `%${param.kelurahan.toLowerCase()}%`),
    );
  if (param.umurMin) {
    const maxBirthDate = subtractYears(today, param.umurMin);
    const maxDateStr = formatDateToYMD(maxBirthDate);
    conditions.push(lte(userDtlTable.tanggalLahir, maxDateStr));
  }
  if (param.umurMax) {
    const minBirthDate = subtractYears(today, param.umurMax);
    const minDateStr = formatDateToYMD(minBirthDate);
    conditions.push(gte(userDtlTable.tanggalLahir, minDateStr));
  }

  const query = db
    .select({
      id: userTable.id,
      namaAnggota: userTable.name,
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
    })
    .from(userTable)
    .where(and(...conditions))
    .leftJoin(userDtlTable, eq(userTable.id, userDtlTable.userId))
    .orderBy(desc(userTable.createdAt));

  const total = await tryCatch(
    "Failed to get total pasangan",
    db.$count(query),
  );

  const data = await tryCatch(
    "Failed to get data pasangan",
    query.limit(param.limit).offset(offset),
  );

  return {
    data,
    total,
  };
}
