import { z } from "zod/v4-mini";
import {
  deleteBootcamp,
  getBootcampById,
} from "~~/server/services/bootcamp/bootcamp.service";
import { ODeleteSchema } from "~~/server/services/common/dto";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await readValidatedBody(event, (query) =>
    ODeleteSchema.parse(query)
  );

  for (const id of query.id) {
    const data = await getBootcampById(id);
    if (!data) {
      throw createError({
        statusCode: 400,
        message: "Item not found",
      });
    }

    if (data.foto) {
      const publicId = getPublicIdFromUrl(data.foto);
      await deleteCloudinary(publicId);
    }
  }

  await deleteBootcamp(query);
  return HttpResponse();
});
