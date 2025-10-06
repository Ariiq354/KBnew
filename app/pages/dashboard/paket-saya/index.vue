<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";
  import { APIBASE, type ExtractObjectType } from "~/utils";

  const constantStore = useConstantStore();
  constantStore.setTitle("Dashboard / Paket Saya");

  const query = reactive({
    page: 1,
    limit: 4,
  });

  const qrisOpen = ref(false);
  const modalOpen = ref(false);
  const { data, refresh } = await useFetch(`${APIBASE}/transaksi/user`, {
    query,
  });

  const state = ref<ExtractObjectType<typeof data.value>>();
  function onDetailClick(item: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    state.value = item;
  }

  async function onDelete(id: number) {
    openConfirmModal("/transaksi/user", { id: [id] }, refresh);
  }

  const isLoading = ref(false);
  async function onSelesai(idBootcamp: number) {
    isLoading.value = true;
    try {
      await $fetch(`${APIBASE}/transaksi/user/${idBootcamp}`, {
        method: "PUT",
      });

      modalOpen.value = false;
      useToastSuccess("Berhasil", "Status Pembelian sudah diupdate");
      await refresh();
    } catch (err: any) {
      useToastError("Submit Failed", err);
    } finally {
      isLoading.value = false;
    }
  }
</script>

<template>
  <Title>Dashboard | Transaksi</Title>
  <LazyUModal
    v-model:open="qrisOpen"
    title="Pembayaran QRIS"
    description="Scan QR ini untuk membayar"
    class="md:min-w-2xl"
  >
    <template #body>
      <NuxtImg src="/contohqris.png" class="w-full" />
    </template>
  </LazyUModal>
  <LazyUModal
    v-model:open="modalOpen"
    title="Detail Bootcamp"
    class="w-full max-w-2xl"
  >
    <template #body>
      <div>
        <h1 class="text-2xl font-bold">{{ state?.bootcamp?.namaBootcamp }}</h1>
        <p class="text-muted">Dipesan di {{ formatDate(state!.createdAt) }}</p>
        <UBadge
          variant="soft"
          :color="
            state?.status === 'Belum Dibayar'
              ? 'error'
              : state?.status === 'Sudah Dibayar'
                ? 'info'
                : 'success'
          "
          class="my-6 rounded-full"
        >
          {{ state?.status }}
        </UBadge>
        <div class="flex flex-col gap-2">
          <div class="flex justify-between">
            <p>Harga Tiket</p>
            <p>{{ numToRupiah(state!.bootcamp!.hargaBootcamp) }}</p>
          </div>
          <div v-if="state?.diskon" class="flex justify-between">
            <p>Diskon</p>
            <p>
              {{
                numToRupiah(
                  Number(
                    (state!.bootcamp!.hargaBootcamp * state.diskon.persen!) /
                      100,
                  ),
                )
              }}
            </p>
          </div>
          <div class="flex justify-between">
            <p>Kode Unik</p>
            <p>
              {{ numToRupiah(state!.bootcamp!.hargaBootcamp - state!.harga) }}
            </p>
          </div>
          <div class="flex justify-between font-bold">
            <p>Total Harga</p>
            <p>
              {{ numToRupiah(state!.harga) }}
            </p>
          </div>
          <hr class="border-muted my-4 border" />
          <div
            v-if="state?.status === 'Sudah Diverif'"
            class="flex flex-col gap-2"
          >
            <p class="text-muted">Kode Tiket Anda</p>
            <p class="text-3xl font-bold">{{ state.kode }}</p>
            <p class="text-muted text-sm">
              Tolong simpan kode ini. Anda bisa mununjukkan saat hadir untuk
              verifikasi
            </p>
          </div>
          <div v-else-if="state?.status === 'Sudah Dibayar'">
            <p class="text-center text-xl font-bold">
              Dimohon menunggu verifikasi dari Admin
            </p>
          </div>
          <div v-else>
            <p class="text-muted">Silahkan bayar menggunakan opsi dibawah</p>
            <div class="my-4 grid grid-cols-1 gap-4">
              <div class="flex flex-col gap-1">
                <div class="flex justify-between">
                  <NuxtImg src="bca-logo.png" class="h-6" />
                  <p class="font-bold">1234567890</p>
                </div>
                <hr class="border-muted border" />
                <div class="flex justify-between">
                  <p class="text-muted text-xs">Bank Central Asia</p>
                  <p class="text-muted text-xs">A/n John Doe</p>
                </div>
              </div>
              <div class="flex flex-col gap-1">
                <div class="flex justify-between">
                  <NuxtImg src="bsi-logo.png" class="h-6" />
                  <p class="font-bold">1234567890</p>
                </div>
                <hr class="border-muted border" />
                <div class="flex justify-between">
                  <p class="text-muted text-xs">Bank Syariah Asia</p>
                  <p class="text-muted text-xs">A/n John Doe</p>
                </div>
              </div>
              <UButton
                variant="outline"
                icon="i-lucide-qr-code"
                @click="qrisOpen = true"
              >
                QRIS
              </UButton>
            </div>
            <UButton
              class="flex w-full justify-center"
              @click="onSelesai(state!.id)"
            >
              Sudah Bayar
            </UButton>
          </div>
        </div>
      </div>
    </template>
  </LazyUModal>
  <main>
    <UCard class="mb-4">
      <h1
        class="flex w-full items-center justify-between text-xl font-bold md:text-2xl"
      >
        Dapatkan Paket kami
        <UButton to="/product">Dapatkan Paket</UButton>
      </h1>
    </UCard>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      <UCard
        v-for="item in data?.data"
        :key="item.id"
        class="rounded-2xl"
        :ui="{ body: 'h-full' }"
      >
        <div class="flex h-full flex-col justify-between">
          <NuxtImg :src="item.bootcamp?.foto" class="rounded-2xl bg-gray-400" />
          <div class="mt-2">
            <h1 class="text-xl font-bold">{{ item.bootcamp?.namaBootcamp }}</h1>
            <p class="text-muted">
              Dipesan di {{ formatDate(item.createdAt) }}
            </p>
          </div>
          <div class="mt-4 flex justify-between">
            <p>Status</p>
            <UBadge
              variant="soft"
              :color="
                item.status === 'Belum Dibayar'
                  ? 'error'
                  : item.status === 'Sudah Dibayar'
                    ? 'info'
                    : 'success'
              "
              class="rounded-full"
            >
              {{ item.status }}
            </UBadge>
          </div>
          <div class="mt-2 flex justify-between font-bold">
            <p class="font-bold">Total</p>
            <p>{{ numToRupiah(item.harga) }}</p>
          </div>
          <div class="mt-4 flex gap-2">
            <UButton
              variant="soft"
              class="flex w-full justify-center"
              @click="onDetailClick(item)"
            >
              Detail
            </UButton>
            <UButton
              class="flex w-full justify-center"
              color="error"
              @click="onDelete(item.id)"
            >
              Batalkan
            </UButton>
          </div>
        </div>
      </UCard>
    </div>
    <div class="mt-4 flex w-full justify-center">
      <UPagination
        v-model:page="query.page"
        :items-per-page="query.limit"
        :total="data?.metadata.total"
      />
    </div>
  </main>
</template>
