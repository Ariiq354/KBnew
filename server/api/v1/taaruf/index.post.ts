import { createTaarufService } from "~~/server/modules/taaruf";
import { OTaarufCreate } from "~~/server/modules/taaruf/taaruf.dto";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);
  const body = await readValidatedBody(event, (b) => OTaarufCreate.parse(b));

  await createTaarufService(user, body);

  return HttpResponse();
});
