import { createBootcamp } from "~~/server/services/bootcamp/bootcamp.service";
import { OBootcampCreate } from "~~/server/services/bootcamp/dto/create-bootcamp.dto";
import { uploadCloudinary } from "~~/server/utils/cloudinary";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const result = await readMultipartFormData(event);
  const { bootcampPreset } = useRuntimeConfig();

  if (!result) {
    throw createError({
      statusCode: 400,
      message: "No multipart data found",
    });
  }

  let fields: Record<string, string> = {};

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

      const uploadResult = await uploadCloudinary(bootcampPreset, part.data);

      fields["foto"] = uploadResult.secure_url;
    } else {
      fields[part.name as string] = part.data.toString();
    }
  }

  const parsed = OBootcampCreate.parse(fields);

  await createBootcamp(parsed);

  return HttpResponse();
});
