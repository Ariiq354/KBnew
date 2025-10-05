import type { TSearchPagination } from "~~/server/utils/dto";
import { getAnggotaByIdService } from "../anggota";
import type { TTaarufCreate, TTaarufUpdate } from "./taaruf.dto";
import {
  createTaaruf,
  deleteTaaruf,
  getAllTaaruf,
  getCountTaarufUser,
  getTaarufById,
  getUserTaaruf,
  updateTaaruf,
  updateUserStatus,
} from "./taaruf.repo";

async function refreshUserAvailability(userId: number) {
  const count = await getCountTaarufUser(userId);
  await updateUserStatus(userId, count < 3);
}

export async function getAllTaarufService(query: TSearchPagination) {
  const data = await getAllTaaruf(query);

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

export async function getUserTaarufService(
  id: number,
  query: TSearchPagination,
) {
  const data = await getUserTaaruf(id, query);

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

export async function createTaarufService(
  user: UserWithId,
  body: TTaarufCreate,
) {
  const dituju = await getAnggotaByIdService(body.idDituju);

  if (!user.isAvailable || !dituju?.isAvailable) {
    throw createError({
      statusCode: 400,
      message: "Anggota atau Anda sudah tidak available",
    });
  }

  await createTaaruf(user.id, body);

  await refreshUserAvailability(user.id);
  await refreshUserAvailability(body.idDituju);
}

export async function updateTaarufService(id: number, body: TTaarufUpdate) {
  await updateTaaruf(id, body);

  if (body.status === "ditolak") {
    const taaruf = await getTaarufById(id);
    await refreshUserAvailability(taaruf!.idPenuju);
    await refreshUserAvailability(taaruf!.idDituju);
  }
}

export async function deleteTaarufService(body: TDelete) {
  for (const id of body.id) {
    const taaruf = await getTaarufById(id);
    await refreshUserAvailability(taaruf!.idPenuju);
    await refreshUserAvailability(taaruf!.idDituju);
  }

  await deleteTaaruf(body);
}
