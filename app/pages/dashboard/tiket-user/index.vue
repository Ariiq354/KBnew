<script setup lang="ts">
  import { APIBASE, type ExtractObjectType } from "~/utils";
  import { columns, columnsTiket } from "./_constants";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Dashboard / Tiket User");

  const query = reactive({
    search: "",
    page: 1,
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status } = await useFetch(`${APIBASE}/bootcamp/daftar-user`, {
    query,
  });

  const bootcampId = ref();
  const queryTiket = reactive({
    search: "",
    page: 1,
  });
  const searchDebouncedTiket = useDebounceFn((v) => {
    queryTiket.search = v;
    refresh();
  }, 300);
  const {
    data: dataTiket,
    status: statusTiket,
    refresh,
  } = await useFetch(
    () => `${APIBASE}/bootcamp/daftar-user/${bootcampId.value}`,
    {
      query: queryTiket,
      immediate: false,
    },
  );

  const modalOpen = ref(false);

  function clickUpdate(itemData: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    bootcampId.value = itemData.id;
    refresh();
  }
</script>

<template>
  <Title>Dashboard / Tiket User</Title>
  <main>
    <LazyUModal v-model:open="modalOpen" title="Daftar Kode Tiket" fullscreen>
      <template #body>
        <div
          class="flex justify-end border-b border-(--ui-border-accented) py-3.5"
        >
          <UInput
            class="max-w-xs"
            leading-icon="i-heroicons-magnifying-glass"
            placeholder="Search..."
            @update:model-value="searchDebouncedTiket"
          />
        </div>
        <AppTable
          v-model:page="query.page"
          :columns="columnsTiket"
          :data="dataTiket?.data"
          :loading="statusTiket === 'pending'"
          :total="dataTiket?.metadata.total"
          enumerate
          pagination
      /></template>
      <template #footer>
        <UButton icon="i-heroicons-x-mark-16-solid" @click="modalOpen = false">
          Tutup
        </UButton>
      </template>
    </LazyUModal>
    <UCard>
      <div
        class="flex justify-end border-b border-(--ui-border-accented) py-3.5"
      >
        <UInput
          class="max-w-xs"
          leading-icon="i-heroicons-magnifying-glass"
          placeholder="Search..."
          @update:model-value="searchDebounced"
        />
      </div>
      <AppTable
        v-model:page="query.page"
        :columns="columns"
        :data="data?.data"
        :loading="status === 'pending'"
        :total="data?.metadata.total"
        enumerate
        action
        pagination
        @edit-click="clickUpdate"
      />
    </UCard>
  </main>
</template>
