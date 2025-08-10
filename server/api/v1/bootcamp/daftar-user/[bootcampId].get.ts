import { z } from "zod/mini";
import { getUserByBootcampId } from "~~/server/services/bootcamp/bootcamp.service";
import { OBootcampList } from "~~/server/services/bootcamp/dto/list-bootcamp.dto";

const paramsSchema = z.coerce.number();

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await getValidatedQuery(event, (query) =>
    OBootcampList.parse(query),
  );
  const id = paramsSchema.parse(getRouterParam(event, "bootcampId"));

  const data = await getUserByBootcampId(id, query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
