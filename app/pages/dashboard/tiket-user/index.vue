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
  const { data, status } = await useFetch(`${APIBASE}/bootcamp/landing`, {
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
    }
  );
  watchOnce(bootcampId, () => refresh());

  const modalOpen = ref(false);

  function clickUpdate(itemData: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    bootcampId.value = itemData.id;
  }

  watch(
    () => [query.search],
    () => {
      query.page = 1;
    }
  );

  watch(
    () => [queryTiket.search],
    () => {
      queryTiket.page = 1;
    }
  );
</script>

<template>
  <Title>Dashboard | Tiket User</Title>
  <main>
    <LazyUModal v-model:open="modalOpen" title="Daftar Kode Tiket" fullscreen>
      <template #body>
        <div class="mb-6 flex gap-2 md:gap-4">
          <UInput
            size="xl"
            class="flex-5"
            leading-icon="i-lucide-search"
            placeholder="Search..."
            @update:model-value="searchDebouncedTiket"
          />
        </div>
        <AppTable
          v-model:page="queryTiket.page"
          :columns="columnsTiket"
          :data="dataTiket?.data"
          :loading="statusTiket === 'pending'"
          :total="dataTiket?.metadata.total"
          enumerate
          pagination
        />
      </template>
    </LazyUModal>
    <UCard>
      <div class="mb-6 flex gap-2 md:gap-4">
        <UInput
          size="xl"
          class="flex-5"
          leading-icon="i-lucide-search"
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
        viewable
        pagination
        @view="clickUpdate"
      />
    </UCard>
  </main>
</template>
