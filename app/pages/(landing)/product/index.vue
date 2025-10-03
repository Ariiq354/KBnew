<script setup lang="ts">
  import { APIBASE, formatRupiah } from "~/utils";

  definePageMeta({
    layout: "landing",
  });

  const { data } = await useFetch(`${APIBASE}/bootcamp/landing`, {
    query: {
      limit: 12,
    },
  });
</script>

<template>
  <div class="bg-eastern-blue-200 bg-cover p-6 md:p-12">
    <div class="px-8 text-4xl font-semibold">Daftar Bootcamp</div>
  </div>
  <main class="container mb-8 md:px-6">
    <UCarousel
      v-slot="{ item }"
      arrows
      class="mt-8"
      :items="data?.data"
      :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3 px-2' }"
    >
      <UCard
        class="border-muted my-2 flex flex-col rounded-2xl border p-0 text-black shadow-none"
      >
        <div class="flex h-full flex-col justify-between gap-4">
          <div class="flex flex-col transition hover:opacity-80">
            <NuxtImg
              :src="item.foto"
              alt="produk"
              class="mb-4 aspect-108/135 max-h-128 rounded-2xl bg-gray-400"
            />
            <h1 class="text-lg font-bold">
              {{ item.judul }}
            </h1>
            <h2 class="text-muted">{{ item.tempat }}</h2>
            <div class="flex flex-col justify-between sm:flex-row">
              <div class="mt-4 flex flex-col">
                <p class="text-muted">Harga:</p>
                <h3 class="font-semibold">{{ formatRupiah(item.harga) }}</h3>
              </div>
              <div class="mt-4 flex flex-col">
                <p class="text-muted">Tanggal:</p>
                <h3 class="font-semibold">{{ item.waktu }}</h3>
              </div>
            </div>
          </div>

          <UButton
            :to="`/product/${item.id}`"
            class="mt-4 flex w-full justify-center"
          >
            Lihat Detail
          </UButton>
        </div>
      </UCard>
    </UCarousel>
  </main>
</template>
