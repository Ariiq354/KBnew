import { getAllDiskonService } from "~~/server/modules/diskon";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await getValidatedQuery(event, (query) =>
    OSearchPagination.parse(query),
  );

  const data = await getAllDiskonService(query);

  return HttpResponse(data.data, data.metadata);
});
