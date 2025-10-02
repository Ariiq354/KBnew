import { z } from "zod/mini";
import { getDiskonByCode } from "~~/server/repository/diskon.repo";

const paramsSchema = z.string();

export default defineEventHandler(async (event) => {
  const kode = paramsSchema.parse(getRouterParam(event, "kode"));

  const result = await getDiskonByCode(kode);

  return HttpResponse(result);
});
