<script setup lang="ts">
  import { ref } from "vue";
  import { GoogleMap, AdvancedMarker } from "vue3-google-map";

  const emit = defineEmits<{
    (e: "picked", link: string): void;
  }>();
  const props = defineProps<{
    url?: string;
  }>();

  onMounted(() => {
    if (props.url) {
      const coords = getLatLngFromGoogleMapsUrl(props.url);
      if (coords) {
        center.value = coords;
        marker.value = coords;
      }
    }
  });

  const center = ref({ lat: -6.2, lng: 106.816666 });

  const marker = ref<{ lat: number; lng: number } | null>(null);

  function onMapClick(e: any) {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      marker.value = { lat, lng };
      const link = `https://www.google.com/maps?q=${lat},${lng}`;
      emit("picked", link);
    }
  }

  function getLatLngFromGoogleMapsUrl(url: string) {
    const match = url.match(/q=(-?\d+(\.\d+)?),(-?\d+(\.\d+)?)/);
    if (!match) {
      throw new Error("Invalid Google Maps URL");
    }
    return {
      lat: parseFloat(match[1]!),
      lng: parseFloat(match[3]!),
    };
  }
</script>

<template>
  <div class="h-[400px] w-full rounded-md">
    <GoogleMap
      api-key="AIzaSyDcJTgmnxZFsV4ar-qu-bpQLjmoDIhWJvI"
      map-id="my-map"
      :center="center"
      :zoom="14"
      style="width: 100%; height: 100%"
      class="overflow-hidden rounded-md"
      @click="onMapClick"
    >
      <AdvancedMarker v-if="marker" :options="{ position: marker }" />
    </GoogleMap>
  </div>
</template>
