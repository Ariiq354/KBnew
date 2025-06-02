import * as v from "valibot";
import { OBootcampCreate } from "~~/server/services/bootcamp/dto/create-bootcamp.dto";
import { createBootcamp } from "~~/server/services/bootcamp/bootcamp.service";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const body = await readValidatedBody(event, (body) =>
    v.parse(OBootcampCreate, body)
  );

  await createBootcamp(body);

  return HttpResponse();
});
