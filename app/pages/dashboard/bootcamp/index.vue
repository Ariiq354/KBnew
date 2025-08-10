<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { APIBASE } from "~/utils";
  import { columns, getInitialFormData, schema } from "./_constants";
  import type { Schema } from "./_constants";

  const constantStore = useConstantStore();
  constantStore.setTitle("Dashboard / Daftar Bootcamp");

  const state = ref(getInitialFormData());
  const query = reactive({
    search: "",
    page: 1,
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status, refresh } = await useFetch(`${APIBASE}/bootcamp`, {
    query,
  });

  const modalOpen = ref(false);
  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const basePath = `${APIBASE}/bootcamp`;
    const formData = new FormData();

    for (const key in event.data) {
      formData.append(key, (event.data as any)[key]);
    }

    if (file.value) {
      formData.append("file", file.value);
    }

    await execute({
      path: state.value.id ? `${basePath}/${state.value.id}` : basePath,
      body: formData,
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
    if (imageUrl.value) {
      URL.revokeObjectURL(imageUrl.value);
      imageUrl.value = undefined;
      file.value = undefined;
    }
  }

  const selected = ref<Record<string, boolean>>({});
  async function clickDelete() {
    const selectedId = Object.keys(selected.value)
      .map(Number)
      .map((index) => data.value?.data[index]?.id);
    async function onDelete() {
      await $fetch(`${APIBASE}/bootcamp`, {
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
    if (imageUrl.value) {
      URL.revokeObjectURL(imageUrl.value);
      imageUrl.value = undefined;
      file.value = undefined;
    }
  }

  const imageUrl = ref();
  const file = ref();
  function uploadFile(event: any) {
    file.value = event.target.files[0];
    if (file.value && file.value.type.startsWith("image/")) {
      if (imageUrl.value) {
        URL.revokeObjectURL(imageUrl.value);
      }
      imageUrl.value = URL.createObjectURL(file.value);
    } else {
      imageUrl.value = undefined;
    }
  }
</script>

<template>
  <Title>Dashboard | Daftar Bootcamp</Title>
  <main>
    <LazyUModal
      v-model:open="modalOpen"
      :title="(state.id ? 'Edit' : 'Tambah') + ' Bootcamp'"
      class="min-w-4xl"
    >
      <template #body>
        <UForm
          id="bootcamp-form"
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Judul" name="judul">
            <UInput v-model="state.judul" :disabled="isLoading" />
          </UFormField>
          <UFormField label="Harga" name="harga">
            <UInput v-model="state.harga" type="number" :disabled="isLoading" />
          </UFormField>
          <UFormField label="Deskripsi" name="deskripsi">
            <TipTapEditor v-model="state.deskripsi" :disabled="isLoading" />
          </UFormField>
          <UFormField label="Tempat" name="tempat">
            <UInput v-model="state.tempat" :disabled="isLoading" />
          </UFormField>
          <UFormField label="Google Map" name="googleMap">
            <MapPicker
              :url="state.googleMap"
              class="mb-4"
              @picked="(e) => (state.googleMap = e)"
            />
            <UInput :model-value="state.googleMap" disabled />
          </UFormField>
          <UFormField label="Tanggal & Waktu" name="waktu">
            <UInput v-model="state.waktu" :disabled="isLoading" />
          </UFormField>
          <UFormField label="Pembicara" name="pembicara">
            <UInput v-model="state.pembicara" :disabled="isLoading" />
          </UFormField>
          <UFormField label="Status" name="status">
            <USwitch v-model="state.status" :disabled="isLoading" />
          </UFormField>
          <UFormField label="Foto" name="foto">
            <UInput
              type="file"
              accept="image/*"
              :disabled="isLoading"
              @change="uploadFile"
            />
            <div class="flex gap-2 mt-2 items-center">
              <div v-if="state.foto">
                <img
                  class=""
                  :src="state.foto"
                  alt="Preview"
                  style="max-width: 300px"
                />
              </div>
              <div v-if="state.foto && imageUrl">-></div>
              <div v-if="imageUrl">
                <img
                  class=""
                  :src="imageUrl"
                  alt="Preview"
                  style="max-width: 300px"
                />
              </div>
            </div>
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
          form="bootcamp-form"
        >
          Simpan
        </UButton>
      </template>
    </LazyUModal>
    <UCard>
      <CrudCard
        :add-function="clickAdd"
        :path="`${APIBASE}/bootcamp`"
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
