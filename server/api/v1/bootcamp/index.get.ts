import { getAllBootcampService } from "~~/server/modules/bootcamp";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await getValidatedQuery(event, (query) =>
    OSearchPagination.parse(query),
  );

  const data = await getAllBootcampService(query);

  return HttpResponse(data.data, data.metadata);
});
