import { getAllAnggotaService } from "~~/server/modules/anggota";
import { OSearchPagination } from "~~/server/utils/dto";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await getValidatedQuery(event, (query) =>
    OSearchPagination.parse(query),
  );

  const data = await getAllAnggotaService(query);

  return HttpResponse(data.data, data.metadata);
});
