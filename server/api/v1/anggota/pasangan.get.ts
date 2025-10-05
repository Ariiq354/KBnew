import { getAnggotaPasanganService } from "~~/server/modules/anggota";
import { OAnggotaPasangan } from "~~/server/modules/anggota/anggota.dto";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);
  const query = await getValidatedQuery(event, (query) =>
    OAnggotaPasangan.parse(query),
  );

  const data = await getAnggotaPasanganService(user.id, query);

  return HttpResponse(data.data, data.metadata);
});
