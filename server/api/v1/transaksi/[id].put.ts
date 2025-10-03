import { updateTransaksiStatusService } from "~~/server/services/transaksi.service";
import { OTransaksiUpdate } from "./_dto";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const result = await readValidatedBody(event, (b) =>
    OTransaksiUpdate.parse(b),
  );
  const id = OParam.parse(getRouterParam(event, "id"));

  await updateTransaksiStatusService(id, result.status);

  return HttpResponse();
});
