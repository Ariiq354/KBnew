import { listAnggotaPasangan } from "~~/server/services/anggota/anggota.service";
import { OAnggotaPasangan } from "~~/server/services/anggota/dto/list-anggota.dto";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);
  const query = await getValidatedQuery(event, (query) =>
    OAnggotaPasangan.parse(query)
  );

  const data = await listAnggotaPasangan(user.id, query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
