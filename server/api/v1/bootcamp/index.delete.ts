import { z } from "zod/v4-mini";
import { deleteBootcamp } from "~~/server/services/bootcamp/bootcamp.service";
import { ODeleteSchema } from "~~/server/services/common/dto";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await readValidatedBody(event, (query) =>
    z.parse(ODeleteSchema, query)
  );

  await deleteBootcamp(query);
  return HttpResponse();
});
