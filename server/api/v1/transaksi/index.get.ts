import { listAllTransaksi } from "~~/server/services/transaksi/transaksi.service";
import { OTransaksiList } from "~~/server/services/transaksi/dto/list-transaksi.dto";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await getValidatedQuery(event, (query) =>
    OTransaksiList.parse(query),
  );

  const data = await listAllTransaksi(query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
