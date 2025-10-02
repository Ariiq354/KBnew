import { getUserByBootcampId } from "~~/server/repository/bootcamp.repo";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await getValidatedQuery(event, (query) =>
    OSearchPagination.parse(query),
  );
  const id = OParam.parse(getRouterParam(event, "bootcampId"));

  const data = await getUserByBootcampId(id, query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
