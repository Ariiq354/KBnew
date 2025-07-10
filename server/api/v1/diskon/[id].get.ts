import { z } from "zod/mini";
import { getDiskonByCode } from "~~/server/services/diskon/diskon.service";

const paramsSchema = z.string();

export default defineEventHandler(async (event) => {
  const kode = paramsSchema.parse(getRouterParam(event, "id"));

  const result = await getDiskonByCode(kode);

  return HttpResponse(result);
});
