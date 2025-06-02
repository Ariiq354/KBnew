import * as v from "valibot";
import { deleteBootcamp } from "~~/server/services/bootcamp/bootcamp.service";
import { ODeleteSchema } from "~~/server/services/common/dto";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await readValidatedBody(event, (query) =>
    v.parse(ODeleteSchema, query)
  );

  await deleteBootcamp(query);
  return HttpResponse();
});
