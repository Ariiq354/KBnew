<script setup lang="ts">
  import { z } from "zod/mini";
  import type { FormSubmitEvent } from "#ui/types";
  import { useAuthStore } from "~/stores/auth";

  const authStore = useAuthStore();

  const modalOpen = defineModel<boolean>();
  const schema = z.object({
    name: z.optional(z.string()),
    noTelepon: z.optional(z.string()),
  });
  const initialFormData = (): Schema => ({
    name: authStore.user?.name,
    noTelepon: authStore.user?.noTelepon,
  });
  const state = ref(initialFormData());

  whenever(modalOpen, () => {
    state.value = initialFormData();
  });

  type Schema = z.infer<typeof schema>;

  const modalLoading = ref(false);
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    await authStore.updateUser(event.data);
  }
</script>

<template>
  <UModal v-model:open="modalOpen" title="Profil Anda">
    <template #body>
      <UForm
        id="modal-profile"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <div class="flex gap-4">
          <div class="flex w-full flex-col gap-4">
            <UFormField label="Email">
              <UInput :model-value="authStore.user?.email" disabled />
            </UFormField>
            <UFormField label="No Telepon" name="noTelepon">
              <UInput v-model="state.noTelepon" :disabled="modalLoading" />
            </UFormField>

            <UFormField label="Nama Lengkap" name="name">
              <UInput v-model="state.name" :disabled="modalLoading" />
            </UFormField>
          </div>
        </div>
      </UForm>
    </template>
    <template #footer>
      <UButton
        icon="i-heroicons-x-mark-16-solid"
        variant="ghost"
        :disabled="modalLoading"
        @click="modalOpen = false"
      >
        Batal
      </UButton>
      <UButton
        type="submit"
        form="modal-profile"
        icon="i-heroicons-check-16-solid"
        :loading="modalLoading"
      >
        Simpan
      </UButton>
    </template>
  </UModal>
</template>
