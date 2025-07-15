<template>
  <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900">
    <div class="flex justify-between items-start w-full">
      <div>
        <h2 class="text-2xl font-bold mb-1 text-gray-900">Test Results</h2>
        <p class="mt-1 text-sm font-normal text-gray-500">
          This table displays the results of the Lighthouse audits for the specified
          URL, including metrics like {{ Object.values(LABELS).join(", ") }} for each run.
          <br />
          <b>Device: </b>{{ device }} <b> Throttle: </b>{{ throttle }}
        </p>
      </div>
      <button
        class="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ffee9d] text-gray-900 font-semibold text-base hover:bg-[#ffe14e] shadow transition cursor-pointer"
        @click="$emit('download-csv')">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17l4 4 4-4m-4-5v9" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M20 12v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7" />
        </svg>
        Export CSV
      </button>
    </div>
  </caption>
  <thead>
    <tr class="border-b border-gray-100 text-gray-500 text-sm">
      <th v-for="(label, index) in labels" :key="index" class="py-2 px-4 font-semibold">{{ label }}</th>
    </tr>
  </thead>
</template>

<script setup>
import { computed } from 'vue';
import { LABELS } from './utils.js';

const props = defineProps({
  device: { type: String, required: false },
  throttle: { type: String, required: false },
});

const emit = defineEmits(['download-csv']);

// Computed property that combines fixed column headers with LABELS
const labels = computed(() => {
  const fixedLabels = ['Run', 'Device', 'URL', 'Throttling', 'Timestamp'];
  return [...fixedLabels, ...Object.values(LABELS)];
});
</script>