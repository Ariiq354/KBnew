import { z } from "zod/v4-mini";
import { OBootcampList } from "~~/server/services/bootcamp/dto/list-bootcamp.dto";
import { listAllBootcamp } from "~~/server/services/bootcamp/bootcamp.service";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await getValidatedQuery(event, (query) =>
    z.parse(OBootcampList, query)
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
