<script setup lang="ts">
  import { columns, columnsPenuju } from "./_constants";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  constantStore.setTitle("Dashboard / Pengajuan Taaruf");

  const query = reactive({
    page: 1,
  });
  const { data, status } = await useFetch(`${APIBASE}/taaruf/user`, {
    query,
  });

  const dataDituju = computed(() =>
    data.value?.data.filter(
      (item) => item.idPenuju === Number(authStore.session!.data!.user.id),
    ),
  );

  const dataPenuju = computed(() =>
    data.value?.data.filter(
      (item) => item.idDituju === Number(authStore.session!.data!.user.id),
    ),
  );

  const modalState = ref<ExtractObjectType<typeof data.value>["dituju"]>();

  const modalOpen = ref();
  function clickUpdate(itemData: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    modalState.value = itemData.dituju;
  }
</script>

<template>
  <Title>Dashboard | Pengajuan</Title>
  <main class="flex flex-col gap-4">
    <UModal v-model:open="modalOpen" title="Detail Member">
      <template #body>
        <div class="flex gap-4">
          <div
            class="flex aspect-square w-32 items-center justify-center bg-gray-300"
          >
            <NuxtImg :src="modalState?.foto!" />
          </div>
          <div class="flex flex-col justify-center">
            <h1 class="text-lg font-bold">{{ modalState?.namaAnggota }}</h1>
            <h2 class="text-primary">{{ modalState?.deskripsi }}</h2>
          </div>
        </div>

        <div class="mt-6 flex gap-12">
          <div class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-information-circle"
              size="40"
              class="text-primary"
            />
            <div class="flex flex-col">
              <h1 class="text-primary">Status</h1>
              <h2 class="font-bold">
                {{ modalState?.statusKawin }}
              </h2>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-calendar-date-range"
              size="40"
              class="text-primary"
            />
            <div class="flex flex-col">
              <h1 class="text-primary">Tanggal Lahir</h1>
              <h2 class="font-bold">
                {{ modalState?.tanggalLahir }}
              </h2>
            </div>
          </div>
        </div>

        <table class="mt-12 w-full text-sm">
          <tbody>
            <tr>
              <td class="py-2 font-bold whitespace-nowrap">Nama Ayah:</td>
              <td class="text-primary text-right capitalize">
                {{ modalState?.namaAyah }}
              </td>
            </tr>
            <tr>
              <td class="py-2 font-bold">Suku:</td>
              <td class="text-primary text-right capitalize">
                {{ modalState?.suku }}
              </td>
            </tr>
            <tr>
              <td class="py-2 font-bold">Pendidikan:</td>
              <td class="text-primary text-right capitalize">
                {{ modalState?.pendidikan }}
              </td>
            </tr>
            <tr>
              <td class="py-2 font-bold">Pekerjaan:</td>
              <td class="text-primary text-right capitalize">
                {{ modalState?.pekerjaan }}
              </td>
            </tr>
            <tr>
              <td class="py-2 font-bold">TB / BB:</td>
              <td class="text-primary text-right">
                {{ modalState?.tinggi + " cm" }} /
                {{ modalState?.berat + " kg" }}
              </td>
            </tr>
            <tr>
              <td class="py-2 font-bold">Hobi:</td>
              <td class="text-primary text-right capitalize">
                {{ modalState?.hobi }}
              </td>
            </tr>
            <tr>
              <td class="py-2 font-bold">Daerah:</td>
              <td class="text-primary text-right">
                {{ modalState?.provinsi }} / {{ modalState?.kota }} /
                {{ modalState?.kecamatan }} /
                {{ modalState?.kelurahan }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-12 text-purple-900 dark:text-purple-200">
          <h1 class="font-bold">Kriteria Pasangan</h1>
          <p class="mt-2 text-sm">
            {{ modalState?.kriteria }}
          </p>
        </div>
      </template>
      <template #footer>
        <div class="flex w-full justify-end gap-2">
          <UButton variant="soft" @click="modalOpen = false"> Tutup </UButton>
        </div>
      </template>
    </UModal>
    <UCard class="w-full">
      <div
        class="flex justify-between border-b border-(--ui-border-accented) py-3.5"
      >
        <h1 class="font-bold">Tabel Dituju</h1>
      </div>
      <AppTable
        v-model:page="query.page"
        :columns="columns"
        :data="dataDituju"
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
    <UCard class="w-full">
      <div
        class="flex justify-between border-b border-(--ui-border-accented) py-3.5"
      >
        <h1 class="font-bold">Tabel Penuju</h1>
      </div>
      <AppTable
        v-model:page="query.page"
        :columns="columnsPenuju"
        :data="dataPenuju"
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
