import { createDiskonService } from "~~/server/modules/diskon";
import { ODiskonCreate } from "~~/server/modules/diskon/diskon.dto";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const result = await readValidatedBody(event, (b) => ODiskonCreate.parse(b));

  await createDiskonService(result);

  return HttpResponse();
});
