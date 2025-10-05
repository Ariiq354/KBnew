import { getBootcampByIdService } from "~~/server/modules/bootcamp";

export default defineEventHandler(async (event) => {
  const id = OParam.parse(getRouterParam(event, "id"));

  const data = await getBootcampByIdService(id);

  return HttpResponse(data);
});
