import { and, desc, eq, gte, like, lte, ne, or } from "drizzle-orm";
import type { SQL } from "drizzle-orm";
import type { TAnggotaList, TAnggotaPasangan } from "./dto/list-anggota.dto";
import { user, userDtlTable } from "~~/server/database/schema/auth";
import { db } from "~~/server/database";
import type { TAnggotaDetailCreate } from "./dto/create-anggota.dto";

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
      isAvailable: user.isAvailable,
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

    await db.update(user).set({ isActive: true }).where(eq(user.id, id));
  } catch (error) {
    console.error("Failed to insert Bootcamp", error);
    throw InternalError;
  }
}

export async function listAnggotaPasangan(id: number, param: TAnggotaPasangan) {
  const offset = (param.page - 1) * param.limit;
  const today = new Date();

  const reqUser = await db.query.userDtlTable.findFirst({
    where: eq(userDtlTable.userId, id),
  });

  const conditions: (SQL<unknown> | undefined)[] = [
    ne(user.email, "admin@gmail.com"),
    ne(user.id, id),
    ne(userDtlTable.gender, reqUser!.gender),
    eq(user.isActive, true),
    eq(user.isAvailable, true),
  ];

  if (param.suku)
    conditions.push(eq(userDtlTable.suku, `%${param.suku.toLowerCase()}%`));
  if (param.statusKawin)
    conditions.push(eq(userDtlTable.statusKawin, param.statusKawin));
  if (param.pendidikan)
    conditions.push(eq(userDtlTable.pendidikan, param.pendidikan));
  if (param.provinsi)
    conditions.push(
      eq(userDtlTable.provinsi, `%${param.provinsi.toLowerCase()}%`)
    );
  if (param.kecamatan)
    conditions.push(
      eq(userDtlTable.kecamatan, `%${param.kecamatan.toLowerCase()}%`)
    );
  if (param.kota)
    conditions.push(eq(userDtlTable.kota, `%${param.kota.toLowerCase()}%`));
  if (param.kelurahan)
    conditions.push(
      eq(userDtlTable.kelurahan, `%${param.kelurahan.toLowerCase()}%`)
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
      id: user.id,
      namaAnggota: user.name,
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
    .from(user)
    .where(and(...conditions))
    .leftJoin(userDtlTable, eq(user.id, userDtlTable.userId))
    .orderBy(desc(user.createdAt))
    .$dynamic();

  try {
    const total = await getTotalQuery(query);
    const data = await query.limit(param.limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Pasangan", error);
    throw InternalError;
  }
}
