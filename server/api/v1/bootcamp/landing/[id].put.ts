import { z } from "zod/mini";
import { updateUserBootcamp } from "~~/server/services/bootcamp/bootcamp.service";

const paramsSchema = z.coerce.number();

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const result = await readValidatedBody(event, (b) =>
    z
      .object({
        status: z.boolean(),
      })
      .parse(b)
  );
  const id = paramsSchema.parse(getRouterParam(event, "id"));

  await updateUserBootcamp(id, result);

  return HttpResponse();
});
