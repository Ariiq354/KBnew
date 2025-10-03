<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { APIBASE, type ExtractObjectType } from "~/utils";
  import { columns, initFormData, schema, statusOptions } from "./_constants";
  import type { Schema } from "./_constants";
  import { useConstantStore } from "~/stores/constant";
  import { useSubmit } from "~/composables/function";
  import { useToastError } from "~/composables/toast";

  const constantStore = useConstantStore();
  constantStore.setTitle("Dashboard / Daftar Transaksi");

  let state = reactive(initFormData);
  const query = reactive({
    search: "",
    page: 1,
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status, refresh } = await useFetch(`${APIBASE}/transaksi`, {
    query,
  });

  const currentData = computed(() =>
    data.value?.data.find((item) => item.id === state.id),
  );

  const modalOpen = ref(false);
  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const basePath = `${APIBASE}/transaksi`;
    await execute({
      path: `${basePath}/${state.id}`,
      body: event.data,
      method: "PUT",
      onSuccess() {
        modalOpen.value = false;
        refresh();
      },
      onError(error) {
        useToastError("Submit Failed", error.data.message);
      },
    });
  }

  function clickUpdate(itemData: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    state = itemData;
  }

  async function clickDelete(ids: number[]) {
    openConfirmModal("/transaksi", { id: ids }, refresh);
  }

  watch(
    () => [query.search],
    () => {
      query.page = 1;
    },
  );
</script>

<template>
  <Title>Dashboard | Transaksi</Title>
  <main>
    <LazyUModal
      v-model:open="modalOpen"
      title="Edit transaksi"
      class="w-full max-w-2xl"
    >
      <template #body>
        <UForm
          id="transaksi-form"
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Nama User">
            <UInput :model-value="currentData?.nama" disabled />
          </UFormField>
          <UFormField label="Bootcamp">
            <UInput :model-value="currentData?.namaBootcamp" disabled />
          </UFormField>
          <UFormField label="Harga">
            <UInput :model-value="currentData?.harga" disabled />
          </UFormField>
          <UFormField label="Diskon">
            <UInput :model-value="currentData?.diskon" disabled />
          </UFormField>
          <UFormField label="Status" name="status">
            <USelectMenu
              v-model="state.status"
              :items="statusOptions"
              :disabled="isLoading"
            />
          </UFormField>
        </UForm>
      </template>
      <template #footer>
        <UButton
          icon="i-lucide-x"
          variant="ghost"
          :disabled="isLoading"
          @click="modalOpen = false"
        >
          Batal
        </UButton>
        <UButton
          type="submit"
          icon="i-lucide-check"
          :loading="isLoading"
          form="transaksi-form"
        >
          Simpan
        </UButton>
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
        selectable
        enumerate
        deletable
        editable
        pagination
        @edit="clickUpdate"
        @delete="clickDelete"
      />
    </UCard>
  </main>
</template>
