<script setup lang="ts">
  import { APIBASE } from "~/utils";

  const constantStore = useConstantStore();
  constantStore.setTitle("Dashboard / Paket Saya");

  const query = reactive({
    page: 1,
    limit: 4,
  });
  const { data } = await useFetch(`${APIBASE}/transaksi/user`, {
    query,
  });
</script>

<template>
  <Title>Dashboard | Transaksi</Title>
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
              <UButton>Detail</UButton>
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
