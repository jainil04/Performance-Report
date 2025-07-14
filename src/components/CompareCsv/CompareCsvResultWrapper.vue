<template>
  <div class="flex flex-col items-center justify-center">
    <!-- <h1 class="text-3xl md:text-5xl font-bold mb-10 text-[#6c584c] text-center">
      Results Overview
    </h1> -->
    <!-- <CategoriesAverage :categories="average" /> -->
    <div class="w-full">
      <div class="bg-[#fffceb] rounded-2xl shadow border border-[#fff599] p-6 w-full mx-auto">
        <div class="flex justify-between items-start w-full p-5">
          <div>
            <h2 class="text-2xl text-left font-bold mb-1 text-gray-900">
              Test Results
            </h2>
            <p class="mt-1 text-sm text-left font-normal text-gray-500">
              This chart shows an average of the Lighthouse audits for all the runs,
              including metrics like FCP, LCP, TBT, SI, CLS, TTI, and SRT.
              <br />
            </p>
          </div>
        </div>
        <CompareCsvChart :fileResults="rawResults" />
      </div>
    </div>
    <CompareCsvResultTable v-for="(result, idx) in rawResults" :key="idx" :result="result" />
  </div>
</template>

<script setup>
import CompareCsvResultTable from './CompareCsvResultTable.vue';
import CompareCsvChart from './CompareCsvChart.vue';

const props = defineProps({
  rawResults: {
    type: Array,
    required: true,
  },
});

</script>