import { z } from "zod/v4-mini";
import { listAllAnggota } from "~~/server/services/anggota/anggota.service";
import { OAnggotaList } from "~~/server/services/anggota/dto/list-anggota.dto";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await getValidatedQuery(event, (query) =>
    z.parse(OAnggotaList, query)
  );

  const data = await listAllAnggota(query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
