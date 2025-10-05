import { createBootcampService } from "~~/server/modules/bootcamp";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const result = await readMultipartFormData(event);

  await createBootcampService(result);

  return HttpResponse();
});
