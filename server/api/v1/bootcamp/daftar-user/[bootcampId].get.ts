import { getUserByBootcampIdService } from "~~/server/modules/bootcamp";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await getValidatedQuery(event, (query) =>
    OSearchPagination.parse(query),
  );
  const id = OParam.parse(getRouterParam(event, "bootcampId"));

  const data = await getUserByBootcampIdService(id, query);

  return HttpResponse(data.data, data.metadata);
});
