import { getListMemberService } from "~~/server/services/anggota.service";
import { OAnggotaPasangan } from "./_dto";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);
  const query = await getValidatedQuery(event, (query) =>
    OAnggotaPasangan.parse(query),
  );

  const data = await getListMemberService(user, query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
