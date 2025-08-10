<script setup lang="ts">
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
    class="min-w-4xl"
  >
    <template #body>
      <div class="grid grid-cols-2 gap-4">
        <NuxtImg :src="state!.foto!" />
        <div class="flex flex-col gap-4">
          <h1 class="text-4xl font-bold">{{ state?.namaBootcamp }}</h1>
          <div>
            <h2 class="flex gap-2 items-center font-bold">
              <UIcon name="i-heroicons-map-pin" size="20" /> Tempat
            </h2>
            <hr class="my-2" />
            <p>{{ state?.tempat }}</p>
          </div>
          <div>
            <h2 class="flex gap-2 items-center font-bold">
              <UIcon name="i-heroicons-calendar-date-range" size="20" /> Waktu
            </h2>
            <hr class="my-2" />
            <p>{{ state?.waktu }}</p>
          </div>
          <div class="mt-auto">
            <h2 class="text-center font-bold text-xl">KODE</h2>
            <p
              v-if="state?.kode"
              class="text-center font-bold text-2xl border border-primary rounded-xl bg-accent"
            >
              {{ state?.kode }}
            </p>
            <p
              v-else
              class="text-center text-xl border border-primary rounded-xl bg-accent"
            >
              Pembayaran belum divalidasi
            </p>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <UButton icon="i-heroicons-x-mark-16-solid" @click="modalOpen = false">
        Tutup
      </UButton>
    </template>
  </LazyUModal>
  <main>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <UCard v-for="item in data?.data" :key="item.id" :ui="{ body: 'h-full' }">
        <div class="h-full flex flex-col justify-between">
          <div><NuxtImg :src="item.foto!" /></div>
          <div>
            <h1 class="text-bold text-2xl my-2">{{ item.namaBootcamp }}</h1>
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
    <div class="w-full flex justify-center mt-4">
      <UPagination
        v-model:page="query.page"
        :items-per-page="query.limit"
        :total="data?.metadata.total"
      />
    </div>
  </main>
</template>
