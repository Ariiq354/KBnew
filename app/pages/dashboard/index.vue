<script setup lang="ts">
  const authStore = useAuthStore();
</script>

<template>
  ini dashbaord <button @click="authStore.signOut()">Signout</button>
</template>
