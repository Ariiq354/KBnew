import { z } from "zod/v4-mini";
import { OBootcampCreate } from "~~/server/services/bootcamp/dto/create-bootcamp.dto";
import { updateBootcamp } from "~~/server/services/bootcamp/bootcamp.service";

const paramsSchema = z.pipe(z.string(), z.transform(Number));

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const body = await readValidatedBody(event, (body) =>
    z.parse(OBootcampCreate, body)
  );

  const id = z.parse(paramsSchema, getRouterParam(event, "id"));

  await updateBootcamp(id, body);

  return HttpResponse();
});
