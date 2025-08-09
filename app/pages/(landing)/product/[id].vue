<script setup lang="ts">
  import { formatRupiah } from "~/utils";
  import DOMPurify from "dompurify";

  definePageMeta({
    layout: "landing",
  });
  const authStore = useAuthStore();

  const route = useRoute();
  const id = Number(route.params.id);

  const { data } = await useFetch(`${APIBASE}/bootcamp/${id}`);

  const ticketCode = ref("");
  const {
    data: diskon,
    status,
    refresh,
  } = await useFetch(() => `${APIBASE}/diskon/${ticketCode.value}`, {
    immediate: false,
    watch: false,
    onResponse(item) {
      if (!item.response._data.data) {
        useToastError("Diskon Tidak Ada", "Diskon tidak ditemukan");
      } else {
        ticketCount.value = 1;
        useToastSuccess("Diskon Ada", "Diskon berhasil ditambahkan");
      }
    },
  });

  onMounted(() => {
    if (!data.value?.data) {
      throw createError({
        statusCode: 404,
      });
    }
  });

  const ticketCount = ref(1);

  const item = computed(() => data.value!.data!);
  const sanitizedDeskripsi = ref("");
  onMounted(() => {
    sanitizedDeskripsi.value = DOMPurify.sanitize(item.value.deskripsi);
  });

  const modalOpen = ref(false);
  const price = ref(0);
  const isLoading = ref(false);
  async function onSubmit() {
    isLoading.value = true;
    try {
      const result = await $fetch(`${APIBASE}/bootcamp/landing`, {
        method: "POST",
        body: {
          idBootcamp: id,
          harga: item.value.harga * ticketCount.value,
          diskon: ticketCode.value,
        },
      });

      price.value = result.data!.price;
      modalOpen.value = true;
    } catch (err: any) {
      useToastError("Submit Failed", err);
    } finally {
      isLoading.value = false;
    }
  }
</script>

<template>
  <LazyUModal
    v-model:open="modalOpen"
    title="Pembayaran"
    class="min-w-2xl"
    :dismissible="false"
  >
    <template #body>
      <div class="grid grid-cols-2">
        <NuxtImg src="/contohqris.png" />
        <div class="flex items-center justify-center w-full">
          Total Harga: {{ price.toLocaleString("id-ID") }}
        </div>
      </div>
    </template>
  </LazyUModal>
  <main class="bg-[url('/landingbg1.webp')] bg-center h-full py-4">
    <div class="container flex flex-col gap-4">
      <h1 class="text-center text-5xl font-bold md:text-6xl my-4">
        {{ capitalizeWord(item.judul) }}
      </h1>
      <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
        <NuxtImg
          :src="item.foto"
          alt="produk"
          class="max-h-[640px] rounded-md border-2"
        />
        <div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="ml-2 prose prose-base" v-html="sanitizedDeskripsi" />
        </div>
      </div>
      <div
        class="border-2 rounded-2xl bg-eastern-blue-50 p-4 flex md:flex-row flex-col gap-4"
      >
        <div class="flex flex-col gap-1 shrink-0 md:border-r-2 pr-4">
          <h2 class="text-2xl font-semibold">Waktu</h2>
          <p class="text-xl">{{ item.waktu }}</p>
        </div>
        <div class="flex flex-col gap-1">
          <h2 class="text-2xl font-semibold">Tempat</h2>
          <p class="text-xl">{{ item.tempat }}</p>
        </div>
      </div>
      <div class="flex justify-end">
        <div
          class="flex flex-col border rounded-xl py-2 px-4 max-w-sm w-full gap-4"
        >
          <div class="flex justify-between">
            <div class="flex justify-between text-xl font-bold">Jumlah</div>
            <div class="flex gap-4 items-center">
              <div
                v-if="!diskon?.data"
                class="cursor-pointer select-none"
                @click="ticketCount--"
              >
                -
              </div>
              {{ ticketCount }}
              <div
                v-if="!diskon?.data"
                class="cursor-pointer select-none"
                @click="ticketCount++"
              >
                +
              </div>
            </div>
          </div>
          <hr />
          <div class="flex gap-2">
            <UInput
              v-model="ticketCode"
              type="text"
              placeholder="Kode Diskon"
            />
            <UButton
              :loading="status === 'pending'"
              @click="async () => await refresh()"
            >
              Pakai
            </UButton>
          </div>
          <div class="flex justify-between font-bold">
            <p>Harga</p>
            <p>{{ formatRupiah(Number(item.harga)) }}</p>
          </div>
          <div class="flex justify-between font-bold">
            <p>
              Total <span v-if="diskon?.data">- {{ diskon.data.persen }}%</span>
            </p>
            <p v-if="diskon?.data">
              {{
                formatRupiah(
                  Number((item.harga * ticketCount * diskon.data.persen) / 100),
                )
              }}
            </p>
            <p v-else>{{ formatRupiah(Number(item.harga * ticketCount)) }}</p>
          </div>
          <UButton
            v-if="authStore.user"
            class="flex justify-center cursor-pointer"
            :loading="isLoading"
            @click="async () => await onSubmit()"
          >
            Pesan Tiket
          </UButton>
          <div v-else class="text-center py-4 text-eastern-blue-500">
            Login terlebih dahulu untuk memesan
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
