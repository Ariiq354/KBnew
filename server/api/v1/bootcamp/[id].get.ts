import { z } from "zod/mini";
import { getBootcampById } from "~~/server/services/bootcamp/bootcamp.service";

const paramsSchema = z.coerce.number();

export default defineEventHandler(async (event) => {
  const id = paramsSchema.parse(getRouterParam(event, "id"));

  const data = await getBootcampById(id);

  return HttpResponse(data);
});
