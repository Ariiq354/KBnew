import { updateDiskon } from "~~/server/repository/diskon.repo";
import { ODiskonCreate } from "./_dto";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const result = await readValidatedBody(event, (b) => ODiskonCreate.parse(b));
  const id = OParam.parse(getRouterParam(event, "id"));

  await updateDiskon(id, result);

  return HttpResponse();
});
