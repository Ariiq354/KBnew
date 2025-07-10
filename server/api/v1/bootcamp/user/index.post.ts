import { createUserBootcamp } from "~~/server/services/bootcamp/bootcamp.service";
import { OUserBootcampCreate } from "~~/server/services/bootcamp/dto/create-user-bootcamp.dto";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);
  const result = await readValidatedBody(event, (b) =>
    OUserBootcampCreate.parse(b)
  );

  const newPrice = await getUniquePrice(result.harga);

  await createUserBootcamp(user.id, {
    diskon: result.diskon,
    harga: newPrice,
    idBootcamp: result.idBootcamp,
  });

  return HttpResponse({
    price: newPrice,
  });
});
