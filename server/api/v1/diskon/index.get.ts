import { listAllDiskon } from "~~/server/services/diskon/diskon.service";
import { ODiskonList } from "~~/server/services/diskon/dto/list-diskon.dto";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await getValidatedQuery(event, (query) =>
    ODiskonList.parse(query)
  );

  const data = await listAllDiskon(query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
