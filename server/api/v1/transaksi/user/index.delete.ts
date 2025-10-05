import { deleteTransaksiUserService } from "~~/server/modules/transaksi";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);
  const query = await readValidatedBody(event, (query) => ODelete.parse(query));

  await deleteTransaksiUserService(user.id, query.id);
  return HttpResponse();
});
