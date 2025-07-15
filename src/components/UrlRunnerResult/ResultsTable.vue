<template>
  <div class="bg-[#fffceb] rounded-2xl shadow border border-[#fff599] p-6 w-full mx-auto">
    <div class="overflow-x-auto">
      <table class="min-w-full text-left">
        <ResultsTableHead :device="device" :throttle="throttle" @download-csv="downloadCSV" />
        <tbody>
          <tr v-for="(row, idx) in result" :key="idx"
            class="border-b border-gray-100 hover:bg-[#fff7d1] cursor-pointer"
            @click="openModal(row, idx)">
            <td class="py-3 px-4 font-medium text-gray-900">{{ idx + 1 }}</td>
            <td class="py-3 px-4 font-medium text-gray-900">{{ device }}</td>
            <td class="py-3 px-4 font-medium text-gray-900">{{ getDomain(row.requestedUrl) }}</td>
            <td class="py-3 px-4 font-medium text-gray-900">{{ throttle }}</td>
            <td class="py-3 px-4">{{ formatTimestamp(row.fetchTime) }}</td>
            <!-- Dynamically generate metric cells using AUDIT_KEYS -->
            <template v-for="(auditId, key) in AUDIT_KEYS" :key="key">
              <td class="py-3 px-4">
                <div class="flex flex-col items-start gap-1">
                  <span v-if="key === 'srt'">{{ (row.audits[auditId]?.numericValue / 1000).toFixed(2) }}s</span>
                  <span v-else>{{ row.audits[auditId]?.displayValue }}</span>
                  <span :class="scorePillClass(row.audits[auditId]?.score * 100)">
                    {{ (row.audits[auditId]?.score * 100).toFixed(0) }}
                  </span>
                </div>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <RunDetailsModal :show="showModal" :data="selectedRow" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import { AUDIT_KEYS, LABELS } from './utils.js';
import ResultsTableHead from './ResultsTableHead.vue';
import RunDetailsModal from './RunDetailsModal.vue';


const props = defineProps({
  result: { type: Array, required: true },
  runs: { type: Number, required: false },
  device: { type: String, required: false },
  throttle: { type: String, required: false },
});

const showModal = ref(false);
const selectedRow = ref(null);

function openModal(row, idx) {
  selectedRow.value = row;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  selectedRow.value = null;
}

function scorePillClass(score) {
  if (score >= 90) return 'inline-block px-3 py-1 rounded-full bg-green-500 text-white font-bold text-sm';
  if (score >= 50) return 'inline-block px-3 py-1 rounded-full bg-yellow-400 text-white font-bold text-sm';
  return 'inline-block px-3 py-1 rounded-full bg-red-500 text-white font-bold text-sm';
}

function formatTimestamp(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleString();
}

function downloadCSV() {
  if (!props.result || !props.result.length) return;

  // Create headers using the LABELS constant
  const headers = [
    'Run', 'Device', 'URL', 'Throttling', 'Timestamp',
    ...Object.values(LABELS) // Add all metric labels from our constants
  ];

  const rows = props.result.map((row, idx) => {
    // Start with basic information
    const baseData = [
      idx + 1,
      props.device,
      row.requestedUrl?.split("?")[0],
      props.throttle,
      row.fetchTime,
    ];

    // Add metrics data using AUDIT_KEYS for consistent ordering
    const metricData = Object.keys(AUDIT_KEYS).map(key => {
      const auditId = AUDIT_KEYS[key];
      const audit = row.audits[auditId];

      // Handle edge cases safely with optional chaining
      if (key === 'srt' && audit?.numericValue) {
        return (audit.numericValue / 1000).toFixed(2) + 's';
      } else if (key === 'tbt' && audit?.displayValue) {
        return getFormattedTbt(audit.displayValue);
      }
      return audit?.displayValue || 'N/A';
    });

    return [...baseData, ...metricData];
  });
  const csvContent = [
    // ...caption,
    // '', // blank line for separation
    // '', // another blank line for clarity
    headers.join(","),
    ...rows.map(e => e.join(","))
  ].join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'lighthouse-results.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function getDomain(requestedUrl) {
  return requestedUrl.split("?")[0];
}

function getFormattedTbt(val) {
  if (val.includes(",")) {
    return val.split(",").join("");
  }
  return val;
}

</script>
