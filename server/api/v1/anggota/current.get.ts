import { getAnggotaById } from "~~/server/services/anggota/anggota.service";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const data = await getAnggotaById(user.id);

  return HttpResponse(data);
});
