<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import {
    genderOptions,
    getInitialFormData,
    pendidikanOptions,
    schema,
    statusKawinOptions,
  } from "./_constants";
  import type { Schema } from "./_constants";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  constantStore.setTitle("Dashboard / Profil");

  const { data } = await useFetch(`${APIBASE}/anggota/current`);
  const state = ref(getInitialFormData());

  watchEffect(() => {
    if (data.value?.data?.detail) {
      state.value = data.value.data?.detail;
    }
  });

  const {
    dataKabupaten,
    dataKecamatan,
    dataKelurahan,
    dataProvinsi,
    statusKabupaten,
    statusKecamatan,
    statusKelurahan,
    statusProvinsi,
  } = useWilayahOptions(state);

  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const formData = new FormData();

    for (const key in event.data) {
      formData.append(key, (event.data as any)[key]);
    }

    if (file.value) {
      formData.append("file", file.value);
    }

    await execute({
      path: `${APIBASE}/anggota/current`,
      body: formData,
      method: "POST",
      onSuccess() {
        useToastSuccess("Update Sukses", "Profil anda sudah di update");
        reloadNuxtApp({ force: true });
      },
      onError(error) {
        useToastError("Submit Failed", error.data.message);
      },
    });
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
  <Title>Profil</Title>
  <main>
    <UCard v-if="!data?.data?.detail">
      <div class="flex items-center gap-4">
        <UIcon name="i-heroicons-information-circle" size="30" /> Lengkapi data
        diri anda sebelum memulai taaruf
      </div>
    </UCard>
    <UCard class="mt-4">
      <template #header>
        <h1 class="font-bold">Profil Anda</h1>
      </template>
      <UForm
        id="form-profil"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Foto diri" name="foto">
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
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <UFormField label="Nama Lengkap">
            <UInput :model-value="authStore.user?.name" disabled />
          </UFormField>
          <UFormField label="Jenis Kelamin" name="gender">
            <USelectMenu
              v-model="state.gender"
              placeholder="Select Jenis Kelamin"
              :disabled="isLoading"
              :items="genderOptions"
              label-key="name"
              value-key="value"
            />
          </UFormField>
          <UFormField label="No. Telepon">
            <UInput :model-value="authStore.user?.noTelepon" disabled />
          </UFormField>
          <UFormField label="Status Kawin" name="statusKawin">
            <USelectMenu
              v-model="state.statusKawin"
              placeholder="Select Status Kawin"
              :items="statusKawinOptions"
              value-key="name"
              label-key="name"
              :disabled="isLoading"
            />
          </UFormField>
          <UFormField label="Tanggal Lahir" name="tanggalLahir">
            <UInput
              v-model="state.tanggalLahir"
              type="date"
              :disabled="isLoading"
            />
          </UFormField>

          <UFormField label="Nama Ayah" name="namaAyah">
            <UInput v-model="state.namaAyah" :disabled="isLoading" />
          </UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Anak Ke" name="anakKe">
              <UInput
                v-model="state.anakKe"
                type="number"
                :disabled="isLoading"
              />
            </UFormField>
            <UFormField label="Dari Bersaudara" name="dariBersaudara">
              <UInput
                v-model="state.dariBersaudara"
                type="number"
                :disabled="isLoading"
              />
            </UFormField>
          </div>
          <UFormField label="Provinsi" name="provinsi">
            <USelectMenu
              v-model="state.provinsi"
              placeholder="Select Provinsi"
              :items="dataProvinsi?.data"
              value-key="name"
              label-key="name"
              :loading="statusProvinsi === 'pending'"
              :disabled="isLoading"
            />
          </UFormField>
          <UFormField label="Kabupaten / Kota" name="kota">
            <USelectMenu
              v-model="state.kota"
              placeholder="Select Kabupaten / Kota"
              :items="dataKabupaten?.data"
              value-key="name"
              label-key="name"
              :loading="statusKabupaten === 'pending'"
              :disabled="isLoading"
            />
          </UFormField>
          <UFormField label="Kecamatan" name="kecamatan">
            <USelectMenu
              v-model="state.kecamatan"
              placeholder="Select Kecamatan"
              :items="dataKecamatan?.data"
              value-key="name"
              label-key="name"
              :loading="statusKecamatan === 'pending'"
              :disabled="isLoading"
            />
          </UFormField>
          <UFormField label="Kelurahan / Desa" name="kelurahan">
            <USelectMenu
              v-model="state.kelurahan"
              placeholder="Select Kelurahan / Desa"
              :items="dataKelurahan?.data"
              value-key="name"
              label-key="name"
              :loading="statusKelurahan === 'pending'"
              :disabled="isLoading"
            />
          </UFormField>
          <UFormField label="Suku" name="suku">
            <UInput v-model="state.suku" :disabled="isLoading" />
          </UFormField>
          <UFormField label="Pendidikan Terakhir" name="pendidikan">
            <USelectMenu
              v-model="state.pendidikan"
              placeholder="Select Pendidikan"
              value-key="name"
              label-key="name"
              :items="pendidikanOptions"
              :disabled="isLoading"
            />
          </UFormField>
          <UFormField label="Jurusan" name="jurusan">
            <UInput v-model="state.jurusan" :disabled="isLoading" />
          </UFormField>
          <UFormField label="Pekerjaan" name="pekerjaan">
            <UInput v-model="state.pekerjaan" :disabled="isLoading" />
          </UFormField>
          <UFormField label="Tinggi Badan (cm)" name="tinggi">
            <UInput
              v-model="state.tinggi"
              type="number"
              :disabled="isLoading"
            />
          </UFormField>
          <UFormField label="Berat Badan (kg)" name="berat">
            <UInput v-model="state.berat" type="number" :disabled="isLoading" />
          </UFormField>
          <UFormField label="Hobi" name="hobi">
            <UInput v-model="state.hobi" :disabled="isLoading" />
          </UFormField>
          <UFormField label="Deskripsi Singkat Diri Anda" name="deskripsi">
            <UInput v-model="state.deskripsi" :disabled="isLoading" />
          </UFormField>
          <UFormField label="Alamat Instagram" name="instagram">
            <UInput v-model="state.instagram" :disabled="isLoading" />
          </UFormField>
          <UFormField label="Kriteria Pasangan" name="kriteria">
            <UTextarea
              v-model="state.kriteria"
              :rows="5"
              :disabled="isLoading"
            />
          </UFormField>
        </div>
      </UForm>
      <template #footer>
        <div class="flex w-full justify-end gap-2">
          <UButton
            type="submit"
            form="form-profil"
            icon="i-heroicons-check-16-solid"
            :loading="isLoading"
          >
            Simpan
          </UButton>
        </div>
      </template>
    </UCard>
  </main>
</template>
