import { getAnggotaByIdService } from "~~/server/modules/anggota";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const data = await getAnggotaByIdService(user.id);

  return HttpResponse(data);
});
