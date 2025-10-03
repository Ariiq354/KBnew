import type { MultiPartData } from "h3";
import sanitizeHtml from "sanitize-html";
import ENV from "~~/shared/env";
import {
  OBootcampCreate,
  type TUserBootcampCreate,
} from "../api/v1/bootcamp/_dto";
import {
  createBootcamp,
  createUserBootcamp,
  deleteBootcamp,
  getBootcampById,
  updateBootcamp,
} from "../repository/bootcamp.repo";
import { getDiskonByCode, updateDiskonByKode } from "../repository/diskon.repo";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function createBootcampService(
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

  const parsed = OBootcampCreate.parse(fields);

  parsed.deskripsi = sanitizeHtml(parsed.deskripsi);

  await createBootcamp(parsed);
}

export async function updateBootcampService(
  id: number,
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

  const parsed = OBootcampCreate.parse(fields);

  if (fields["file"]) {
    if (parsed.foto) {
      const publicId = getPublicIdFromUrl(parsed.foto);
      await deleteCloudinary(publicId, "image");
    }
    parsed.foto = fields["file"] as string;
  }

  parsed.deskripsi = sanitizeHtml(parsed.deskripsi);

  await updateBootcamp(id, parsed);
}

export async function deleteBootcampService(body: TDelete) {
  for (const id of body.id) {
    const data = await getBootcampById(id);
    if (!data) {
      throw createError({
        statusCode: 400,
        message: "Item not found",
      });
    }

    if (data.foto) {
      const publicId = getPublicIdFromUrl(data.foto);
      await deleteCloudinary(publicId, "image");
    }
  }

  await deleteBootcamp(body);
}

export async function addUserBootcampService(
  user: UserWithId,
  body: TUserBootcampCreate,
) {
  const newPrice = await getUniquePrice(body.harga);

  const [id] = await createUserBootcamp(user.id, {
    diskon: body.diskon,
    harga: newPrice,
    idBootcamp: body.idBootcamp,
  });

  if (body.diskon) {
    const diskon = await getDiskonByCode(body.diskon);

    const newJumlahDipakai = diskon!.jumlahDipakai + 1;
    const isLimitReached = newJumlahDipakai === diskon!.batasPemakai;

    if (isLimitReached) {
      await updateDiskonByKode(body.diskon, {
        jumlahDipakai: newJumlahDipakai,
        status: false,
      });
    } else {
      await updateDiskonByKode(body.diskon, {
        jumlahDipakai: newJumlahDipakai,
      });
    }
  }

  return {
    newPrice,
    id: id.id,
  };
}
