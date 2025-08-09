import { z } from "zod/mini";
import { OTransaksiCreate } from "~~/server/services/transaksi/dto/create-transaksi.dto";
import { updateTransaksi } from "~~/server/services/transaksi/transaksi.service";

const paramsSchema = z.coerce.number();

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const result = await readValidatedBody(event, (b) =>
    OTransaksiCreate.parse(b),
  );
  const id = paramsSchema.parse(getRouterParam(event, "id"));

  await updateTransaksi(id, { status: result.status });

  return HttpResponse();
});
