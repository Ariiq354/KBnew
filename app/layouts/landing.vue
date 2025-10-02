<script setup lang="ts">
  const color = useColorMode();

  onMounted(() => {
    color.preference = "light";
  });
</script>

<template>
  <div id="landingWrapper">
    <LandingNavbar />
    <slot />
    <LandingFooter />
  </div>
</template>
