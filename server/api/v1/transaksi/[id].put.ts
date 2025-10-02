import { updateTransaksi } from "~~/server/repository/transaksi.repo";
import { OTransaksiCreate } from "./_dto";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const result = await readValidatedBody(event, (b) =>
    OTransaksiCreate.parse(b),
  );
  const id = OParam.parse(getRouterParam(event, "id"));

  await updateTransaksi(id, { status: result.status });

  return HttpResponse();
});
