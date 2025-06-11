<script setup lang="ts">
  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  constantStore.setTitle("Member");

  const { data } = useFetch(`${APIBASE}/anggota/pasangan`);

  const modalState = ref<ExtractObjectType<typeof data.value>>();
  const modalOpen = ref(false);

  function handleClick(id: number) {
    modalState.value = data.value?.data.find((item) => item.id === id);
    modalOpen.value = true;
  }

  // const isLoading = ref(false);
  // async function handleSubmit(id: number) {
  //   isLoading.value = true;
  //   try {
  //     await $fetch("/api/taaruf", {
  //       method: "POST",
  //       body: {
  //         pemohonId: user.value?.id,
  //         tujuanId: id,
  //       },
  //     });
  //     modalOpen.value = false;
  //     useToastSuccess("Permohonan Berhasil", "Proses akan segera diurus admin");
  //   } catch (error: any) {
  //     useToastError(String(error.statusCode), error.data.message);
  //   } finally {
  //     isLoading.value = false;
  //   }
  // }
</script>

<template>
  <Title>Pencarian Member</Title>
  <main>
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
          <!-- <UButton
                :disabled="
                  isLoading ||
                  dataTaaruf?.some((item) => item.tujuanId === modalState?.id)
                "
                @click="handleSubmit(modalState!.id)"
              >
                Ajukan Taaruf
              </UButton> -->
        </div>
      </template>
    </UModal>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <UCard v-for="(item, index) in data?.data" :key="index">
        <div class="flex flex-col">
          <div class="flex gap-4">
            <div>
              <div
                class="flex aspect-square w-32 items-center justify-center overflow-hidden bg-gray-300 dark:bg-gray-700"
              >
                <NuxtImg :src="item.foto!" />
              </div>
              <p
                class="bg-eastern-blue-100 mt-4 rounded-md p-2 text-center text-lg font-bold shadow-lg"
              >
                {{ item.kodeUser }}
              </p>
            </div>
            <div class="flex flex-col justify-center">
              <h1 class="text-lg font-bold">{{ item.namaAnggota }}</h1>
              <h2 class="text-primary">{{ item.deskripsi }}</h2>
            </div>
          </div>
          <div class="mt-4">
            <table class="w-full">
              <tbody>
                <tr class="border-y border-gray-200 dark:border-gray-700">
                  <td>Status</td>
                  <td>:</td>
                  <td class="py-2 pl-4">{{ item.statusKawin }}</td>
                </tr>
                <tr class="border-y border-gray-200 dark:border-gray-700">
                  <td>Tanggal Lahir</td>
                  <td>:</td>
                  <td class="py-2 pl-4">{{ item.tanggalLahir }}</td>
                </tr>
                <tr class="border-y border-gray-200 dark:border-gray-700">
                  <td>Suku</td>
                  <td>:</td>
                  <td class="py-2 pl-4">{{ item.suku }}</td>
                </tr>
                <tr class="border-y border-gray-200 dark:border-gray-700">
                  <td>Pendidikan</td>
                  <td>:</td>
                  <td class="py-2 pl-4">{{ item.pendidikan }}</td>
                </tr>
                <tr class="border-y border-gray-200 dark:border-gray-700">
                  <td>Pekerjaan</td>
                  <td>:</td>
                  <td class="py-2 pl-4">{{ item.pekerjaan }}</td>
                </tr>
                <tr class="border-y border-gray-200 dark:border-gray-700">
                  <td>TB / BB</td>
                  <td>:</td>
                  <td class="py-2 pl-4">
                    {{ item.tinggi + " cm" }} / {{ item.berat + " kg" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <UButton
            variant="soft"
            class="mt-12 flex w-full justify-center"
            @click="handleClick(item.id)"
          >
            Lihat Detail
          </UButton>
        </div>
      </UCard>
    </div>
  </main>
</template>
