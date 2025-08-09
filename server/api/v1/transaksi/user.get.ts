import { OTransaksiList } from "~~/server/services/transaksi/dto/list-transaksi.dto";
import { listAllTransaksiUser } from "~~/server/services/transaksi/transaksi.service";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const query = await getValidatedQuery(event, (query) =>
    OTransaksiList.parse(query),
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
