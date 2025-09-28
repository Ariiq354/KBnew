import { listAllTransaksiUser } from "~~/server/repo/transaksi.repo";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const query = await getValidatedQuery(event, (query) =>
    OPagination.parse(query)
  );

  const data = await listAllTransaksiUser(user.id, query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
