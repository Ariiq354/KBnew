import { z } from "zod/v4-mini";
import { ODiskonCreate } from "~~/server/services/diskon/dto/create-diskon.dto";
import { updateDiskon } from "~~/server/services/diskon/diskon.service";

const paramsSchema = z.coerce.number();

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const result = await readValidatedBody(event, (b) =>
    z.partial(ODiskonCreate).parse(b)
  );
  const id = paramsSchema.parse(getRouterParam(event, "id"));

  await updateDiskon(id, result);

  return HttpResponse();
});
