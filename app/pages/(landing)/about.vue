<script setup lang="ts">
  definePageMeta({
    layout: "landing",
  });
</script>

<template>
  <main>
    <!-- Section1 -->
    <div class="bg-[url('/tentangbg1.webp')] bg-cover bg-center py-12">
      <div
        class="container grid h-full items-center justify-center gap-12 md:grid-cols-2"
      >
        <NuxtImg src="/tentangimg1.webp" />
        <div class="flex flex-col gap-12">
          <h1 class="text-5xl font-bold">Tentang Kami</h1>
          <p class="text-justify">
            Platform website Keluarga Bahagia adalah sebuah situs web yang
            dirancang khusus untuk Pendidikan Pranikah dan memperkuat ikatan
            keluarga. Platform ini juga dirancang menjadi platform pencarian
            jodoh terdepan di Indonesia yang memfasilitasi terciptanya
            keluarga-keluarga berkualitas, berdaya saing, dan berwawasan luas,
            serta berkontribusi dalam mewujudkan Indonesia Emas 2045. Platform
            ini hadir sebagai solusi modern untuk mempertemukan individu yang
            memiliki visi dan nilai-nilai yang sejalan dalam membangun keluarga
            harmonis. Kami berkomitmen membantu anda memahami esensi pernikahan
            sebagai ibadah dan separuh agama yang sempurna, keuntungan
            menyiapkan diri menjadi calon pasangan yang baik adalah mendapatkan
            calon pasangan yang baik, karena keluarga adalah fondasi yang
            penting dalam kehidupan kita yang memberikan dukungan, cinta, dan
            makna dalam perjalanan kita melalui hidup.
          </p>
        </div>
      </div>
    </div>

    <!-- Section 2 -->
    <div
      class="flex items-center bg-[url('/tentangbg2.webp')] bg-cover bg-center py-12"
    >
      <div class="container flex flex-col gap-12 md:px-40">
        <h1 class="text-center text-5xl font-bold">Diajarkan Praktisi</h1>
        <div class="grid gap-12 md:grid-cols-3">
          <NuxtImg src="/foto1.webp" />
          <NuxtImg src="/foto2.webp" />
          <NuxtImg src="/foto3.webp" />
        </div>
      </div>
    </div>
  </main>
</template>
