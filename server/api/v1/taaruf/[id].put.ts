import { updateTaarufService } from "~~/server/modules/taaruf";
import { OTaarufUpdate } from "~~/server/modules/taaruf/taaruf.dto";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const result = await readValidatedBody(event, (b) => OTaarufUpdate.parse(b));
  const id = OParam.parse(getRouterParam(event, "id"));

  await updateTaarufService(id, result);

  return HttpResponse();
});
