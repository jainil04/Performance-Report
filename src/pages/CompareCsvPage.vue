<template>
  <main class="min-h-screen mt-20">
    <section
      class="relative min-h-screen flex flex-col items-center justify-start text-center px-4 overflow-hidden w-full">
      <div class="relative z-10 w-full max-w-6xl mx-auto mt-8">
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-2 text-gray-900 leading-tight w-full text-left">Compare
          CSV Reports</h1>
        <p class="text-xl text-gray-500 mb-8 w-full text-left">Upload multiple CSV files to compare Lighthouse metrics
          over time</p>
        <div class="bg-[#fffceb] rounded-2xl shadow border border-gray-200 p-8 w-full mb-8">
          <div class="flex items-center mb-4">
            <svg class="w-7 h-7 mr-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v16h16V4H4zm4 8h8m-4-4v8" />
            </svg>
            <span class="text-2xl font-bold text-gray-900">Upload CSV Files</span>
          </div>
          <p class="text-gray-500 mb-6 text-base text-left">Upload up to 5 CSV files with Lighthouse performance data.
            CSV files should contain columns for URL, metrics (FCP, LCP, TTI, CLS, SI, TBT), and optionally timestamps
            and device types.</p>
          <div v-if="error" class="w-full mb-2">
            <div class="bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-center gap-2 mb-2">
              <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
              </svg>
              <span class="text-red-700 font-semibold text-base">{{ error }}</span>
            </div>
          </div>
          <form @submit.prevent="onUpload" class="w-full flex flex-col gap-4">
            <input type="file" id="csvFiles" multiple accept=".csv"
              class="block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-[#fffceb] focus:outline-none focus:ring-2 focus:ring-blue-200"
              @change="validateFiles" />
            <div v-if="error" class="text-red-500 text-sm text-left">{{ error }}</div>
            <div v-if="files.length" class="w-full mb-2">
              <div class="text-gray-500 text-base text-left mb-2">Selected files:</div>
              <div v-for="(file, idx) in files" :key="file.name + idx"
                class="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3 mb-2 w-full">
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 7v10M17 7v10M7 7h10M7 17h10" />
                  </svg>
                  <span class="font-medium text-gray-900">{{ file.name }}</span>
                  <span class="text-xs text-gray-500">({{ (file.size / 1024).toFixed(1) }} KB)</span>
                </div>
                <button type="button" @click="removeFile(idx)"
                  class="text-gray-500 hover:text-gray-900 text-lg font-bold">&times;</button>
              </div>
            </div>
            <button type="submit"
              class="w-full py-2 rounded-lg bg-[#ffee9d] text-gray-900 font-semibold text-base shadow hover:bg-[#ffe14e] transition flex items-center justify-center cursor-pointer focus:ring-[#fff599]"
              :disabled="isUploading">
              <template v-if="isUploading">Uploading...</template>
              <template v-else>Upload & Parse</template>
            </button>
          </form>
        </div>
      </div>
    </section>
    <section id="compare-csv-result-wrapper" v-if="parseResults && parseResults.length">
      <CompareCsvResultWrapper
        :rawResults="parseResults"
      />
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import Papa from "papaparse";

import CompareCsvResultWrapper from '../components/CompareCsv/CompareCsvResultWrapper.vue';

const error = ref('');
const isUploading = ref(false);
const files = ref([]);
const parseResults = ref([]);

function validateFiles(e) {
  error.value = '';
  const newFiles = Array.from(e.target.files);
  const existingNames = files.value.map(f => f.name);
  const combinedFiles = [...files.value];

  // Add only new files that are not already present
  newFiles.forEach(file => {
    if (!existingNames.includes(file.name)) {
      combinedFiles.push(file);
    }
  });

  if (combinedFiles.length > 5) {
    error.value = 'You can upload up to 5 CSV files only.';
    e.target.value = '';
    return;
  }
  for (const file of newFiles) {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      error.value = `Invalid file type: ${file.name}. Only CSV files are allowed.`;
      e.target.value = '';
      return;
    }
  }
  files.value = combinedFiles;
  if (files.value.length === 1) {
    error.value = 'Please upload at least 2 CSV files to compare.';
  }
}

async function onUpload() {
  if (!files.value.length) {
    error.value = 'Please select at least one CSV file.';
    return;
  }
  if (files.value.length === 1) {
    error.value = 'Please upload at least 2 CSV files to compare.';
    return;
  }
  isUploading.value = true;
  // Add your upload/parse logic here

  await parseFiles();
  isUploading.value = false;
  error.value = "";
  const resultSection = document.getElementById("compare-csv-result-wrapper");
  if (resultSection) {
    const y = resultSection.getBoundingClientRect().top + window.scrollY - 128; // 8rem = 128px
  window.scrollTo({ top: y, behavior: "smooth" });
  }
}

function removeFile(idx) {
  files.value.splice(idx, 1);
}

async function parseFiles() {
  let results = [];
  let parseErrors = [];
  for (const file of files.value) {
    await new Promise((resolve) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          // Check for required columns
          const columns = result.meta.fields.map(f => f.toLowerCase());
          if (!columns.some(col => ["run", "device", "url", "throttling", "timestamp", "fcp", "lcp", "cls", "si", "tbt", "srt"].includes(col))) {
            parseErrors.push(`Failed to parse ${file.name}: CSV must contain a URL column (url, site, domain, or link)`);
          } else {
            results.push({ name: file.name, data: result.data });
          }
          resolve();
        },
        error: (err) => {
          parseErrors.push(`Failed to parse ${file.name}: ${err.message}`);
          resolve();
        }
      });
    });
  }
  if (parseErrors.length) {
    error.value = parseErrors.join('\\n');
  } else {
    error.value = '';
    // Do something with results, e.g. display or compare
    console.log(results);
    parseResults.value = results;
  }
}

</script>
