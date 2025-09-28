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
    await authStore.signIn(event.data);
  }
</script>

<template>
  <Title>Login</Title>
  <main class="flex w-full items-center justify-center">
    <UCard class="w-full max-w-md">
      <div class="space-y-6">
        <div class="flex flex-col items-center text-center">
          <NuxtLink href="/">
            <NuxtImg src="/logo.webp" width="150" height="150" alt="logo ppg" />
          </NuxtLink>
          <div class="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Selamat Datang
          </div>
          <div class="mt-1 text-gray-500 dark:text-gray-400">
            Belum punya akun?
            <NuxtLink
              no-prefetch
              to="/register"
              class="text-primary font-medium"
            >
              Daftar.
            </NuxtLink>
          </div>
        </div>
        <UForm
          :schema="loginSchema"
          :state="state"
          class="w-full space-y-6"
          @submit="onSubmit"
        >
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

          <UCheckbox v-model="state.rememberMe" label="Ingat saya" />

          <UButton
            class="flex w-full justify-center"
            type="submit"
            :loading="authStore.loading"
          >
            Lanjut
          </UButton>
        </UForm>
      </div>
    </UCard>
  </main>
</template>
