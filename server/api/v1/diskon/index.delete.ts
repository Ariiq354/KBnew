import { ODeleteSchema } from "~~/server/services/common/dto";
import { deleteDiskon } from "~~/server/services/diskon/diskon.service";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await readValidatedBody(event, (query) =>
    ODeleteSchema.parse(query)
  );

  await deleteDiskon(query);
  return HttpResponse();
});
