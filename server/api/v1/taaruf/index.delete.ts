import { deleteTaarufService } from "~~/server/services/taaruf.service";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const body = await readValidatedBody(event, (body) => ODelete.parse(body));

  await deleteTaarufService(body);
  return HttpResponse();
});
