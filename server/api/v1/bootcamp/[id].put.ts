import { updateBootcampService } from "~~/server/services/bootcamp.service";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const result = await readMultipartFormData(event);
  const id = OParam.parse(getRouterParam(event, "id"));

  await updateBootcampService(id, result);

  return HttpResponse();
});
