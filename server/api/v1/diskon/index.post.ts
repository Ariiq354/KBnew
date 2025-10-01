import { createDiskon } from "~~/server/repository/diskon.repo";
import { ODiskonCreate } from "./_dto";

export default defineEventHandler(async (event) => {
  authGuard(event);
  const result = await readValidatedBody(event, (b) => ODiskonCreate.parse(b));

  await createDiskon(result);

  return HttpResponse();
});
