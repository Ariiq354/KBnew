import { createAnggotaDetailService } from "~~/server/services/anggota.service";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const result = await readMultipartFormData(event);

  await createAnggotaDetailService(user, result);

  return HttpResponse();
});
