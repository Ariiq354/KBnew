import { z } from "zod/v4-mini";
import { OTaarufUpdate } from "~~/server/services/taaruf/dto/create-taaruf.dto";
import { updateTaaruf } from "~~/server/services/taaruf/taaruf.service";

const paramsSchema = z.coerce.number();

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const result = await readValidatedBody(event, (b) => OTaarufUpdate.parse(b));
  const id = paramsSchema.parse(getRouterParam(event, "id"));

  await updateTaaruf(id, result);

  return HttpResponse();
});
