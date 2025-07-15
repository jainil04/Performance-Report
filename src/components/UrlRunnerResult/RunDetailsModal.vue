<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
    <div class="bg-white rounded-xl shadow-lg max-w-4xl w-full relative overflow-hidden" style="height: 80vh;">
      <div class="sticky top-0 z-10 bg-white p-8 pb-0">
        <button @click="onClose"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl font-bold">&times;</button>
        <h2 class="text-2xl font-bold mb-1 text-gray-900">Performance Audit Details</h2>
        <p class="text-gray-500 mb-6 text-base">
          Detailed analysis for {{ data?.requestedUrl?.split('?')[0] }} on {{ data?.emulatedFormFactor || 'desktop' }}
        </p>
      <div
        class="bg-[#f3f6f9] rounded-xl border border-[#e5e7eb] w-full mb-6 flex flex-row items-center justify-between px-2 py-2 sticky top-[120px] z-10">
        <button class="flex-1 py-3 rounded-lg text-lg font-semibold focus:outline-none transition-colors duration-150"
          :class="activeTab === 'performance' ? 'bg-white text-gray-900 shadow cursor-pointer' : 'cursor-pointer bg-transparent text-gray-400'"
          @click="activeTab = 'performance'" data-style data-test-id="tab-performance">
          Performance
        </button>
        <button class="flex-1 py-3 rounded-lg text-lg font-semibold focus:outline-none transition-colors duration-150"
          :class="activeTab === 'other' ? 'bg-white text-gray-900 shadow cursor-pointer' : 'cursor-pointer bg-transparent text-gray-400'"
          @click="activeTab = 'other'" data-style data-test-id="tab-other">
          Other Audits
        </button>
      </div>
      <div class="overflow-y-auto p-8 pt-0" style="height: calc(80vh - 180px);">
        <div v-if="activeTab === 'performance'">
          <!-- Performance Tab Content -->
        <div class="bg-[#f9fafb] rounded-2xl border border-[#e5e7eb] p-8 w-full mb-2">
          <div class="flex items-center mb-6">
            <svg class="w-7 h-7 mr-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 3v18h18V3H3zm9 4v10m-5-5h10" />
            </svg>
            <span class="text-2xl font-bold text-gray-900">Core Web Vitals</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard label="FCP" :value="data?.audits?.['first-contentful-paint']?.displayValue"
              :score="data?.audits?.['first-contentful-paint']?.score" />
            <MetricCard label="LCP" :value="data?.audits?.['largest-contentful-paint']?.displayValue"
              :score="data?.audits?.['largest-contentful-paint']?.score" />
            <MetricCard label="TTI" :value="data?.audits?.['interactive']?.displayValue"
              :score="data?.audits?.['interactive']?.score" />
            <MetricCard label="CLS" :value="data?.audits?.['cumulative-layout-shift']?.displayValue"
              :score="data?.audits?.['cumulative-layout-shift']?.score" />
            <MetricCard label="SI" :value="data?.audits?.['speed-index']?.displayValue"
              :score="data?.audits?.['speed-index']?.score" />
            <MetricCard label="TBT" :value="data?.audits?.['total-blocking-time']?.displayValue"
              :score="data?.audits?.['total-blocking-time']?.score" />
          </div>
        </div>
        <div v-if="opportunitySavings.renderBlocking > 0 || opportunitySavings.responsiveImages > 0" class="">
          <div class="bg-white rounded-2xl border border-[#e5e7eb] p-8 w-full mt-6">
            <div class="flex items-center mb-2">
              <svg class="w-6 h-6 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" />
              </svg>
              <span class="text-xl font-bold text-gray-900">Opportunities</span>
            </div>
            <p class="text-gray-500 mb-4 text-base">Suggestions to improve performance</p>
            <div class="space-y-4">
              <div v-if="opportunitySavings.renderBlocking > 0"
                class="flex items-center justify-between bg-[#f9fafb] rounded-xl border border-[#e5e7eb] px-6 py-4">
                <span class="text-lg font-semibold text-gray-900">Eliminate render-blocking resources</span>
                <span class="bg-gray-100 text-gray-900 font-bold px-4 py-2 rounded-full text-base">
                  Save {{ opportunitySavings.renderBlocking + ' s' }}
                </span>
              </div>
              <div v-if="opportunitySavings.responsiveImages > 0"
                class="flex items-center justify-between bg-[#f9fafb] rounded-xl border border-[#e5e7eb] px-6 py-4">
                <span class="text-lg font-semibold text-gray-900">Properly size images</span>
                <span class="bg-gray-100 text-gray-900 font-bold px-4 py-2 rounded-full text-base">
                  Save {{ opportunitySavings.responsiveImages + ' s' }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="unusedCss.displayValue !== '' || mainThread.displayValue !== ''"
          class="mb-12"
        >
          <div class="bg-white rounded-2xl border border-[#e5e7eb] p-8 w-full mt-6">
            <div class="flex items-center mb-2">
              <svg class="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4h4" />
              </svg>
              <span class="text-xl font-bold text-gray-900">Diagnostics</span>
            </div>
            <p class="text-gray-500 mb-4 text-base">Additional performance insights</p>
            <div class="space-y-4">
              <div v-if="unusedCss.displayValue !== ''"
                class="bg-[#f9fafb] rounded-xl border border-[#e5e7eb] px-6 py-4">
                <span class="text-lg font-semibold text-gray-900">Reduce unused CSS</span>
                <div class="flex flex-row items-center justify-between gap-4 mt-1">
                  <div v-if="unusedCss.overallSavingsMs > 0" class="flex-1 text-gray-500 text-base text-center">Overall
                    Savings: {{ unusedCss.overallSavingsMs }}</div>
                  <div v-if="unusedCss.guidanceLevel > 0" class="flex-1 text-gray-500 text-base text-center">Guidance
                    Level: {{ unusedCss.guidanceLevel }}</div>
                  <div v-if="unusedCss.score > 0" class="flex-1 text-gray-500 text-base text-center">Score: {{
                    unusedCss.score }}</div>
                </div>
              </div>
              <div v-if="mainThread.displayValue !== ''"
                class="bg-[#f9fafb] rounded-xl border border-[#e5e7eb] px-6 py-4">
                <span class="text-lg font-semibold text-gray-900">{{ mainThread.displayValue }}</span>
                <div class="flex flex-row items-center justify-between gap-4 mt-1">
                  <div v-if="mainThread.overallSavingsMs > 0" class="flex-1 text-gray-500 text-base text-center">Overall
                    Savings: {{ mainThread.overallSavingsMs }}</div>
                  <div v-if="mainThread.guidanceLevel > 0" class="flex-1 text-gray-500 text-base text-center">Guidance
                    Level: {{ mainThread.guidanceLevel }}</div>
                  <div v-if="mainThread.score > 0" class="flex-1 text-gray-500 text-base text-center">Score: {{
                    mainThread.score }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'other'" class="mb-12">
        <!-- Other Audits Tab Content -->
        <div class="bg-white rounded-2xl border border-[#e5e7eb] p-8 w-full mt-2">
          <div v-for="category in categories" :key="category.id" class="border-b border-[#e5e7eb] py-2 flex flex-col">
            <div class="flex items-center justify-between cursor-pointer" @click="toggleAccordion(category.id)"
              data-style :data-test-id="'accordion-' + category.id">
              <div class="flex items-center gap-3 w-full">
                <span v-if="category.icon" v-html="category.icon" class="w-6 h-6"></span>
                <div class="flex flex-col items-start">
                  <span class="text-2xl font-bold text-gray-900">{{ category.title }}</span>
                  <span :class="['text-lg font-semibold', scoreColor(category.score)]">Score: {{ category.score
                    }}</span>
                </div>
              </div>
              <svg :class="['w-5 h-5 transition-transform', { 'rotate-180': openAccordions[category.id] }]" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div v-if="openAccordions[category.id]" class="mt-4 pl-8">
              <p class="text-gray-500 text-left text-base"> {{ category.description }} </p>
              <br />
              <p class="text-gray-500 text-left text-base"> {{ category.manualDescription }} </p>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const CATEGORY_ICONS = {
  accessibility: '<svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" /></svg>',
  seo: '<svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2a4 4 0 0 1 4-4h2m-6 6h6" /></svg>',
  bestPractices: '<svg class="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4h4" /></svg>',
  pwa: '<svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>'
};

const categories = computed(() => {
  const cats = props.data?.categories || {};
  return [
    {
      id: 'accessibility',
      title: 'Accessibility',
      score: Math.round((cats.accessibility?.score || 0) * 100),
      icon: CATEGORY_ICONS.accessibility,
      description: cats.accessibility?.description || '',
      manualDescription: cats.accessibility?.manualDescription || ''
    },
    {
      id: 'seo',
      title: 'SEO',
      score: Math.round((cats.seo?.score || 0) * 100),
      icon: CATEGORY_ICONS.seo,
      description: cats.seo?.description || '',
      manualDescription: cats.seo?.manualDescription || ''
    },
    {
      id: 'bestPractices',
      title: 'Best Practices',
      score: Math.round((cats['best-practices']?.score || 0) * 100),
      icon: CATEGORY_ICONS.bestPractices,
      description: cats['best-practices']?.description || '',
      manualDescription: cats['best-practices']?.manualDescription || ''
    },
    {
      id: 'pwa',
      title: 'Progressive Web App',
      score: Math.round((cats.pwa?.score || 0) * 100),
      icon: CATEGORY_ICONS.pwa,
      description: cats.pwa?.description || '',
      manualDescription: cats.pwa?.manualDescription || ''
    }
  ];
});
import { computed, defineEmits, defineProps, reactive, ref } from "vue";

import MetricCard from "./MetricCard.vue";

const activeTab = ref("performance");
const emit = defineEmits(["close"]);
const openAccordions = reactive({});
const props = defineProps({
  data: { type: Object, required: false },
  show: { type: Boolean, required: true }
});

function onClose() {
  emit("close");
}

const mainThread = computed(() => {
  const audits = props.data?.audits || {};
  const mainThreadTasks = audits["main-thread-tasks"];
  return {
    displayValue: mainThreadTasks?.displayValue || "",
    guidanceLevel: mainThreadTasks?.guidanceLevel || 0,
    overallSavingsMs: mainThreadTasks?.overallSavingsMs || 0,
    score: mainThreadTasks?.score || 0
  };
});

const opportunitySavings = computed(() => {
  const audits = props.data?.audits || {};
  const renderBlocking = audits["render-blocking-resources"]?.details?.overallSavingsMs || 0;
  const responsiveImages = audits["uses-responsive-images"]?.details?.overallSavingsMs || 0;
  return {
    renderBlocking: renderBlocking / 1000,
    responsiveImages: responsiveImages / 1000
  };
});

function scoreColor(score) {
  if (score >= 90) return "text-green-500";
  if (score >= 50) return "text-yellow-500";
  return "text-red-500";
}

function toggleAccordion(id) {
  openAccordions[id] = !openAccordions[id];
}

const unusedCss = computed(() => {
  const audits = props.data?.audits || {};
  const unusedCss = audits["unused-css-rules"];
  return {
    displayValue: unusedCss?.displayValue || "",
    guidanceLevel: unusedCss?.guidanceLevel || 0,
    overallSavingsMs: unusedCss?.overallSavingsMs || 0,
    score: unusedCss?.score || 0
  };
});
</script>
