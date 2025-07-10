<script setup lang="ts">
  useHead({
    htmlAttrs: {
      class: "layout-small",
    },
  });
</script>

<template>
  <div class="flex min-h-screen items-center justify-center p-4">
    <slot />
  </div>
</template>
