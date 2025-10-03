<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";
  import { APIBASE, type ExtractObjectType } from "~/utils";

  const constantStore = useConstantStore();
  constantStore.setTitle("Dashboard / Paket Saya");

  const query = reactive({
    page: 1,
    limit: 4,
  });

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
    v-model:open="modalOpen"
    title="Detail Bootcamp"
    class="w-full max-w-4xl"
  >
    <template #body>
      <div
        v-if="state?.status === 'Sudah Diverif'"
        class="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <NuxtImg :src="state!.foto!" class="bg-gray-400" />
        <div class="flex flex-col gap-4">
          <h1 class="text-4xl font-bold">{{ state?.namaBootcamp }}</h1>
          <div>
            <h2 class="flex items-center gap-2 font-bold">
              <UIcon name="i-lucide-map-pin" size="20" /> Tempat
            </h2>
            <hr class="my-2" />
            <p>{{ state?.tempat }}</p>
          </div>
          <div>
            <h2 class="flex items-center gap-2 font-bold">
              <UIcon name="i-lucide-calendar-date-range" size="20" /> Waktu
            </h2>
            <hr class="my-2" />
            <p>{{ state?.waktu }}</p>
          </div>
          <div class="mt-auto">
            <h2 class="text-center text-xl font-bold">KODE</h2>
            <p
              v-if="state?.kode"
              class="border-primary bg-accent rounded-xl border text-center text-2xl font-bold"
            >
              {{ state?.kode }}
            </p>
            <p
              v-else
              class="border-primary bg-accent rounded-xl border text-center text-xl"
            >
              Pembayaran belum divalidasi
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <NuxtImg src="/contohqris.png" class="w-full" />
          <div class="flex flex-col gap-2">
            <h2 class="mb-2 font-bold">Detail Harga</h2>
            <div class="flex justify-between">
              <p>Harga Tiket:</p>
              <p>{{ numToRupiah(state!.harga) }}</p>
            </div>
            <div class="mt-auto flex flex-col gap-2 md:flex-row">
              <UButton
                class="flex w-full justify-center"
                @click="onSelesai(state!.id)"
              >
                Sudah Bayar
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <UButton icon="i-lucide-x" @click="modalOpen = false"> Tutup </UButton>
    </template>
  </LazyUModal>
  <main>
    <UCard class="mb-4">
      <h1 class="flex w-full items-center justify-between text-2xl font-bold">
        Dapatkan Paket kami
        <UButton to="/product" size="xl">Dapatkan Paket</UButton>
      </h1>
    </UCard>

    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <UCard
        v-for="item in data?.data"
        :key="item.id"
        class="rounded-2xl"
        :ui="{ body: 'h-full' }"
      >
        <div class="flex h-full flex-col justify-between">
          <NuxtImg :src="item.foto!" class="rounded-2xl bg-gray-400" />
          <div class="mt-2">
            <h1 class="text-xl font-bold">{{ item.namaBootcamp }}</h1>
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
