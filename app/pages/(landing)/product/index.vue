<script setup lang="ts">
  import { formatRupiah } from "~/utils";

  definePageMeta({
    layout: "landing",
  });

  const { data } = await useFetch(`${APIBASE}/bootcamp`, {
    query: {
      limit: 100,
    },
  });
</script>

<template>
  <div class="bg-eastern-blue-200 bg-cover px-12 py-12">
    <div class="px-8 text-4xl font-semibold">Daftar Bootcamp</div>
  </div>
  <main class="mb-8 px-12 container">
    <UCarousel
      v-slot="{ item }"
      arrows
      class="mt-8"
      :items="data?.data"
      :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3 px-2' }"
    >
      <UCard class="flex h-full flex-col rounded-none p-0 text-black">
        <div class="flex h-full flex-col justify-between gap-4">
          <div class="flex flex-col gap-4 transition hover:opacity-80">
            <NuxtImg
              :src="item.foto"
              alt="produk"
              class="max-h-128 aspect-108/135"
            />
            <h1 class="text-lg font-bold">
              {{ item.judul }}
            </h1>
            <h3 class="font-semibold">{{ formatRupiah(item.harga) }}</h3>
          </div>

          <UButton
            :to="`/product/${item.id}`"
            class="bg-primary w-max px-4 py-2"
          >
            Lihat Detail
          </UButton>
        </div>
      </UCard>
    </UCarousel>
  </main>
</template>
