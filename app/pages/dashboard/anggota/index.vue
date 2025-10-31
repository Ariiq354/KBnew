<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";
  import { APIBASE, type ExtractObjectType } from "~/utils";
  import { columns } from "./_constants";

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

  const state = ref<ExtractObjectType<typeof data.value>>();

  const modalOpen = ref(false);
  function clickUpdate(itemData: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    state.value = itemData;
  }
</script>

<template>
  <Title>Dashboard | Anggota</Title>
  <main>
    <LazyUModal v-model:open="modalOpen" title="Detail User" fullscreen>
      <template #body>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <UFormField label="Foto" class="md:col-span-2 lg:col-span-4">
            <AppUploadImage v-model:foto="state!.detail!.foto" disabled />
          </UFormField>
          <UFormField label="Nama User">
            <UInput :model-value="state?.namaAnggota" disabled />
          </UFormField>
          <UFormField label="Gender">
            <UInput :model-value="state?.detail?.gender" disabled />
          </UFormField>
          <UFormField label="No Telepon">
            <UInput :model-value="state?.noTelepon" disabled />
          </UFormField>
          <UFormField label="Status Kawin">
            <UInput :model-value="state?.detail?.statusKawin" disabled />
          </UFormField>
          <UFormField label="Tanggal Lahir">
            <UInput :model-value="state?.detail?.tanggalLahir" disabled />
          </UFormField>
          <UFormField label="Nama Ayah">
            <UInput :model-value="state?.detail?.namaAyah" disabled />
          </UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Anak Ke">
              <UInput :model-value="state?.detail?.anakKe" disabled />
            </UFormField>
            <UFormField label="Dari Bersaudara">
              <UInput :model-value="state?.detail?.dariBersaudara" disabled />
            </UFormField>
          </div>
          <UFormField label="Provinsi">
            <UInput :model-value="state?.detail?.provinsi" disabled />
          </UFormField>
          <UFormField label="Kabupaten / Kota">
            <UInput :model-value="state?.detail?.kota" disabled />
          </UFormField>
          <UFormField label="Kecamatan">
            <UInput :model-value="state?.detail?.kecamatan" disabled />
          </UFormField>
          <UFormField label="Kelurahan / Desa">
            <UInput :model-value="state?.detail?.kelurahan" disabled />
          </UFormField>
          <UFormField label="Suku">
            <UInput :model-value="state?.detail?.suku" disabled />
          </UFormField>
          <UFormField label="Pendidikan Terakhir">
            <UInput :model-value="state?.detail?.pendidikan" disabled />
          </UFormField>
          <UFormField label="Jurusan">
            <UInput :model-value="state?.detail?.jurusan" disabled />
          </UFormField>
          <UFormField label="Pekerjaan">
            <UInput :model-value="state?.detail?.pekerjaan" disabled />
          </UFormField>
          <UFormField label="Gaji Per Bulan">
            <UInput :model-value="state?.detail?.gaji" disabled />
          </UFormField>
          <UFormField label="Tinggi Badan">
            <UInput :model-value="state?.detail?.tinggi" disabled />
          </UFormField>
          <UFormField label="Berat Badan">
            <UInput :model-value="state?.detail?.berat" disabled />
          </UFormField>
          <UFormField label="Perokok">
            <UInput
              :model-value="state?.detail?.perokok ? 'Iya' : 'Tidak'"
              disabled
            />
          </UFormField>
          <UFormField label="Hobi">
            <UTextarea :model-value="state?.detail?.hobi" disabled />
          </UFormField>
          <UFormField label="Deskripsi Singkat">
            <UTextarea :model-value="state?.detail?.deskripsi" disabled />
          </UFormField>
          <UFormField label="Instagram">
            <UTextarea :model-value="state?.detail?.instagram" disabled />
          </UFormField>
          <UFormField label="Kriteria">
            <UTextarea :model-value="state?.detail?.kriteria" disabled />
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
