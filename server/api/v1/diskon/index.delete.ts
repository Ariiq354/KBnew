import { deleteDiskon } from "~~/server/repository/diskon.repo";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await readValidatedBody(event, (query) => ODelete.parse(query));

  await deleteDiskon(query);
  return HttpResponse();
});
