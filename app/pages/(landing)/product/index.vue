<script setup lang="ts">
definePageMeta({
  layout: "landing",
});

const carouselItem = [
  {
    image: "/1.webp",
    title: "lorem ipsum",
    harga: "200000",
    waktu: "30 Juni 2024",
    tempat: "bogor",
  },
  {
    image: "/2.webp",
    title: "lorem ipsum",
    harga: "200000",
    waktu: "30 Juni 2024",
    tempat: "bogor",
  },
  {
    image: "/3.webp",
    title: "lorem ipsum",
    harga: "200000",
    waktu: "30 Juni 2024",
    tempat: "bogor",
  },
  {
    image: "/4.webp",
    title: "lorem ipsum",
    harga: "200000",
    waktu: "30 Juni 2024",
    tempat: "bogor",
  },
];
</script>

<template>
  <div class="bg-eastern-blue-200 bg-cover px-12 py-12">
    <div class="px-8 text-4xl font-semibold">Daftar Bootcamp</div>
  </div>
  <main class="mb-8 px-12">
    <div class="mt-8 mb-4 px-8">Menampilkan 1-4 dari 4 hasil</div>
    <!-- UCarousel wrapper -->
    <UCarousel class="px-4" :items="carouselItem" :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/4 px-2' }">
      <template #default="{ item, index }">
        <UCard :key="index" class="flex h-full flex-col rounded-none p-0 text-black">
          <div class="flex h-full flex-col justify-between gap-4">
            <NuxtLink :to="`/product/${index}`" class="flex flex-col gap-4 transition hover:opacity-80">
              <NuxtImg :src="item.image" alt="produk" class="max-h-128" />
              <h1 class="text-lg font-bold">
                Rahasia Keluarga Bahagia: Keluarga, Anak
              </h1>
              <h3 class="font-semibold">{{ formatRupiah(item.harga) }}</h3>
            </NuxtLink>

            <UButton class="bg-primary w-max px-4 py-2 text-black">
              Tambahkan ke keranjang
            </UButton>
          </div>
        </UCard>
      </template>
    </UCarousel>
  </main>
</template>
