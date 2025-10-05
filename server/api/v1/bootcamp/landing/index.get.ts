import { getAllBootcampActiveService } from "~~/server/modules/bootcamp";

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (query) =>
    OSearchPagination.parse(query),
  );

  const data = await getAllBootcampActiveService(query);

  return HttpResponse(data.data, data.metadata);
});
