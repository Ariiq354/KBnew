import { createBootcampService } from "~~/server/services/bootcamp.service";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const result = await readMultipartFormData(event);

  await createBootcampService(result);

  return HttpResponse();
});
