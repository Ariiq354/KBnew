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
  const { data } = await useFetch(`${APIBASE}/transaksi/user`, {
    query,
  });

  const state = ref<ExtractObjectType<typeof data.value>>();
  function onDetailClick(item: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    state.value = item;
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
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <NuxtImg :src="state!.foto!" />
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
    </template>
    <template #footer>
      <UButton icon="i-lucide-x" @click="modalOpen = false"> Tutup </UButton>
    </template>
  </LazyUModal>
  <main>
    <UCard class="mb-4">
      <h1 class="flex w-full items-center justify-between">
        Dapatkan Paket kami <UButton to="/product">Dapatkan Paket</UButton>
      </h1>
    </UCard>

    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <UCard v-for="item in data?.data" :key="item.id" :ui="{ body: 'h-full' }">
        <div class="flex h-full flex-col justify-between">
          <div><NuxtImg :src="item.foto!" /></div>
          <div>
            <h1 class="text-bold my-2 text-2xl">{{ item.namaBootcamp }}</h1>
            <div class="flex justify-between">
              <div class="flex flex-col gap-2">
                <p>{{ item.waktu }}</p>
              </div>
              <UButton @click="onDetailClick(item)">Detail</UButton>
            </div>
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
