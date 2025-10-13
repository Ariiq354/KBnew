<script setup lang="ts">
  import {
    MglMap,
    MglNavigationControl,
    MglMarker,
  } from "@indoorequal/vue-maplibre-gl";
  import type { LngLatLike } from "maplibre-gl";
  import "maplibre-gl/dist/maplibre-gl.css";

  const style = "https://tiles.openfreemap.org/styles/bright";
  const zoom = 12;
  const center = [106.83629, -6.175254] as LngLatLike;

  const markerPosition = defineModel<string | null>();

  const coords = computed(() =>
    markerPosition.value
      ? (markerPosition.value.split(",").map(Number) as LngLatLike)
      : null,
  );

  function onMapClick(e: any) {
    markerPosition.value =
      String(e.event.lngLat.lng) + "," + String(e.event.lngLat.lat);
  }
</script>

<template>
  <ClientOnly>
    <MglMap
      :map-style="style"
      :zoom="zoom"
      :center="center"
      width="100%"
      height="400px"
      @map:click="onMapClick"
    >
      <MglNavigationControl @map:click="onMapClick" />
      <MglMarker v-if="coords" :coordinates="coords" color="#cc0000" />
    </MglMap>
  </ClientOnly>
</template>
