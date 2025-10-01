import { updateTaarufService } from "~~/server/services/taaruf.service";
import { OTaarufUpdate } from "./_dto";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const result = await readValidatedBody(event, (b) => OTaarufUpdate.parse(b));
  const id = OParam.parse(getRouterParam(event, "id"));

  await updateTaarufService(id, result);

  return HttpResponse();
});
