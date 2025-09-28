import { getAnggotaById } from "~~/server/repo/anggota.repo";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const data = await getAnggotaById(user.id);

  return HttpResponse(data);
});
