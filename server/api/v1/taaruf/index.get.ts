import { getAllTaarufService } from "~~/server/modules/taaruf";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await getValidatedQuery(event, (query) =>
    OSearchPagination.parse(query),
  );

  const data = await getAllTaarufService(query);

  return HttpResponse(data.data, data.metadata);
});
