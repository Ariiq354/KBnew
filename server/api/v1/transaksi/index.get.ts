import { getAllTransaksiService } from "~~/server/modules/transaksi";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await getValidatedQuery(event, (query) =>
    OSearchPagination.parse(query),
  );

  const data = await getAllTransaksiService(query);

  return HttpResponse(data.data, data.metadata);
});
