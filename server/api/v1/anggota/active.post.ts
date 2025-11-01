import { OToggleActive } from "~~/server/modules/anggota/anggota.dto";
import { updateUserActive } from "~~/server/modules/anggota/anggota.repo";

export default defineEventHandler(async (event) => {
  adminGuard(event);

  const result = await readValidatedBody(event, (b) => OToggleActive.parse(b));

  await updateUserActive(result.id, result.isActive);

  return HttpResponse();
});
