import { OTaarufList } from "~~/server/services/taaruf/dto/list-taaruf.dto";
import { listUserTaaruf } from "~~/server/services/taaruf/taaruf.service";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);
  const query = await getValidatedQuery(event, (query) =>
    OTaarufList.parse(query)
  );

  const data = await listUserTaaruf(user.id, query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
