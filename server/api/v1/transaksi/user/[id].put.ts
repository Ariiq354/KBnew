import { updateTransaksiStatusService } from "~~/server/modules/transaksi";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);
  const id = OParam.parse(getRouterParam(event, "id"));

  await updateTransaksiStatusService(id, "Sudah Dibayar", user.id);

  return HttpResponse();
});
