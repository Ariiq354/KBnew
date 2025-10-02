export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const result = await $fetch(`https://wilayah.id/api/districts/${id}.json`);
  const data = DaerahDto.parse(result);

  return HttpResponse(data.data, data.meta);
});
