import { deleteTaarufService } from "~~/server/modules/taaruf";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const body = await readValidatedBody(event, (body) => ODelete.parse(body));

  await deleteTaarufService(body);
  return HttpResponse();
});
