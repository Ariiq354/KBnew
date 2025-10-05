import { getUserTaarufService } from "~~/server/modules/taaruf";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);
  const query = await getValidatedQuery(event, (query) =>
    OSearchPagination.parse(query),
  );

  const data = await getUserTaarufService(user.id, query);

  return HttpResponse(data.data, data.metadata);
});
