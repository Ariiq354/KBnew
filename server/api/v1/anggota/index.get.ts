import { listAllAnggota } from "~~/server/repository/anggota.repo";
import { OSearchPagination } from "~~/server/utils/dto";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await getValidatedQuery(event, (query) =>
    OSearchPagination.parse(query)
  );

  const data = await listAllAnggota(query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
