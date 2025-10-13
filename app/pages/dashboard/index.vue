<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Dashboard");
</script>

<template>
  <div>Hello Dashboard</div>
</template>
