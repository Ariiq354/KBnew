import { deleteDiskonService } from "~~/server/modules/diskon";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await readValidatedBody(event, (query) => ODelete.parse(query));

  await deleteDiskonService(query);

  return HttpResponse();
});
