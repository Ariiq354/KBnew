<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import {
    genderOptions,
    getInitialFormData,
    schema,
    statusKawinOptions,
    type Schema,
  } from "./_constants";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  constantStore.setTitle("Profil");

  const { data } = useFetch(`${APIBASE}/anggota/current`);
  const state = ref(getInitialFormData());
  if (data.value?.data?.detail) {
    state.value = data.value.data?.detail;
  }

  const isLoading = ref(false);
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    isLoading.value = true;
    try {
      await $fetch(`${APIBASE}/anggota/current`, {
        method: "POST",
        body: event.data,
      });

      useToastSuccess(
        "Pengisian Data Diri Berhasil",
        "Selamat datang di Keluarga Bahagia"
      );
    } catch (error: any) {
      useToastError(String(error.statusCode), error.data.message);
    } finally {
      isLoading.value = false;
    }
  }
</script>

<template>
  <Title>Daftar Diri</Title>
  <main>
    <UCard v-if="!data?.data?.detail">
      <div class="flex items-center gap-4">
        <UIcon name="i-heroicons-information-circle" size="30" /> Lengkapi data
        diri anda sebelum memulai taaruf
      </div>
    </UCard>
    <UCard class="mt-4">
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <h1 class="font-bold">Data Diri</h1>
        <UFormField label="Upload Foto diri" name="foto">
          <ImageUpload
            :disabled="false"
            :url="state.foto ? state.foto : ''"
            @change="(url) => (state.foto = url)"
            @remove="() => (state.foto = '')"
          />
        </UFormField>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <UFormField label="Nama Lengkap">
            <UInput :model-value="user?.namaLengkap" disabled />
          </UFormField>
          <UFormField label="Jenis Kelamin" name="gender">
            <USelectMenu
              v-model="state.gender"
              :disabled="isLoading"
              :items="genderOptions"
              label-key="name"
              value-key="value"
            />
          </UFormField>
          <UFormField label="No. Telepon">
            <UInput :model-value="user?.noTelepon" disabled />
          </UFormField>
          <UFormField label="Status Kawin" name="statusKawin">
            <USelectMenu
              v-model="state.statusKawin"
              :items="statusKawinOptions"
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
              :items="dataProvinsi ? dataProvinsi.result : []"
              :disabled="isLoading"
              label-key="text"
              value-key="id"
              searchable
              @change="provinsiId = state.provinsi"
            />
          </UFormField>
          <UFormField label="Kabupaten / Kota" name="kota">
            <USelectMenu
              v-model="state.kota"
              :items="dataKota ? dataKota.result : []"
              :disabled="isLoading"
              label-key="text"
              value-key="id"
              searchable
              @change="kotaId = state.kota"
            />
          </UFormField>
          <UFormField label="Kecamatan" name="kecamatan">
            <USelectMenu
              v-model="state.kecamatan"
              :items="dataKecamatan ? dataKecamatan.result : []"
              :disabled="isLoading"
              label-key="text"
              value-key="id"
              searchable
              @change="kecamatanId = state.kecamatan"
            />
          </UFormField>
          <UFormField label="Kelurahan / Desa" name="kelurahan">
            <USelectMenu
              v-model="state.kelurahan"
              :items="dataKelurahan ? dataKelurahan.result : []"
              :disabled="isLoading"
              label-key="text"
              value-key="id"
              searchable
            />
          </UFormField>
          <UFormField label="Suku" name="suku">
            <USelectMenu
              v-model="state.suku"
              :items="dataSuku"
              :disabled="isLoading"
              label-key="name"
              value-key="name"
              searchable
            />
          </UFormField>
          <UFormField label="Pendidikan Terakhir" name="pendidikan">
            <USelectMenu
              v-model="state.pendidikan"
              :items="dataPendidikan"
              :disabled="isLoading"
              label-key="name"
              value-key="name"
              searchable
            />
          </UFormField>
          <UFormField label="Jurusan" name="jurusan">
            <USelectMenu
              v-model="state.jurusan"
              :items="dataJurusan"
              :disabled="isLoading"
              label-key="name"
              value-key="name"
              searchable
            />
          </UFormField>
          <UFormField label="Pekerjaan" name="pekerjaan">
            <USelectMenu
              v-model="state.pekerjaan"
              :items="dataPekerjaan"
              :disabled="isLoading"
              label-key="name"
              value-key="name"
              searchable
            />
          </UFormField>
          <UFormField label="Tinggi Badan" name="tinggi">
            <UInput
              v-model="state.tinggi"
              type="number"
              :disabled="isLoading"
            />
          </UFormField>
          <UFormField label="Berat Badan" name="berat">
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

        <div class="flex w-full justify-end gap-2">
          <UButton
            type="submit"
            icon="i-heroicons-check-16-solid"
            :loading="isLoading"
          >
            Simpan
          </UButton>
        </div>
      </UForm>
    </UCard>
    <UCard class="mt-4">
      <UForm
        :schema="resetSchema"
        :state="resetState"
        class="space-y-4"
        @submit="onSubmitReset"
      >
        <h1 class="font-bold">Reset Password</h1>
        <UFormField label="Password Baru" name="password">
          <UInput
            v-model="resetState.password"
            type="password"
            :disabled="isLoading"
          />
        </UFormField>

        <div class="flex w-full justify-end gap-2">
          <UButton
            type="submit"
            icon="i-heroicons-check-16-solid"
            :loading="isLoading"
          >
            Simpan
          </UButton>
        </div>
      </UForm>
    </UCard>
  </main>
</template>
