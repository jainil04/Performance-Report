<template>
  <div class="min-h-screen flex flex-col">
    <!-- Main Content: Form + Export Card -->
    <div class="flex flex-col md:flex-row gap-8 w-full flex-1 items-start px-6 mt-40 md:px-16">
      <!-- Form Card -->
      <div class="w-full max-w-md mx-auto">
        <div class="bg-[#fffceb] rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <h2 class="text-2xl font-bold mb-1 text-gray-900">Performance Test</h2>
          <p class="text-gray-500 mb-6 text-sm">Enter a URL and configure test settings to analyze website performance
          </p>
          <form @submit.prevent="onFormSubmit">
            <!-- Website URL -->
            <label class="block text-left text-sm font-medium text-gray-700 mb-1" for="url">Website URL</label>
            <input id="url" type="url" v-model="url" placeholder="https://example.com"
              class="mb-4 w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fff599] text-gray-900 bg-[#fffceb]" />

            <!-- Device Type -->
            <label class="block text-left text-sm font-medium text-gray-700 mb-1" for="device">Device Type</label>
            <select id="device" v-model="device"
              class="mb-4 w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fff599] text-gray-900 bg-[#fffceb]">
              <option>Desktop</option>
              <option>Mobile</option>
            </select>

            <!-- Network Throttling -->
            <label class="block text-left text-sm font-medium text-gray-700 mb-1" for="throttle">Network
              Throttling</label>
            <select id="throttle" v-model="throttle"
              class="mb-4 w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fff599] text-gray-900 bg-[#fffceb]">
              <option value="none">No Throttling</option>
              <option value="slow3g">Simulated Slow 3G</option>
              <option value="fast3g">Simulated Fast 3G</option>
              <option value="lte">LTE</option>
            </select>

            <!-- Number of Runs -->
            <label class="block text-left text-sm font-medium text-gray-700 mb-1" for="runs">Number of Runs</label>
            <input id="runs" type="number" min="1" max="10" v-model="runs"
              class="mb-1 w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fff599] text-gray-900 bg-[#fffceb]" />
            <div class="text-xs text-gray-400 mb-6">Run the test 1-10 times for more reliable results</div>
            <div v-if="running" class="mt-4 mb-4 space-y-2 text-gray-900">
              <p>Completed {{ progress.completed }} of {{ progress.total }}</p>
              <div class="w-full bg-gray-200 h-2 rounded">
                <div class="h-2 bg-blue-500 rounded"
                  :style="{ width: (progress.completed / progress.total * 100) + '%' }"></div>
              </div>
            </div>
            <button type="submit"
              class="w-full py-2 rounded-lg bg-[#ffee9d] text-gray-900 font-semibold text-base shadow hover:bg-[#ffe14e] transition flex items-center justify-center cursor-pointer focus:ring-[#fff599]"
              :disabled="isLoading">
              <template v-if="isLoading">
                <div class="mr-2" role="status">
                  <svg aria-hidden="true" class="w-5 h-5 text-gray-400 animate-spin fill-gray-900" viewBox="0 0 100 101"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor" />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill" />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>

                Running Test...
              </template>
              <template v-else>
                Run Performance Test
              </template>
            </button>
          </form>
        </div>
      </div>

    </div>

    <!-- Empty state message -->
    <div class="w-full flex flex-col items-center justify-center mt-8 mb-8" v-if="!result.length">
      <p class="text-gray-900 text-lg text-center">No performance tests yet. Run your first test above!</p>
    </div>

    <!-- Results Section -->
    <div v-if="result.length" class="min-h-screen w-full flex flex-col justify-center px-4 py-12 text-center rounded-lg"
      ref="resultsSection">
      <ResultWrapper :rawResults="result" :mode="device" :runs="runs" :throttle="throttle" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import ResultWrapper from "../components/UrlRunnerResult/ResultWrapper.vue";

const url = ref('');
const device = ref('Desktop');
const throttle = ref('none');
const runs = ref(1);
const result = ref([]);
const isLoading = ref(false);
const running = ref(false)
const progress = ref({ completed: 0, total: runs })
const resultsSection = ref(null)


const onFormSubmit = async () => {
  result.value = [];
  isLoading.value = true;
  console.log("Form submitted");
  console.log("URL:", url.value);
  console.log("Device:", device.value);
  console.log("Throttle:", throttle.value);
  console.log("Runs:", runs.value);

  const bodyOptions = new URLSearchParams({
    url: url.value,
    mode: device.value,
    network: throttle.value,
    runs: runs.value,
  });
  running.value = true;
  // result.value = await getLighthouseReport(lighthouseRequestUrl, bodyOptions);
  let es = new EventSource(`http://localhost:3001/run-lighthouse-stream?${bodyOptions.toString()}`);
  es.addEventListener('progress', (event) => {
    // handle progress
    progress.value = JSON.parse(event.data);
    console.log("Progress event received:", event.data);
  });
  es.addEventListener('complete', (event) => {
    // handle complete
    console.log("Complete event received:", event.data);
    result.value = JSON.parse(event.data);
    es.close();
    es = null;
    isLoading.value = false;
  });
  es.onerror = (error) => {
    console.error("Error in SSE:", error);
    es.close();
    es = null;
    isLoading.value = false;
  };
};
</script>
