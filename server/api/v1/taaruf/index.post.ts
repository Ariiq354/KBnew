import { createTaarufService } from "~~/server/services/taaruf.service";
import { OTaarufCreate } from "./_dto";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);
  const body = await readValidatedBody(event, (b) => OTaarufCreate.parse(b));

  await createTaarufService(user, body);

  return HttpResponse();
});
