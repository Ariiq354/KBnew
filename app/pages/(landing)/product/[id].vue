<script setup lang="ts">
  import { useToastError, useToastSuccess } from "~/composables/toast";
  import { useAuthStore } from "~/stores/auth";
  import { APIBASE } from "~/utils";

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

  const item = computed(() => data.value!.data!);

  const modalOpen = ref(false);
  const price = ref(0);
  const idBootcampUser = ref();
  const isLoading = ref(false);
  async function onSubmit() {
    isLoading.value = true;
    try {
      const result = await $fetch(`${APIBASE}/bootcamp/landing`, {
        method: "POST",
        body: {
          idBootcamp: id,
          harga: item.value.harga,
          ...(diskon && { diskon: ticketCode.value }),
        },
      });

      price.value = result.data!.newPrice;
      idBootcampUser.value = result.data!.id;
      modalOpen.value = true;
      useToastSuccess("Berhasil", "Bootcamp berhasil disimpan");
    } catch (err: any) {
      useToastError("Submit Failed", err);
    } finally {
      isLoading.value = false;
    }
  }

  async function onSelesai() {
    isLoading.value = true;
    try {
      await $fetch(`${APIBASE}/transaksi/user/${idBootcampUser.value}`, {
        method: "PUT",
      });

      modalOpen.value = false;
      useToastSuccess("Berhasil", "Status Pembelian sudah diupdate");
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
    title="Pembayaran QRIS"
    description="Scan QR ini untuk membayar"
    class="md:min-w-2xl"
    :dismissible="false"
  >
    <template #body>
      <div class="flex flex-col">
        <NuxtImg src="/contohqris.png" class="w-full" />
        <hr class="border-muted my-4 border" />
        <div class="flex flex-col gap-2">
          <div class="flex justify-between">
            <p>Harga Tiket</p>
            <p>{{ numToRupiah(item.harga) }}</p>
          </div>
          <div v-if="diskon?.data" class="flex justify-between">
            <p>Diskon</p>
            <p>
              {{ numToRupiah(Number((item.harga * diskon.data.persen) / 100)) }}
            </p>
          </div>
          <div class="flex justify-between">
            <p>Kode Unik</p>
            <p>{{ numToRupiah(price - item.harga) }}</p>
          </div>
          <div class="flex justify-between font-bold">
            <p>Total Harga</p>
            <p>
              {{ numToRupiah(price) }}
            </p>
          </div>
          <div class="mt-8 flex flex-col gap-2 md:flex-row">
            <UButton class="flex w-full justify-center" @click="onSelesai">
              Sudah Bayar
            </UButton>
            <UButton
              class="flex w-full justify-center"
              variant="soft"
              @click="modalOpen = false"
            >
              Nanti Saja
            </UButton>
          </div>
        </div>
      </div>
    </template>
  </LazyUModal>
  <main class="h-full bg-[url('/landingbg1.webp')] bg-center py-4">
    <div class="container grid grid-cols-1 gap-4 md:grid-cols-2 md:flex-row">
      <div class="flex flex-col gap-8">
        <NuxtImg
          :src="item.foto"
          alt="produk"
          class="border-default max-h-[640px] rounded-2xl border bg-gray-400 object-cover"
        />
        <div
          class="border-muted rounded-2xl border-2 bg-white p-4 shadow-md md:p-8"
        >
          <h1 class="mb-4 text-2xl font-bold md:text-4xl">{{ item.judul }}</h1>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="prose prose-base" v-html="item.deskripsi" />
          <hr class="border-muted my-4 border" />
          <div>
            <p class="text-muted">Waktu:</p>
            <p class="font-semibold">{{ item.waktu }}</p>
          </div>
          <div class="mt-4">
            <p class="text-muted">Tempat:</p>
            <p class="font-semibold">{{ item.tempat }}</p>
          </div>
        </div>
      </div>
      <div
        class="border-muted h-min rounded-2xl border-2 bg-white p-4 shadow-md md:p-8"
      >
        <h1 class="mb-2 text-xl font-bold md:text-2xl">Pesan Tiket</h1>
        <div>
          <h2 class="mb-1 font-semibold">Kode Diskon</h2>
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
          <h3 class="text-muted mt-1 text-sm">
            Opsional: Masukkan kode diskon jika anda punya
          </h3>
          <hr class="border-muted my-8 border" />
          <div class="flex flex-col gap-2">
            <div class="flex justify-between">
              <p>Harga Tiket</p>
              <p>{{ numToRupiah(item.harga) }}</p>
            </div>
            <div v-if="diskon?.data" class="flex justify-between">
              <p>Diskon</p>
              <p>
                -{{
                  numToRupiah(Number((item.harga * diskon.data.persen) / 100))
                }}
              </p>
            </div>
            <div class="mb-4 flex justify-between font-bold">
              <p>Total Harga</p>
              <p>
                {{
                  diskon?.data
                    ? numToRupiah(
                        item.harga - (item.harga * diskon.data.persen) / 100,
                      )
                    : numToRupiah(item.harga)
                }}
              </p>
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
    </div>
  </main>
</template>
