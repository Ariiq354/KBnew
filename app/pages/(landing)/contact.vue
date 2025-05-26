<script setup lang="ts">
  definePageMeta({
    layout: "landing",
  });
</script>

<template>
  <main>
    <div class="bg-[url('/kontakback.jpg')] bg-cover bg-center">
      <div
        class="flex min-h-[90vh] w-full flex-col items-center gap-8 px-12 py-8 md:flex-row"
      >
        <!-- Text Section -->
        <div
          class="flex w-full flex-col gap-8 text-center md:w-1/2 md:text-left"
        >
          <div class="text-4xl font-bold">Kontak Kami</div>
          <div class="text-justify font-semibold">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              consectetur odio vel nibh maximus, et aliquet arcu cursus. Cras
              euismod erat dolor, at venenatis orci congue sed. In at varius
              leo. Etiam pharetra metus laoreet, lobortis turpis at, scelerisque
              sem. Mauris porttitor mattis ante, ut porta nisi tempor eu. Nulla
              a ex venenatis, egestas augue quis, facilisis ipsum. Nulla
              rhoncus, lectus eget porttitor sodales, orci massa sagittis urna,
              non sodales nunc tellus ac arcu. Sed tempor iaculis est, non
              aliquam velit fringilla at. Aliquam eu finibus metus. Donec turpis
              ligula, egestas sit amet posuere eget, dignissim vitae metus.
            </p>
          </div>
          <div>
            <UButton
              href="https://wa.me/6285772048120"
              target="_blank"
              class="mt-4 rounded-md bg-white px-4 py-2 text-black shadow-sm hover:bg-gray-100"
            >
              <div class="flex items-center gap-4">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8"
                >
                  <title>WhatsApp</title>
                  <path
                    fill="#25D366"
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                  />
                </svg>
                <span class="font-2xl font-bold">WhatsApp Kami</span>
              </div>
            </UButton>
          </div>
        </div>

        <div class="flex w-full justify-center md:w-1/2">
          <NuxtImg src="/kontakimage2.webp" class="w-full object-contain" />
        </div>
      </div>
    </div>
    <div class="px-4">
      <div
        class="bg-eastern-blue-100 mx container my-12 flex max-w-[1000px] flex-col gap-4 rounded-lg p-4 shadow-xl md:p-12"
      >
        <h1 class="text-center text-4xl font-semibold">Email</h1>
        <p class="text-center text-lg">
          Anda bisa menghubungi kami melalui layanan email melalui kolom dibawah
          ini.
        </p>
        <div class="flex gap-4">
          <UInput placeholder="Nama" />
          <UInput placeholder="Alamat Email" />
        </div>
        <UTextarea placeholder="Pesan" :rows="10" />
        <div class="flex justify-end">
          <UButton>Kirim</UButton>
        </div>
      </div>
    </div>
  </main>
</template>
