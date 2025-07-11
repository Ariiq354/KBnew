<script setup lang="ts">
  import { APIBASE } from "~/utils";

  const constantStore = useConstantStore();
  constantStore.setTitle("Dashboard / Paket Saya");

  const query = reactive({
    page: 1,
  });
  const { data } = await useFetch(`${APIBASE}/transaksi/user`, {
    query,
  });
</script>

<template>
  <Title>Dashboard | Transaksi</Title>
  <main>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <UCard v-for="item in data?.data" :key="item.id">
        <div>{{ item.namaBootcamp }}</div>
        <div>{{ item.harga }}</div>
      </UCard>
    </div>
  </main>
</template>
