<script setup lang="ts">
  import { APIBASE, capitalizeWord, formatRupiah } from "~/utils";
  import { useAuthStore } from "~/stores/auth";
  import { useToastError, useToastSuccess } from "~/composables/toast";

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
  } = await useFetch(() => `${APIBASE}/diskon/kode/${ticketCode.value}`, {
    immediate: false,
    watch: false,
    onResponse(item) {
      if (!item.response._data?.data) {
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
    class="md:min-w-2xl"
    :dismissible="false"
  >
    <template #body>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <NuxtImg src="/contohqris.png" class="w-full" />
        <div class="flex flex-col gap-2">
          <h2 class="mb-2 font-bold">Detail Harga</h2>
          <div class="flex justify-between">
            <p>Harga Tiket:</p>
            <p>{{ numToRupiah(item.harga) }}</p>
          </div>
          <div v-if="diskon?.data">
            <p>Diskon:</p>
            <p>
              {{
                numToRupiah(
                  Number((item.harga * ticketCount * diskon.data.persen) / 100),
                )
              }}
            </p>
          </div>
          <div class="flex justify-between">
            <p>Kode Unik:</p>
            <p>{{ numToRupiah(price - item.harga) }}</p>
          </div>
          <hr class="border-default border-t" />
          <div class="flex justify-between">
            <p>Total Harga:</p>
            <p>
              {{ numToRupiah(price) }}
            </p>
          </div>
          <div class="mt-auto flex flex-col gap-2 md:flex-row">
            <UButton class="flex w-full justify-center">Sudah Bayar</UButton>
            <UButton class="flex w-full justify-center">Nanti Saja</UButton>
          </div>
        </div>
      </div>
    </template>
  </LazyUModal>
  <main class="h-full bg-[url('/landingbg1.webp')] bg-center py-4">
    <div class="container flex flex-col gap-4">
      <h1 class="my-4 text-center text-5xl font-bold md:text-6xl">
        {{ capitalizeWord(item.judul) }}
      </h1>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <NuxtImg
          :src="item.foto"
          alt="produk"
          class="max-h-[640px] rounded-md border-2"
        />
        <div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="prose prose-base ml-2" v-html="item.deskripsi" />
        </div>
      </div>
      <div
        class="bg-eastern-blue-50 flex flex-col gap-4 rounded-2xl border-2 p-4 md:flex-row"
      >
        <div class="flex shrink-0 flex-col gap-1 pr-4 md:border-r-2">
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
          class="flex w-full max-w-sm flex-col gap-4 rounded-xl border px-4 py-2"
        >
          <div class="flex justify-between">
            <div class="flex justify-between text-xl font-bold">Jumlah</div>
            <div class="flex items-center gap-4">
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
            class="flex cursor-pointer justify-center"
            :loading="isLoading"
            @click="async () => await onSubmit()"
          >
            Pesan Tiket
          </UButton>
          <div v-else class="text-eastern-blue-500 py-4 text-center">
            Login terlebih dahulu untuk memesan
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
