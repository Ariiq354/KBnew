import { deleteTransaksiUser } from "~~/server/repository/transaksi.repo";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);
  const query = await readValidatedBody(event, (query) => ODelete.parse(query));

  await deleteTransaksiUser(user.id, query.id);
  return HttpResponse();
});
