<script setup lang="ts">
  const { isLoading = false } = defineProps<{
    isLoading: boolean;
  }>();
  const file = defineModel<File>();
  const imageUrl = ref<string>();
  function uploadFile(event: any) {
    file.value = event.target.files[0];
    if (file.value && file.value.type.startsWith("image/")) {
      if (imageUrl.value) {
        URL.revokeObjectURL(imageUrl.value);
      }
      imageUrl.value = URL.createObjectURL(file.value);
    } else {
      imageUrl.value = undefined;
    }
  }
</script>

<template>
  <UInput
    type="file"
    accept="image/*"
    :disabled="isLoading"
    @change="uploadFile"
  />
  <div class="flex gap-2 mt-2 items-center">
    <div v-if="foto">
      <img class="" :src="state.foto" alt="Preview" style="max-width: 300px" />
    </div>
    <div v-if="state.foto && imageUrl">-></div>
    <div v-if="imageUrl">
      <img class="" :src="imageUrl" alt="Preview" style="max-width: 300px" />
    </div>
  </div>
</template>
