<script setup lang="ts">
  import { columns } from "./_constants";

  const constantStore = useConstantStore();
  constantStore.setTitle("Dashboard / List Taaruf");

  const query = reactive({
    search: "",
    page: 1,
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status } = await useFetch(`${APIBASE}/taaruf`, {
    query,
  });

  const modalStateDituju =
    ref<ExtractObjectType<typeof data.value>["dituju"]>();
  const modalStatePenuju =
    ref<ExtractObjectType<typeof data.value>["dituju"]>();

  const modalOpen = ref();
  function clickUpdate(itemData: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    modalStateDituju.value = itemData.dituju;
    modalStatePenuju.value = itemData.penuju;
  }
</script>

<template>
  <Title>Dashboard | List Taaruf</Title>
  <main>
    <UModal v-model:open="modalOpen" title="Detail Member" fullscreen>
      <template #body>
        <div class="flex gap-12">
          <div>
            <div class="flex gap-4">
              <div
                class="flex aspect-square w-32 items-center justify-center bg-gray-300"
              >
                <NuxtImg :src="modalStateDituju?.foto!" />
              </div>
              <div class="flex flex-col justify-center">
                <h1 class="text-lg font-bold">
                  {{ modalStateDituju?.namaAnggota }}
                </h1>
                <h2 class="text-primary">{{ modalStateDituju?.deskripsi }}</h2>
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
                    {{ modalStateDituju?.statusKawin }}
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
                    {{ modalStateDituju?.tanggalLahir }}
                  </h2>
                </div>
              </div>
            </div>

            <table class="mt-12 w-full text-sm">
              <tbody>
                <tr>
                  <td class="py-2 font-bold whitespace-nowrap">Nama Ayah:</td>
                  <td class="text-primary text-right capitalize">
                    {{ modalStateDituju?.namaAyah }}
                  </td>
                </tr>
                <tr>
                  <td class="py-2 font-bold">Suku:</td>
                  <td class="text-primary text-right capitalize">
                    {{ modalStateDituju?.suku }}
                  </td>
                </tr>
                <tr>
                  <td class="py-2 font-bold">Pendidikan:</td>
                  <td class="text-primary text-right capitalize">
                    {{ modalStateDituju?.pendidikan }}
                  </td>
                </tr>
                <tr>
                  <td class="py-2 font-bold">Pekerjaan:</td>
                  <td class="text-primary text-right capitalize">
                    {{ modalStateDituju?.pekerjaan }}
                  </td>
                </tr>
                <tr>
                  <td class="py-2 font-bold">TB / BB:</td>
                  <td class="text-primary text-right">
                    {{ modalStateDituju?.tinggi + " cm" }} /
                    {{ modalStateDituju?.berat + " kg" }}
                  </td>
                </tr>
                <tr>
                  <td class="py-2 font-bold">Hobi:</td>
                  <td class="text-primary text-right capitalize">
                    {{ modalStateDituju?.hobi }}
                  </td>
                </tr>
                <tr>
                  <td class="py-2 font-bold">Daerah:</td>
                  <td class="text-primary text-right">
                    {{ modalStateDituju?.provinsi }} /
                    {{ modalStateDituju?.kota }} /
                    {{ modalStateDituju?.kecamatan }} /
                    {{ modalStateDituju?.kelurahan }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <div class="flex gap-4">
              <div
                class="flex aspect-square w-32 items-center justify-center bg-gray-300"
              >
                <NuxtImg :src="modalStatePenuju?.foto!" />
              </div>
              <div class="flex flex-col justify-center">
                <h1 class="text-lg font-bold">
                  {{ modalStatePenuju?.namaAnggota }}
                </h1>
                <h2 class="text-primary">{{ modalStatePenuju?.deskripsi }}</h2>
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
                    {{ modalStatePenuju?.statusKawin }}
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
                    {{ modalStatePenuju?.tanggalLahir }}
                  </h2>
                </div>
              </div>
            </div>

            <table class="mt-12 w-full text-sm">
              <tbody>
                <tr>
                  <td class="py-2 font-bold whitespace-nowrap">Nama Ayah:</td>
                  <td class="text-primary text-right capitalize">
                    {{ modalStatePenuju?.namaAyah }}
                  </td>
                </tr>
                <tr>
                  <td class="py-2 font-bold">Suku:</td>
                  <td class="text-primary text-right capitalize">
                    {{ modalStatePenuju?.suku }}
                  </td>
                </tr>
                <tr>
                  <td class="py-2 font-bold">Pendidikan:</td>
                  <td class="text-primary text-right capitalize">
                    {{ modalStatePenuju?.pendidikan }}
                  </td>
                </tr>
                <tr>
                  <td class="py-2 font-bold">Pekerjaan:</td>
                  <td class="text-primary text-right capitalize">
                    {{ modalStatePenuju?.pekerjaan }}
                  </td>
                </tr>
                <tr>
                  <td class="py-2 font-bold">TB / BB:</td>
                  <td class="text-primary text-right">
                    {{ modalStatePenuju?.tinggi + " cm" }} /
                    {{ modalStatePenuju?.berat + " kg" }}
                  </td>
                </tr>
                <tr>
                  <td class="py-2 font-bold">Hobi:</td>
                  <td class="text-primary text-right capitalize">
                    {{ modalStatePenuju?.hobi }}
                  </td>
                </tr>
                <tr>
                  <td class="py-2 font-bold">Daerah:</td>
                  <td class="text-primary text-right">
                    {{ modalStatePenuju?.provinsi }} /
                    {{ modalStatePenuju?.kota }} /
                    {{ modalStatePenuju?.kecamatan }} /
                    {{ modalStatePenuju?.kelurahan }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex w-full justify-end gap-2">
          <UButton variant="soft" @click="modalOpen = false"> Tutup </UButton>
        </div>
      </template>
    </UModal>
    <UCard>
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
