import { createAnggotaDetailService } from "~~/server/modules/anggota";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const result = await readMultipartFormData(event);

  await createAnggotaDetailService(user, result);

  return HttpResponse();
});
