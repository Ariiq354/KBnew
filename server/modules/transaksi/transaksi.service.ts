import { pemilikBootcampTable } from "~~/server/database/schema/bootcamp";
import {
  deleteTransaksi,
  deleteTransaksiUser,
  getAllTransaksi,
  getAllTransaksiUser,
  updateTransaksiStatus,
} from "./transaksi.repo";

export async function getAllTransaksiService(query: TSearchPagination) {
  const data = await getAllTransaksi(query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return {
    data: data.data,
    metadata,
  };
}

export async function getAllTransaksiUserService(
  id: number,
  query: TPagination,
) {
  const data = await getAllTransaksiUser(id, query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return {
    data: data.data,
    metadata,
  };
}

export async function updateTransaksiStatusService(
  id: number,
  status: "Belum Dibayar" | "Sudah Dibayar" | "Sudah Diverif",
  idUser?: number,
) {
  if (status === "Sudah Diverif") {
    const kode = await generateUniqueCode(
      pemilikBootcampTable,
      pemilikBootcampTable.kode,
      12,
    );

    await updateTransaksiStatus(id, status, idUser, kode);
  }

  await updateTransaksiStatus(id, status);
}

export async function deleteTransaksiService(id: number[]) {
  await deleteTransaksi(id);
}

export async function deleteTransaksiUserService(userId: number, id: number[]) {
  await deleteTransaksiUser(userId, id);
}
