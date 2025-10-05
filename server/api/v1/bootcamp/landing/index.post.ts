import { addUserBootcampService } from "~~/server/modules/bootcamp";
import { OUserBootcampCreate } from "~~/server/modules/bootcamp/bootcamp.dto";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);
  const body = await readValidatedBody(event, (b) =>
    OUserBootcampCreate.parse(b),
  );

  const result = await addUserBootcampService(user, body);

  return HttpResponse(result);
});
