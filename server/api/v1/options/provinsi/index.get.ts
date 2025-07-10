export default defineEventHandler(async () => {
  const result = await $fetch("https://wilayah.id/api/provinces.json");

  const data = DaerahDto.parse(result);

  return HttpResponse(data.data, data.meta);
});
