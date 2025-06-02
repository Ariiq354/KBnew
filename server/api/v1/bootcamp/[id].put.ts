import * as v from "valibot";
import { OBootcampCreate } from "~~/server/services/bootcamp/dto/create-bootcamp.dto";
import { updateBootcamp } from "~~/server/services/bootcamp/bootcamp.service";

const paramsSchema = v.pipe(v.string(), v.transform(Number));

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const body = await readValidatedBody(event, (body) =>
    v.parse(OBootcampCreate, body)
  );

  const id = v.parse(paramsSchema, getRouterParam(event, "id"));

  await updateBootcamp(id, body);

  return HttpResponse();
});
