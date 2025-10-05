import { z } from "zod/mini";
import { getDiskonByKodeService } from "~~/server/modules/diskon";

const paramsSchema = z.string();

export default defineEventHandler(async (event) => {
  const kode = paramsSchema.parse(getRouterParam(event, "kode"));

  const result = await getDiskonByKodeService(kode);

  return HttpResponse(result);
});
