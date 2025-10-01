<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";
  import { columns } from "./_constants";
  import { APIBASE, type ExtractObjectType } from "~/utils";

  const constantStore = useConstantStore();
  constantStore.setTitle("Dashboard / Anggota");

  const query = reactive({
    search: "",
    page: 1,
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status } = await useFetch(`${APIBASE}/anggota`, {
    query,
  });

  const state = ref();

  const modalOpen = ref(false);
  function clickUpdate(itemData: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    state.value = itemData.detail;
  }
</script>

<template>
  <Title>Dashboard | Anggota</Title>
  <main>
    <LazyUModal v-model:open="modalOpen" title="Detail User" fullscreen>
      <template #body>
        <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          <UFormField label="Foto">
            <AppUploadImage v-model:foto="state.foto" disabled />
          </UFormField>
          <UFormField label="Kode User">
            <UInput :model-value="state?.kodeUser" disabled />
          </UFormField>
          <UFormField label="Anak ke">
            <UInput :model-value="state?.anakKe" disabled />
          </UFormField>
          <UFormField label="Nama Ayah">
            <UInput :model-value="state?.namaAyah" disabled />
          </UFormField>
          <UFormField label="Gender">
            <UInput :model-value="state?.gender" disabled />
          </UFormField>
          <UFormField label="Berat">
            <UInput :model-value="state?.berat" disabled />
          </UFormField>
          <UFormField label="Tinggi">
            <UInput :model-value="state?.tinggi" disabled />
          </UFormField>
          <UFormField label="Pekerjaan">
            <UInput :model-value="state?.pekerjaan" disabled />
          </UFormField>
          <UFormField label="Pendidikan">
            <UInput :model-value="state?.pendidikan" disabled />
          </UFormField>
          <UFormField label="Status Kawin">
            <UInput :model-value="state?.statusKawin" disabled />
          </UFormField>
          <UFormField label="Suku">
            <UInput :model-value="state?.suku" disabled />
          </UFormField>
          <UFormField label="Tanggal Lahir">
            <UInput :model-value="state?.tanggalLahir" disabled />
          </UFormField>
          <UFormField label="Hobi">
            <UInput :model-value="state?.hobi" disabled />
          </UFormField>
          <UFormField label="Deskripsi">
            <UInput :model-value="state?.deskripsi" disabled />
          </UFormField>
          <UFormField label="Jurusan">
            <UInput :model-value="state?.jurusan" disabled />
          </UFormField>
          <UFormField label="Instagram">
            <UInput :model-value="state?.instagram" disabled />
          </UFormField>
          <UFormField label="Kelurahan">
            <UInput :model-value="state?.kelurahan" disabled />
          </UFormField>
          <UFormField label="Kecamatan">
            <UInput :model-value="state?.kecamatan" disabled />
          </UFormField>
          <UFormField label="Kota">
            <UInput :model-value="state?.kota" disabled />
          </UFormField>
          <UFormField label="Provinsi">
            <UInput :model-value="state?.provinsi" disabled />
          </UFormField>
          <UFormField label="Kriteria">
            <UTextarea :model-value="state?.kriteria" disabled />
          </UFormField>
        </div>
      </template>
      <template #footer>
        <UButton icon="i-lucide-x" variant="ghost" @click="modalOpen = false">
          Tutup
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
        enumerate
        viewable
        pagination
        @view="clickUpdate"
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
