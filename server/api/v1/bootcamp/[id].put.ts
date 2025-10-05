import { updateBootcampService } from "~~/server/modules/bootcamp";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const result = await readMultipartFormData(event);
  const id = OParam.parse(getRouterParam(event, "id"));

  await updateBootcampService(id, result);

  return HttpResponse();
});
