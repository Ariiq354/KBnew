<script setup lang="ts">
  definePageMeta({
    layout: "landing",
  });
  const route = useRoute();
  const id = Number(route.params.id);

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
  <div
    class="container my-8 grid h-full items-center justify-center gap-12 md:grid-cols-2"
  >
    <NuxtImg
      :src="carouselItem[id]!.image"
      alt="produk"
      class="max-h-[640px] rounded-md"
    />
    <div class="flex h-full flex-col gap-6">
      <div>
        <h1 class="text-center text-5xl font-bold md:text-6xl">
          Seminar Pranikah
        </h1>
        <h2 class="mt-4 text-3xl font-semibold text-amber-500">
          {{ formatRupiah(Number(carouselItem[id]!.harga)) }}
        </h2>
      </div>
      <div>
        <h2 class="mt-2 text-2xl font-semibold">Deskripsi</h2>
        <ul class="ml-2 flex list-disc flex-col gap-4 px-4 text-xl">
          <li>
            Membantu Anda memahami esensi pernikahan sebagai ibadah dan separuh
            agama yang sempurna
          </li>
          <li>
            Mempersiapkan Anda untuk membangun rumah tangga yang kokoh dan
            bahagia
          </li>
          <li>
            Memberikan bekal ilmu dan keterampilan praktis untuk menghadapi
            berbagai tantangan dalam pernikahan
          </li>
          <li>Memperkuat komitmen dan komunikasi dengan pasangan</li>
        </ul>
      </div>
      <div>
        <h2 class="mt-2 text-2xl font-semibold">Waktu & Tempat</h2>
        <ul class="ml-2 flex list-disc flex-col gap-4 px-4 text-xl">
          <li>Kecamatan Kebun Kacang, Kota Bogor</li>
          <li>28 Oktober 2024: 22.00 - 02.00</li>
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
