<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { APIBASE, type ExtractObjectType } from "~/utils";
  import { columns, getInitialFormData, schema } from "./_constants";
  import type { Schema } from "./_constants";
  import { useConstantStore } from "~/stores/constant";
  import { useSubmit } from "~/composables/function";
  import { useToastError } from "~/composables/toast";
  import { openConfirmModal } from "~/composables/modal";

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

  const viewStatus = ref(false);
  const modalOpen = ref(false);
  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(
      event.data as Record<string, any>,
    )) {
      formData.append(key, value);
    }

    const basePath = `${APIBASE}/bootcamp`;
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
    viewStatus.value = false;
  }

  async function clickDelete(ids: number[]) {
    openConfirmModal("/bootcamp", { id: ids }, refresh);
  }

  function clickUpdate(itemData: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    state.value = { ...itemData };
    viewStatus.value = false;
  }

  watch(
    () => [query.search],
    () => {
      query.page = 1;
    },
  );
</script>

<template>
  <Title>Dashboard | Daftar Bootcamp</Title>
  <main>
    <LazyUModal
      v-model:open="modalOpen"
      :title="
        (state.id ? (viewStatus ? 'Detail' : 'Edit') : 'Tambah') + ' Bootcamp'
      "
      class="w-full max-w-4xl"
    >
      <template #body>
        <UForm
          id="bootcamp-form"
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Foto" name="foto">
            <AppUploadImage
              v-model:file="state.file"
              v-model:foto="state.foto"
              :disabled="isLoading || viewStatus"
            />
          </UFormField>
          <UFormField label="Judul" name="judul">
            <UInput v-model="state.judul" :disabled="isLoading || viewStatus" />
          </UFormField>
          <UFormField label="Harga" name="harga">
            <UInput
              v-model="state.harga"
              type="number"
              :disabled="isLoading || viewStatus"
            />
          </UFormField>
          <UFormField label="Deskripsi" name="deskripsi">
            <TipTapEditor
              v-model="state.deskripsi"
              :disabled="isLoading || viewStatus"
            />
          </UFormField>
          <UFormField label="Tempat" name="tempat">
            <UInput
              v-model="state.tempat"
              :disabled="isLoading || viewStatus"
            />
          </UFormField>
          <UFormField label="Google Map" name="googleMap">
            <MapPicker
              :url="state.googleMap"
              class="mb-4"
              @picked="(e) => (state.googleMap = e)"
            />
          </UFormField>
          <UFormField label="Tanggal & Waktu" name="waktu">
            <UInput v-model="state.waktu" :disabled="isLoading || viewStatus" />
          </UFormField>
          <UFormField label="Pembicara" name="pembicara">
            <UInput
              v-model="state.pembicara"
              :disabled="isLoading || viewStatus"
            />
          </UFormField>
          <UFormField label="Status" name="status">
            <USwitch
              v-model="state.status"
              :disabled="isLoading || viewStatus"
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
          {{ viewStatus ? "Tutup" : "Batal" }}
        </UButton>
        <UButton
          type="submit"
          icon="i-lucide-check"
          :loading="isLoading"
          form="bootcamp-form"
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
        <UButton
          icon="i-lucide-plus"
          class="text-white dark:bg-blue-600 hover:dark:bg-blue-600/75"
          @click="clickAdd"
        >
          <p class="hidden md:block">Tambah</p>
        </UButton>
      </div>
      <AppTable
        v-model:page="query.page"
        :columns="columns"
        :data="data?.data"
        :loading="status === 'pending'"
        :total="data?.metadata.total"
        enumerate
        deletable
        editable
        viewable
        selectable
        pagination
        @edit="clickUpdate"
        @view="
          (i) => {
            clickUpdate(i);
            viewStatus = true;
          }
        "
        @delete="clickDelete"
      />
    </UCard>
  </main>
</template>
