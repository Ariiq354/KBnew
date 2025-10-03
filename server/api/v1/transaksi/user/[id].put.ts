import { updateTransaksiStatus } from "~~/server/repository/transaksi.repo";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);
  const id = OParam.parse(getRouterParam(event, "id"));

  console.log("check", id);

  await updateTransaksiStatus(id, "Sudah Dibayar", user.id);

  return HttpResponse();
});
