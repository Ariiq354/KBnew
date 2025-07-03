<script setup lang="ts">
  import { formatRupiah } from "~/utils";

  definePageMeta({
    layout: "landing",
  });
  const route = useRoute();
  const id = Number(route.params.id);

  const { data } = await useFetch(`${APIBASE}/bootcamp/${id}`);

  onMounted(() => {
    if (!data.value?.data) {
      throw createError({
        statusCode: 404,
      });
    }
  });

  const item = computed(() => data.value!.data!);
</script>

<template>
  <div
    class="container my-8 grid h-full items-center justify-center gap-12 md:grid-cols-2"
  >
    <NuxtImg :src="item.foto" alt="produk" class="max-h-[640px] rounded-md" />
    <div class="flex h-full flex-col gap-6">
      <div>
        <h1 class="text-center text-5xl font-bold md:text-6xl">
          {{ item.judul }}
        </h1>
        <h2 class="mt-4 text-3xl font-semibold text-amber-500">
          {{ formatRupiah(Number(item.harga)) }}
        </h2>
      </div>
      <div>
        <h2 class="mt-2 text-2xl font-semibold">Deskripsi</h2>
        <div class="ml-2 flex list-disc flex-col gap-4 px-4 text-xl">
          {{ item.deskripsi }}
        </div>
      </div>
      <div>
        <h2 class="mt-2 text-2xl font-semibold">Waktu & Tempat</h2>
        <ul class="ml-2 flex list-disc flex-col gap-4 px-4 text-xl">
          <li>{{ item.tempat }}</li>
          <li>{{ item.waktu }}</li>
        </ul>
      </div>
      <div>
        <h2 class="mt-2 text-2xl font-semibold">Pemateri</h2>
        <ul class="ml-2 flex list-disc flex-col gap-4 px-4 text-xl">
          <li>- [ Rino Amri, SE, M.Pd, chc] Konsultan Jelajah Diri</li>
          <li>- [ Andri setiawan ] Guru Besar ponpes Dahlan ikhsan</li>
        </ul>
      </div>
    </div>
  </div>
</template>
