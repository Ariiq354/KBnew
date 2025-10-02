<script setup lang="ts">
  import type { FormSubmitEvent } from "@nuxt/ui";
  import {
    columns,
    getInitialFormData,
    schema,
    StatusOptions,
  } from "./_constants";
  import type { Schema } from "./_constants";
  import { useConstantStore } from "~/stores/constant";
  import { APIBASE, type ExtractObjectType } from "~/utils";
  import { useToastError } from "~/composables/toast";
  import { useSubmit } from "~/composables/function";

  const constantStore = useConstantStore();
  constantStore.setTitle("Dashboard / List Taaruf");

  const state = ref(getInitialFormData());

  const query = reactive({
    search: "",
    page: 1,
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status, refresh } = await useFetch(`${APIBASE}/taaruf`, {
    query,
  });

  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    await execute({
      path: `${APIBASE}/taaruf/${state.value.id}`,
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

  const modalStateDituju =
    ref<ExtractObjectType<typeof data.value>["dituju"]>();
  const modalStatePenuju =
    ref<ExtractObjectType<typeof data.value>["dituju"]>();

  const modalOpen = ref(false);
  function clickUpdate(itemData: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    state.value.status = itemData.status;
    state.value.id = itemData.id;
    modalStateDituju.value = itemData.dituju;
    modalStatePenuju.value = itemData.penuju;
  }
</script>

<template>
  <Title>Dashboard | List Taaruf</Title>
  <main>
    <UModal v-model:open="modalOpen" title="Detail Member">
      <template #body>
        <UForm
          id="form-taaruf"
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Nama Lengkap Penuju">
              <UInput :model-value="modalStatePenuju?.namaAnggota" disabled />
            </UFormField>
            <UFormField label="Nama Lengkap Dituju">
              <UInput :model-value="modalStateDituju?.namaAnggota" disabled />
            </UFormField>
          </div>
          <UFormField label="Status" name="status">
            <USelectMenu
              v-model="state.status"
              :items="StatusOptions"
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
          form="form-taaruf"
        >
          Simpan
        </UButton>
      </template>
    </UModal>
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
        pagination
        action
        @edit-click="clickUpdate"
      >
        <template #noTelepon-cell="{ row }">
          <NuxtLink
            :href="`https://wa.me/${row.original.noTelepon}`"
            target="_blank"
          >
            {{ row.original.noTelepon }}
          </NuxtLink>
        </template>
      </AppTable>
    </UCard>
  </main>
</template>
