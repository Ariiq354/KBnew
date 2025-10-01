<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { APIBASE, type ExtractObjectType } from "~/utils";
  import { columns, initFormData, schema } from "./_constants";
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
    data.value?.data.find((item) => item.id === state.id)
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
</script>

<template>
  <Title>Dashboard | Transaksi</Title>
  <main>
    <LazyUModal
      v-model:open="modalOpen"
      title="Edit transaksi"
      class="max-w-2xl w-full"
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
            <USwitch v-model="state.status" :disabled="isLoading" />
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
      <div
        class="flex justify-end border-b border-(--ui-border-accented) py-3.5"
      >
        <UInput
          class="max-w-xs"
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
        action
        pagination
        @edit-click="clickUpdate"
      />
    </UCard>
  </main>
</template>
