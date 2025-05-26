<script setup lang="ts">
  definePageMeta({
    layout: "landing",
  });
</script>

<template>
  <Title>Keluarga Bahagia</Title>
  <main class="font-sans">
    <!-- Section 1 -->
    <div class="bg-[url('/landingbg1.webp')] bg-cover bg-bottom">
      <div
        class="container grid h-full items-center justify-center md:grid-cols-2"
      >
        <div
          class="flex h-full w-full flex-col justify-center gap-8 py-12 md:px-16"
        >
          <h1
            class="text-center text-4xl font-bold text-black md:text-left md:text-6xl"
          >
            Temukan Rahasia
            <span class="text-eastern-blue-500">Keluarga </span>Bahagia
          </h1>
          <NuxtImg src="/landingimg1.webp" class="block w-full md:hidden" />
          <p
            class="text-eastern-blue-700 text-center text-xl font-semibold md:mt-0 md:text-left"
          >
            اْلأَرْوَاحُ جُنُوْدٌ مُجَنَّدَةٌ فَمَا تَعَارَفَ مِنْهَا اىٔتَلَفَ
            وَمَا تَنَاكَرَ مِنْهَا اخْتَلَفَ # رواه البخاري
          </p>
          <div class="flex justify-center gap-4 md:justify-normal">
            <UButton class="shadow-lg" href="/about">Learn More</UButton>
            <UButton variant="soft" class="shadow-lg" href="/login">
              Sign Up
            </UButton>
          </div>
        </div>
        <NuxtImg src="/landingimg1.webp" class="hidden w-full md:block" />
      </div>
    </div>

    <!-- Section 2 -->
    <div class="w-full bg-white pb-12">
      <div
        class="container flex h-full flex-col items-center justify-center gap-12 py-12"
      >
        <h1 class="text-center text-4xl font-bold md:mb-12 md:text-left">
          Kami Menyediakan Beberapa Layanan
        </h1>
        <div class="flex flex-col gap-12 px-4 md:flex-row">
          <NuxtLink to="/product" class="block">
            <div
              class="flex h-[25rem] max-w-[25rem] flex-col justify-end rounded-2xl bg-[url('/square1.webp')] bg-[length:42rem] bg-[center_calc(50%+3rem)] p-4 shadow-xl md:p-12"
            >
              <h1 class="mb-2 text-center text-2xl font-bold">Bootcamp</h1>
              <p class="text-center">
                Program ini bertujuan untuk memberikan bekal pengetahuan &
                keterampilan yang di perlukan dalam membangun kehidupan rumah
                tangga yang bahagia & harmonis.
              </p>
            </div>
          </NuxtLink>
          <div
            class="flex h-[25rem] max-w-[25rem] flex-col justify-end rounded-2xl bg-[url('/square2.webp')] bg-[length:42rem] bg-[center_calc(50%+3rem)] p-4 shadow-xl md:p-12"
          >
            <h1 class="mb-2 text-center text-2xl font-bold">Jodoh</h1>
            <p class="text-center">
              Banyak yang percaya bahwa jodoh adalah cerminan dari diri kita
              sendiri, jodoh adalah sebuah perjalanan yan penuh dengan kejutan &
              pembelajaran.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 3 -->
    <div class="bg-[url('/landingbg2.webp')] bg-cover py-12">
      <div
        class="container grid h-full items-center justify-center md:grid-cols-2"
      >
        <NuxtImg src="/landingimg2.webp" class="w-full" />
        <div class="flex h-full flex-col justify-center gap-12">
          <h1 class="text-center text-5xl font-bold md:text-left md:text-6xl">
            Seminar Pranikah
          </h1>
          <ul class="ml-2 flex list-disc flex-col gap-4 p-4 text-xl">
            <li>
              Membantu Anda memahami esensi pernikahan sebagai ibadah dan
              separuh agama yang sempurna
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
      </div>
    </div>
    <div
      class="bg-eastern-blue-200 text-eastern-blue-700 flex w-full flex-col py-12 md:px-12"
    >
      <p class="container text-center text-2xl leading-loose md:w-2/3">
        "اَلْخَبِيْثٰتُ لِلْخَبِيْثِيْنَ وَالْخَبِيْثُوْنَ لِلْخَبِيْثٰتِۚ
        وَالطَّيِّبٰتُ لِلطَّيِّبِيْنَ وَالطَّيِّبُوْنَ لِلطَّيِّبٰتِۚ
        اُولٰۤىِٕكَ مُبَرَّءُوْنَ مِمَّا يَقُوْلُوْنَۗ لَهُمْ مَّغْفِرَةٌ
        وَّرِزْقٌ كَرِيْمٌ ࣖ"
      </p>
      <p class="container text-center text-2xl leading-loose md:w-2/3">
        "An Nur: 26"
      </p>
    </div>
  </main>
</template>
