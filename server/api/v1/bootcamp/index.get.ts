import { listAllBootcamp } from "~~/server/services/bootcamp/bootcamp.service";
import { OBootcampList } from "~~/server/services/bootcamp/dto/list-bootcamp.dto";

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (query) =>
    OBootcampList.parse(query),
  );

  const data = await listAllBootcamp(query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
