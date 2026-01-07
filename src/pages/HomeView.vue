<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMemoryStore } from '@/stores';
import dayjs from 'dayjs';
import { Geolocation } from '@capacitor/geolocation';

const memoryStore = useMemoryStore();

const loading = ref(false);
const error = ref<string | null>(null);
const latitude = ref<number | null>(null);
const longitude = ref<number | null>(null);
const accuracy = ref<number | null>(null);
const timestamp = ref<string | null>(null);

async function loadCurrentLocation() {
  loading.value = true;
  error.value = null;
  try {
    // Request permissions on native platforms; browsers will ignore.
    await Geolocation.requestPermissions();

    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000,
    });

    latitude.value = position.coords.latitude ?? null;
    longitude.value = position.coords.longitude ?? null;
    accuracy.value = position.coords.accuracy ?? null;
    timestamp.value = dayjs(position.timestamp).format('YYYY-MM-DD HH:mm:ss');
  } catch (e: any) {
    error.value = e?.message || 'Failed to get current location';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadCurrentLocation();
});
</script>

<template>
  <div class="py-4 flex flex-col relative h-full min-h-0" v-auto-animate>
    <p class="text-2xl">GPS Tracker</p>

    <div class="flex-1 flex flex-col min-h-0 gap-4">
      <div class="flex items-center gap-2">
        <q-btn no-caps unelevated color="primary" @click="loadCurrentLocation">
          Refresh Location
        </q-btn>
        <span v-if="loading" class="text-sm opacity-80">Fetching location…</span>
      </div>

      <div v-if="error" class="text-red-400">
        {{ error }}
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div class="p-3 rounded bg-gray-800/40">
          <div class="text-sm opacity-80">Latitude</div>
          <div class="text-lg">{{ latitude != null ? latitude.toFixed(6) : '—' }}</div>
        </div>
        <div class="p-3 rounded bg-gray-800/40">
          <div class="text-sm opacity-80">Longitude</div>
          <div class="text-lg">{{ longitude != null ? longitude.toFixed(6) : '—' }}</div>
        </div>
        <div class="p-3 rounded bg-gray-800/40">
          <div class="text-sm opacity-80">Accuracy (m)</div>
          <div class="text-lg">{{ accuracy != null ? Math.round(accuracy) : '—' }}</div>
        </div>
        <div class="p-3 rounded bg-gray-800/40">
          <div class="text-sm opacity-80">Timestamp</div>
          <div class="text-lg">{{ timestamp ?? '—' }}</div>
        </div>
      </div>

      <!-- Placeholder for tracker controls -->
      <div class="mt-4 opacity-80">Start/stop button and session duration can go here.</div>
    </div>
  </div>
</template>

<style scoped></style>
