<template>
  <div class="flex gap-8 items-center justify-center flex-col">
    <div class="flex gap-8 items-center justify-center">
      <div v-for="cat in categoriesList" :key="cat.key" class="flex flex-col items-center">
        <div class="relative w-28 h-28 flex items-center justify-center">
          <svg class="absolute top-0 left-0" width="112" height="112" viewBox="0 0 112 112">
            <circle cx="56" cy="56" r="48" :fill="cat.fill" stroke="none" />
            <circle :stroke="cat.color" stroke-width="7" fill="none" cx="56" cy="56" r="48" :stroke-dasharray="301.59"
              :stroke-dashoffset="301.59 - (cat.value / 100) * 301.59" stroke-linecap="round"
              transform="rotate(-90 56 56)" />
          </svg>
          <span class="absolute text-3xl font-bold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            :style="{ color: cat.color }">{{ cat.value }}</span>
        </div>
        <span class="mt-2 text-lg font-semibold text-gray-700 text-center mb-8">{{ cat.label }}</span>
      </div>
    </div>
    <div class="mt-2 w-full flex flex-col items-center justify-center mb-8">
      <p class="text-gray-500 text-base text-center mb-2">Values are estimated and may vary. The <a
          href="https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/?utm_source=lighthouse&utm_medium=devtools"
          class="text-blue-400 underline" target="_blank" rel="noopener noreferrer">performance score is calculated</a> directly from these metrics. <a
          href="https://googlechrome.github.io/lighthouse/scorecalc/#FCP=1106&LCP=5281&TBT=2797&CLS=0.03&SI=3506&TTI=10143&device=desktop&version=12.6.0"
          class="text-blue-400 underline" target="_blank" rel="noopener noreferrer">See calculator.</a></p>
      <div class="flex gap-8 items-center justify-center mt-2">
        <div class="flex items-center gap-2">
          <span class="w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center"><svg width="16" height="16"
              viewBox="0 0 16 16">
              <polygon points="8,2 14,14 2,14" fill="#ef4444" />
            </svg></span>
          <span class="text-gray-400 text-lg">0–49</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-4 h-4 bg-yellow-400 rounded-sm"></span>
          <span class="text-gray-400 text-lg">50–89</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-4 h-4 bg-green-500 rounded-full"></span>
          <span class="text-gray-400 text-lg">90–100</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  categories: {
    type: Object,
    required: true,
  }
});

function getColor(val) {
  if (val >= 0 && val < 50) return { stroke: '#ef4444', text: 'text-[#ef4444]', fill: '#81171b' };
  if (val >= 50 && val < 90) return { stroke: '#fbbf24', text: 'text-[#fbbf24]', fill: '#ffe566' };
  if (val >= 90 && val <= 100) return { stroke: '#22c55e', text: 'text-[#22c55e]', fill: '#d9ed92' };
  return { stroke: '#d1d5db', text: 'text-gray-400' };
}

const categoriesList = [
  (() => {
    const val = props.categories.performance ?? 0;
    const color = getColor(val);
    return {
      key: 'performance',
      label: 'Performance',
      value: val,
      color: color.stroke,
      colorText: color.text,
      fill: color.fill,
    };
  })(),
  (() => {
    const val = props.categories.accessibility ?? 0;
    const color = getColor(val);
    return {
      key: 'accessibility',
      label: 'Accessibility',
      value: val,
      color: color.stroke,
      colorText: color.text,
      fill: color.fill,
    };
  })(),
  // (() => {
  //   const val = props.categories.bestPractices ?? 0;
  //   const color = getColor(val);
  //   return {
  //     key: 'bestPractices',
  //     label: 'Best Practices',
  //     value: val,
  //     color: color.stroke,
  //     colorText: color.text,
  //   };
  // })(),
  (() => {
    const val = props.categories.seo ?? 0;
    const color = getColor(val);
    return {
      key: 'seo',
      label: 'SEO',
      value: val,
      color: color.stroke,
      colorText: color.text,
      fill: color.fill,
    };
  })(),
];
</script>
