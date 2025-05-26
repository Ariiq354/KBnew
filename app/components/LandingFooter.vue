<template>
  <footer class="landing bg-eastern-blue-100 w-full font-sans">
    <div
      class="container flex flex-col items-center justify-between gap-4 p-12 md:flex-row"
    >
      <div class="flex flex-shrink-0 flex-col items-center gap-4">
        <NuxtImg src="/logo.webp" alt="logo" class="w-24" />
        <h1 class="text-xl font-bold">Keluarga Bahagia</h1>
      </div>
      <div class="flex flex-col gap-4 md:flex-row md:gap-24">
        <div class="flex flex-col gap-4">
          <h1 class="border-b-2 border-b-black text-xl font-bold">
            Hubungi Kami
          </h1>
          <ul class="flex flex-col gap-2">
            <li class="flex w-44 items-center gap-2">
              <UIcon name="i-heroicons-phone" size="{20}" /> +62 857 7204 8120
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-mdi-gmail" size="{20}" />
              keluargabahagianews@gmail.com
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-4">
          <h1 class="border-b-2 border-b-black text-xl font-bold">Follow Us</h1>
          <ul class="flex flex-col gap-2">
            <li>
              <NuxtLink
                href="https://www.instagram.com/keluargabahagia.id_?igsh=MWkzazAyazM0MmVyag=="
                target="_blank"
                class="flex items-center gap-2"
              >
                <UIcon name="i-mdi-instagram" size="{20}" /> Instagram
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                href="https://www.tiktok.com/@keluargabahagia_id?_t=8njgSqMVs5H&_r=1"
                class="flex items-center gap-2"
              >
                <UIcon name="i-ic-baseline-tiktok" size="{20}" /> Tiktok
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                href="https://www.youtube.com/@KeluargaBahagia_id"
                target="_blank"
                class="flex items-center gap-2"
              >
                <UIcon name="i-mdi-youtube" size="{20}" /> Youtube
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
