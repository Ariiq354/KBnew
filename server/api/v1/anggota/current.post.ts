import { createAnggotaDetail } from "~~/server/services/anggota/anggota.service";
import { OAnggotaDetailCreate } from "~~/server/services/anggota/dto/create-anggota.dto";
import ENV from "~~/shared/env";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const result = await readMultipartFormData(event);

  if (!result) {
    throw createError({
      statusCode: 400,
      message: "No multipart data found",
    });
  }

  const fields: Record<string, string> = {};

  for (const part of result) {
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

      const uploadResult = await uploadCloudinary(ENV.USER_PRESET, part.data);

      fields["foto"] = uploadResult.secure_url;
    } else {
      fields[part.name as string] = part.data.toString();
    }
  }

  const parsed = OAnggotaDetailCreate.parse(fields);

  await createAnggotaDetail(user.id, parsed);

  return HttpResponse();
});
