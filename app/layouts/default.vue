<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  useHead({
    htmlAttrs: {
      class: "layout-small",
    },
  });
</script>

<template>
  <section class="flex">
    <AppSidebar />
    <div
      class="flex flex-1 flex-col overflow-auto p-4 pb-24 transition-all duration-200 md:p-8 md:pb-0"
      :class="{ 'md:ml-72': constantStore.sidebarShow }"
    >
      <AppTopbar />
      <slot />
    </div>
  </section>
</template>
