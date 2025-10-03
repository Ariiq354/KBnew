import { deleteTransaksi } from "~~/server/repository/transaksi.repo";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await readValidatedBody(event, (query) => ODelete.parse(query));

  await deleteTransaksi(query.id);
  return HttpResponse();
});
