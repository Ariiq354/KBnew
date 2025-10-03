import { addUserBootcampService } from "~~/server/services/bootcamp.service";
import { OUserBootcampCreate } from "../_dto";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);
  const body = await readValidatedBody(event, (b) =>
    OUserBootcampCreate.parse(b),
  );

  const result = await addUserBootcampService(user, body);

  return HttpResponse(result);
});
