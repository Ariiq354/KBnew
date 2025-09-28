<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { useAuthStore } from "~/stores/auth";
  import { initFormData, loginSchema } from "./_constants";
  import type { Schema } from "./_constants";

  definePageMeta({
    layout: "auth",
  });

  const authStore = useAuthStore();

  const state = ref(initFormData);

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    await authStore.signUp(event.data);
  }
</script>

<template>
  <Title>Login</Title>
  <main class="flex w-full items-center justify-center">
    <UCard class="w-full max-w-md">
      <div class="space-y-6">
        <div class="flex flex-col items-center text-center">
          <NuxtImg src="/logo.webp" width="130" alt="logo" class="m-8" />
          <div
            class="text-primary-500 dark:text-primary-400 text-2xl font-bold tracking-widest"
          >
            KELUARGA
            <span class="text-black dark:text-white">BAHAGIA</span>
          </div>
          <div class="mt-2 text-center">
            Sudah Punya Akun?
            <NuxtLink href="/login" class="text-primary"> Login! </NuxtLink>
          </div>
        </div>
        <UForm
          :schema="loginSchema"
          :state="state"
          class="w-full space-y-6"
          @submit="onSubmit"
        >
          <UFormField label="Nama Lengkap" name="name">
            <UInput
              v-model="state.name"
              icon="i-lucide-user"
              placeholder="Nama Lengkap"
            />
          </UFormField>
          <UFormField label="No Telepon" name="noTelepon">
            <UInput
              v-model="state.noTelepon"
              icon="i-lucide-phone"
              placeholder="81XXX"
            />
          </UFormField>
          <UFormField label="Email" name="email">
            <UInput
              v-model="state.email"
              icon="i-lucide-mail"
              placeholder="Email"
            />
          </UFormField>
          <UFormField label="Password" name="password">
            <InputPassword
              v-model="state.password"
              :disabled="authStore.loading"
              icon="i-lucide-lock"
              placeholder="Password"
            />
          </UFormField>

          <UButton
            class="flex w-full justify-center"
            type="submit"
            :loading="authStore.loading"
          >
            Daftar
          </UButton>
        </UForm>
      </div>
    </UCard>
  </main>
</template>
