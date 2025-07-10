import { createDiskon } from "~~/server/services/diskon/diskon.service";
import { ODiskonCreate } from "~~/server/services/diskon/dto/create-diskon.dto";

export default defineEventHandler(async (event) => {
  authGuard(event);
  const result = await readValidatedBody(event, (b) => ODiskonCreate.parse(b));

  await createDiskon(result);

  return HttpResponse();
});
