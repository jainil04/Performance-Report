<template>
  <div class="bg-[#fffceb] rounded-2xl shadow border border-[#fff599] p-6 w-full mx-auto">
    <!-- <h2 class="text-2xl font-bold mb-1 text-gray-900">Test Results</h2>
    <p class="text-gray-500 mb-6 text-sm">Click on any row to view detailed audit information</p> -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-left">
        <ResultsTableHead :device="device" :throttle="throttle" @download-csv="downloadCSV" />
        <tbody>
          <tr v-for="(row, idx) in result" :key="idx"
            class="border-b border-gray-100 hover:bg-[#fff7d1] cursor-pointer">
            <td class="py-3 px-4 font-medium text-gray-900">{{ idx + 1 }}</td>
            <td class="py-3 px-4 font-medium text-gray-900">{{ device }}</td>
            <td class="py-3 px-4 font-medium text-gray-900">{{ getDomain(row.requestedUrl) }}</td>
            <td class="py-3 px-4 font-medium text-gray-900">{{ throttle }}</td>
            <td class="py-3 px-4">{{ formatTimestamp(row.fetchTime) }}</td>
            <td class="py-3 px-4">
              <div class="flex flex-col items-start gap-1">
                <span>{{ row.audits["first-contentful-paint"].displayValue }}</span>
                <span :class="scorePillClass(row.audits['first-contentful-paint'].score * 100)">
                  {{ (row.audits["first-contentful-paint"].score * 100).toFixed(0) }}
                </span>
              </div>
            </td>
            <td class="py-3 px-4">
              <div class="flex flex-col items-start gap-1">
                <span>{{ row.audits["largest-contentful-paint"].displayValue }}</span>
                <span :class="scorePillClass(row.audits['largest-contentful-paint'].score * 100)">
                  {{ (row.audits["largest-contentful-paint"].score * 100).toFixed(0) }}
                </span>
              </div>
            </td>
            <td class="py-3 px-4">
              <div class="flex flex-col items-start gap-1">
                <span>{{ row.audits["interactive"].displayValue }}</span>
                <span :class="scorePillClass(row.audits['interactive'].score * 100)">
                  {{ (row.audits["interactive"].score * 100).toFixed(0) }}
                </span>
              </div>
            </td>
            <td class="py-3 px-4">
              <div class="flex flex-col items-start gap-1">
                <span>{{ row.audits["cumulative-layout-shift"].displayValue }}</span>
                <span :class="scorePillClass(row.audits['cumulative-layout-shift'].score * 100)">
                  {{ (row.audits["cumulative-layout-shift"].score * 100).toFixed(0) }}
                </span>
              </div>
            </td>
            <td class="py-3 px-4">
              <div class="flex flex-col items-start gap-1">
                <span>{{ row.audits["speed-index"].displayValue }}</span>
                <span :class="scorePillClass(row.audits['speed-index'].score * 100)">
                  {{ (row.audits["speed-index"].score * 100).toFixed(0) }}
                </span>
              </div>
            </td>
            <td class="py-3 px-4">
              <div class="flex flex-col items-start gap-1">
                <span>{{ row.audits["total-blocking-time"].displayValue }}</span>
                <span :class="scorePillClass(row.audits['total-blocking-time'].score * 100)">
                  {{ (row.audits["total-blocking-time"].score * 100).toFixed(0) }}
                </span>
              </div>
            </td>
            <td class="py-3 px-4">
              <div class="flex flex-col items-start gap-1">
                <span>{{ (row.audits["server-response-time"].numericValue / 1000).toFixed(2) }}s</span>
                <span :class="scorePillClass(row.audits['server-response-time'].score * 100)">
                  {{ (row.audits["server-response-time"].score * 100).toFixed(0) }}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import ResultsTableHead from './ResultsTableHead.vue';


const props = defineProps({
  result: { type: Array, required: true },
  runs: { type: Number, required: false },
  device: { type: String, required: false },
  throttle: { type: String, required: false },
});

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
  // const caption = [
  //   '# This table displays the results of the Lighthouse audits for the specified URL, including metrics like FCP, LCP, TBT, SI, CLS, TTI, and SRT for each run.',
  //   `# Device: ${props.device || 'Desktop'} Throttle: ${props.throttle || 'Simulated Slow 4G'}`
  // ];
  const headers = [
    'Run', 'Device', 'URL', 'Throttling', 'Timestamp', 'FCP', 'LCP', 'TTI', 'CLS', 'SI', 'TBT', 'SRT'
  ];
  const rows = props.result.map((row, idx) => [
    idx + 1,
    props.device,
    row.requestedUrl?.split("?")[0],
    props.throttle,
    row.fetchTime,
    row.audits["first-contentful-paint"].displayValue,
    row.audits["largest-contentful-paint"].displayValue,
    row.audits["interactive"].displayValue,
    row.audits["cumulative-layout-shift"].displayValue,
    row.audits["speed-index"].displayValue,
    getFormattedTbt(row.audits["total-blocking-time"].displayValue),
    (row.audits["server-response-time"].numericValue / 1000).toFixed(2) + 's',
  ]);
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
