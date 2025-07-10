import { listUserBootcamp } from "~~/server/services/bootcamp/bootcamp.service";
import { OUserBootcampList } from "~~/server/services/bootcamp/dto/list-user-bootcamp.dto";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await getValidatedQuery(event, (query) =>
    OUserBootcampList.parse(query)
  );

  const data = await listUserBootcamp(query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
