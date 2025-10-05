import type { TSearchPagination } from "~~/server/utils/dto";
import type { TDiskonCreate, TDiskonDipakai } from "./diskon.dto";
import {
  createDiskon,
  deleteDiskon,
  getAllDiskon,
  getDiskonByKode,
  updateDiskon,
  updateDiskonByKode,
} from "./diskon.repo";

export async function getAllDiskonService(query: TSearchPagination) {
  const data = await getAllDiskon(query);

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

export async function getDiskonByKodeService(kode: string) {
  return await getDiskonByKode(kode);
}

export async function createDiskonService(body: TDiskonCreate) {
  await createDiskon(body);
}

export async function updateDiskonByKodeService(
  kode: string,
  body: TDiskonDipakai,
) {
  await updateDiskonByKode(kode, body);
}

export async function updateDiskonService(id: number, body: TDiskonCreate) {
  await updateDiskon(id, body);
}

export async function deleteDiskonService(id: TDelete) {
  await deleteDiskon(id);
}
