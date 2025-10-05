import { deleteBootcampService } from "~~/server/modules/bootcamp";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await readValidatedBody(event, (query) => ODelete.parse(query));

  await deleteBootcampService(query);

  return HttpResponse();
});
