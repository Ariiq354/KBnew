import { getBootcampById } from "~~/server/repository/bootcamp.repo";

export default defineEventHandler(async (event) => {
  const id = OParam.parse(getRouterParam(event, "id"));

  const data = await getBootcampById(id);

  return HttpResponse(data);
});
