<script setup lang="ts">
  import { z } from "zod/v4-mini";
  import id from "zod/v4/locales/id.js";

  z.config(id());

  useSeoMeta({
    description: "Keluarga Bahagia",
  });

  useHead({
    htmlAttrs: {
      lang: "id",
    },
  });
</script>

<template>
  <div class="min-h-screen bg-gray-100 font-sans dark:bg-black">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator :height="5" />
    <UApp>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>
