<template>
  <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900">
    <div class="flex justify-between items-start w-full">
      <div>
        <h2 class="text-2xl font-bold mb-1 text-gray-900">Test Results</h2>
        <p class="mt-1 text-sm font-normal text-gray-500">
          This table displays the results of the Lighthouse audits for the specified
          URL, including metrics like FCP, LCP, TBT, SI, CLS, TTI, and SRT for each run.
          <br />
          <b>Device: </b>{{ device }} <b> Throttle: </b>{{ throttle }}
        </p>
      </div>
      <button
        class="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ffee9d] text-gray-900 font-semibold text-base hover:bg-[#ffe14e] shadow transition cursor-pointer"
        @click="$emit('download-csv')"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17l4 4 4-4m-4-5v9" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7" />
        </svg>
        Export CSV
      </button>
    </div>
  </caption>
  <thead>
    <tr class="border-b border-gray-100 text-gray-500 text-sm">
      <th class="py-2 px-4 font-semibold">Run</th>
      <th class="py-2 px-4 font-semibold">Device</th>
      <th class="py-2 px-4 font-semibold">URL</th>
      <th class="py-2 px-4 font-semibold">Throttling</th>
      <th class="py-2 px-4 font-semibold">Timestamp</th>
      <th class="py-2 px-4 font-semibold">FCP</th>
      <th class="py-2 px-4 font-semibold">LCP</th>
      <th class="py-2 px-4 font-semibold">TTI</th>
      <th class="py-2 px-4 font-semibold">CLS</th>
      <th class="py-2 px-4 font-semibold">SI</th>
      <th class="py-2 px-4 font-semibold">TBT</th>
      <th class="py-2 px-4 font-semibold">SRT</th>
    </tr>
  </thead>
</template>

<script setup>
const props = defineProps({
  device: { type: String, required: false },
  throttle: { type: String, required: false },
});

const emit = defineEmits(['download-csv']);
</script>