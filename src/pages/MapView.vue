<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

let map: L.Map | null = null;

onMounted(() => {
  map = L.map('map', {
    zoomControl: true,
    attributionControl: true,
  }).setView([0, 0], 2);

  const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors',
  });
  tiles.addTo(map);

  // Ensure proper sizing after mount
  setTimeout(() => map?.invalidateSize(), 0);
});

onBeforeUnmount(() => {
  map?.remove();
  map = null;
});
</script>

<template>
  <div class="relative h-full w-full">
    <div id="map" class="absolute inset-0"></div>
  </div>
</template>

<style scoped>
/* Greyscale tiles for the map */
.leaflet-tile {
  filter: grayscale(100%);
}
</style>
