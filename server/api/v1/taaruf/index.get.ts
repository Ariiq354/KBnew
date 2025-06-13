import { listAllTaaruf } from "~~/server/services/taaruf/taaruf.service";
import { OTaarufList } from "~~/server/services/taaruf/dto/list-taaruf.dto";

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (query) =>
    OTaarufList.parse(query)
  );

  const data = await listAllTaaruf(query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
