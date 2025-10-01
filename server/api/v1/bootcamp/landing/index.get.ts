import { listAllBootcampActive } from "~~/server/repository/bootcamp.repo";

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (query) =>
    OSearchPagination.parse(query)
  );

  const data = await listAllBootcampActive(query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
