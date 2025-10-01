import type { TTaarufCreate, TTaarufUpdate } from "../api/v1/taaruf/_dto";
import { getAnggotaById } from "../repository/anggota.repo";
import {
  createTaaruf,
  deleteTaaruf,
  getCountTaarufUser,
  getTaarufById,
  updateTaaruf,
  updateUserStatus,
} from "../repository/taaruf.repo";

async function refreshUserAvailability(userId: number) {
  const count = await getCountTaarufUser(userId);
  await updateUserStatus(userId, count < 3);
}

export async function createTaarufService(
  user: UserWithId,
  body: TTaarufCreate
) {
  const dituju = await getAnggotaById(body.idDituju);

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
