import { ODeleteSchema } from "~~/server/services/common/dto";
import { deleteTaaruf } from "~~/server/services/taaruf/taaruf.service";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await readValidatedBody(event, (query) =>
    ODeleteSchema.parse(query)
  );

  await deleteTaaruf(query);
  return HttpResponse();
});
