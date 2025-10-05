import { deleteTransaksiService } from "~~/server/modules/transaksi";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await readValidatedBody(event, (query) => ODelete.parse(query));

  await deleteTransaksiService(query.id);
  return HttpResponse();
});
