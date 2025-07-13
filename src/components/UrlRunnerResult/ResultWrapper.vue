<template>
  <div class="flex flex-col items-center justify-center">
    <!-- <h1 class="text-3xl md:text-5xl font-bold mb-10 text-[#6c584c] text-center">
      Results Overview
    </h1> -->
    <CategoriesAverage :categories="average" />
    <div class="w-full">
      <div class="">
        <ResultsTable :result="rawResults" :runs="runs" :device="mode" :throttle="throttle" />
      </div>
      <div class="mt-32 bg-[#fffceb] rounded-2xl shadow border border-[#fff599] p-6 w-full mx-auto">
        <div class="flex justify-between items-start w-full p-5">
          <div>
            <h2 class="text-2xl text-left font-bold mb-1 text-gray-900">
              Test Results
            </h2>
            <p class="mt-1 text-sm text-left font-normal text-gray-500">
              This chart shows an average of the Lighthouse audits for all the runs,
              including metrics like FCP, LCP, TBT, SI, CLS, TTI, and SRT.
              <br />
              <b>Device: </b>{{ mode }} <b> Throttle: </b>{{ throttle }}
            </p>
          </div>
        </div>
        <MetricsChart :metrics="averages" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { getAverageMetrics } from "./utils.js";

import ResultsTable from "./ResultsTable.vue";
import MetricsChart from "./MetricsChart.vue";
import CategoriesAverage from "./CategoriesAverage.vue";

const props = defineProps({
  rawResults: {
    type: Array,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  runs: {
    type: Number,
    default: 1,
  },
  throttle: {
    type: String,
    required: true,
  },
});

const average = computed(() => {
  const { runs } = props;
  const categoriesAverage = {
    performance: 0,
    accessibility: 0,
    seo: 0,
  };
  props.rawResults.forEach((r) => {
    categoriesAverage.performance += r.categories.performance.score * 100;
    categoriesAverage.accessibility += r.categories.accessibility.score * 100;
    categoriesAverage.seo += r.categories.seo.score * 100;
    console.log("categoriesAverage", categoriesAverage);
  });
  categoriesAverage.performance = Math.round(
    categoriesAverage.performance / runs
  );
  categoriesAverage.accessibility = Math.round(
    categoriesAverage.accessibility / runs
  );
  categoriesAverage.seo = Math.round(categoriesAverage.seo / runs);
  return categoriesAverage;
});

const scoresAverage = computed(() => {
  const { runs } = props;
  const scores = {
    fcp: 0,
    lcp: 0,
    tbt: 0,
    si: 0,
    cls: 0,
    tti: 0,
    srt: 0,
  };
  props.rawResults.forEach((r) => {
    if (r) {
      scores.fcp += r.audits["first-contentful-paint"].score * 100;
      scores.lcp += r.audits["largest-contentful-paint"].score * 100;
      scores.tbt += r.audits["total-blocking-time"].score * 100;
      scores.si += r.audits["speed-index"].score * 100;
      scores.cls += r.audits["cumulative-layout-shift"].score * 100;
      scores.tti += r.audits.interactive.score * 100;
      scores.srt += r.audits["server-response-time"].score * 100;
    }
  });
  scores.fcp = Math.round(scores.fcp / runs);
  scores.lcp = Math.round(scores.lcp / runs);
  scores.tbt = Math.round(scores.tbt / runs);
  scores.si = Math.round(scores.si / runs);
  scores.cls = Math.round(scores.cls / runs);
  scores.tti = Math.round(scores.tti / runs);
  scores.srt = Math.round(scores.srt / runs);
  return scores;
});

console.log("scoresAverage", scoresAverage.value);
console.log("average", average.value);

const averages = computed(() => getAverageMetrics(props.rawResults));
</script>
