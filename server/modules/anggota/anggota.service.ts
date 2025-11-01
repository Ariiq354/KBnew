import type { MultiPartData } from "h3";
import { userDtlTable } from "~~/server/database/schema/auth";
import type { TSearchPagination } from "~~/server/utils/dto";
import ENV from "~~/shared/env";
import { OAnggotaDetailCreate, type TAnggotaPasangan } from "./anggota.dto";
import {
  createAnggotaDetail,
  getAllAnggota,
  getAnggotaById,
  getAnggotaPasangan,
  updateUserActive,
} from "./anggota.repo";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function getAllAnggotaService(query: TSearchPagination) {
  const data = await getAllAnggota(query);

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

export async function getAnggotaPasanganService(
  id: number,
  query: TAnggotaPasangan,
) {
  const data = await getAnggotaPasangan(id, query);

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

export async function getAnggotaByIdService(id: number) {
  return await getAnggotaById(id);
}

export async function createAnggotaDetailService(
  user: UserWithId,
  formData: MultiPartData[] | undefined,
) {
  if (!formData) {
    throw createError({
      statusCode: 400,
      message: "No multipart data found",
    });
  }

  const fields: Record<string, string> = {};

  for (const part of formData) {
    if (part.filename) {
      if (!ALLOWED_TYPES.includes(part.type || "")) {
        throw createError({
          statusCode: 400,
          message: "Invalid file type. Only JPG, PNG, WEBP allowed.",
        });
      }

      if (part.data.length > MAX_FILE_SIZE) {
        throw createError({
          statusCode: 400,
          message: "File is too large. Maximum 5MB allowed.",
        });
      }

      const uploadResult = await uploadCloudinary(
        ENV.USER_PRESET,
        part.data,
        "image",
      );

      fields["foto"] = uploadResult.secure_url;
    } else {
      fields[part.name as string] = part.data.toString();
    }
  }

  const parsed = OAnggotaDetailCreate.parse(fields);

  const kodeUser = await generateUniqueCode(
    userDtlTable,
    userDtlTable.kodeUser,
    4,
  );

  const data = await getAnggotaById(user.id);

  await createAnggotaDetail(user.id, parsed, kodeUser);

  if (!data?.detail) {
    await updateUserActive(user.id, true);
  }
}

export async function updateUserActiveService(id: number, isActive: boolean) {
  await updateUserActive(id, isActive);
}
