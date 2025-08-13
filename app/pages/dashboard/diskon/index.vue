<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { APIBASE } from "~/utils";
  import { columns, getInitialFormData, schema } from "./_constants";
  import type { Schema } from "./_constants";

  const constantStore = useConstantStore();
  constantStore.setTitle("Dashboard / Daftar Diskon");

  const state = ref(getInitialFormData());
  const query = reactive({
    search: "",
    page: 1,
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status, refresh } = await useFetch(`${APIBASE}/diskon`, {
    query,
  });

  const modalOpen = ref(false);
  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const basePath = `${APIBASE}/diskon`;
    await execute({
      path: state.value.id ? `${basePath}/${state.value.id}` : basePath,
      body: event.data,
      method: state.value.id ? "PUT" : "POST",
      onSuccess() {
        modalOpen.value = false;
        refresh();
      },
      onError(error) {
        useToastError("Submit Failed", error.data.message);
      },
    });
  }

  function clickAdd() {
    state.value = getInitialFormData();
    modalOpen.value = true;
  }

  const selected = ref<Record<string, boolean>>({});
  async function clickDelete() {
    const selectedId = Object.keys(selected.value)
      .map(Number)
      .map((index) => data.value?.data[index]?.id);
    async function onDelete() {
      await $fetch(`${APIBASE}/diskon`, {
        method: "DELETE",
        body: {
          id: selectedId,
        },
      });
      selected.value = {};
      await refresh();
    }
    openConfirmModal(onDelete);
  }

  function clickUpdate(itemData: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    state.value = itemData;
  }
</script>

<template>
  <Title>Dashboard | Diskon</Title>
  <main>
    <LazyUModal
      v-model:open="modalOpen"
      :title="(state.id ? 'Edit' : 'Tambah') + ' Diskon'"
      class="min-w-2xl"
    >
      <template #body>
        <UForm
          id="diskon-form"
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Kode" name="kode">
            <UInput v-model="state.kode" :disabled="isLoading" />
          </UFormField>
          <UFormField label="Persen" name="persen">
            <UInput
              v-model="state.persen"
              type="number"
              :disabled="isLoading"
            />
          </UFormField>
          <UFormField label="Batas Waktu" name="batasWaktu">
            <UInput
              v-model="state.batasWaktu"
              :disabled="isLoading"
              type="date"
            />
          </UFormField>
          <UFormField label="Batas Pemakai" name="batasPemakai">
            <UInput
              v-model="state.batasPemakai"
              type="number"
              :disabled="isLoading"
            />
          </UFormField>
          <UFormField label="Status" name="status">
            <USwitch v-model="state.status" :disabled="isLoading" />
          </UFormField>
        </UForm>
      </template>
      <template #footer>
        <UButton
          icon="i-heroicons-x-mark-16-solid"
          variant="ghost"
          :disabled="isLoading"
          @click="modalOpen = false"
        >
          Batal
        </UButton>
        <UButton
          type="submit"
          icon="i-heroicons-check-16-solid"
          :loading="isLoading"
          form="diskon-form"
        >
          Simpan
        </UButton>
      </template>
    </LazyUModal>
    <UCard>
      <CrudCard
        :add-function="clickAdd"
        :path="`${APIBASE}/diskon`"
        :delete-function="clickDelete"
        :delete-disabled="Object.keys(selected).length === 0"
        :export-disabled="!data || data.data.length === 0"
      />
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
        v-model:select="selected"
        :columns="columns"
        :data="data?.data"
        :loading="status === 'pending'"
        :total="data?.metadata.total"
        enumerate
        action
        selectable
        pagination
        @edit-click="clickUpdate"
      />
    </UCard>
  </main>
</template>
