import { getAllTransaksiUserService } from "~~/server/modules/transaksi";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const query = await getValidatedQuery(event, (query) =>
    OPagination.parse(query),
  );

  const data = await getAllTransaksiUserService(user.id, query);

  return HttpResponse(data.data, data.metadata);
});
