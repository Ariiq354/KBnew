import { getUniquePrice } from "~~/server/utils/generate";
import { OUserBootcampCreate } from "../_dto";
import { createUserBootcamp } from "~~/server/repository/bootcamp.repo";

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
