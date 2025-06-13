import { getAnggotaById } from "~~/server/services/anggota/anggota.service";
import { OTaarufCreate } from "~~/server/services/taaruf/dto/create-taaruf.dto";
import { createTaaruf } from "~~/server/services/taaruf/taaruf.service";

export default defineEventHandler(async (event) => {
  const user = adminGuard(event);
  const result = await readValidatedBody(event, (b) => OTaarufCreate.parse(b));

  const dituju = await getAnggotaById(result.idDituju);
  if (!user?.isAvailable || !dituju.isAvailable) {
    throw createError({
      statusCode: 400,
      message: "Anggota sudah tidak available",
    });
  }

  await createTaaruf(user.id, result);

  return HttpResponse();
});
