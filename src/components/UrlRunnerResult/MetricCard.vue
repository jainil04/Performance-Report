<template>
  <div
    class="flex flex-col items-center justify-center rounded-2xl border p-6 shadow-sm w-full min-h-[120px]"
    :data-style="true"
    :data-test-id="'metric-card-' + label.toLowerCase()"
    :class="scoreClass"
  >
    <span class="text-base font-medium text-gray-500 mb-2">{{ label }}</span>
    <span class="text-2xl font-bold mb-1" :class="scoreClass">{{ value }}</span>
    <span class="text-sm font-semibold px-2 py-1 rounded-full" :class="scoreClass">
      {{ scoreLabel }}
    </span>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  label: { type: String, required: true },
  score: { type: Number, required: false },
  value: { type: String, required: false }
});

const scoreClass = computed(() => {
  if (props.score === null || props.score === undefined) {
    return "bg-gray-100 text-gray-400 border-gray-200";
  }
  if (props.score >= 0.9) {
    return "bg-green-50 text-green-700 border-green-200";
  }
  if (props.score >= 0.5) {
    return "bg-yellow-50 text-yellow-700 border-yellow-200";
  }
  return "bg-red-50 text-red-700 border-red-200";
});

const scoreLabel = computed(() => {
  if (props.score === null || props.score === undefined) {
    return "N/A";
  }
  if (props.score >= 0.9) {
    return "Good";
  }
  if (props.score >= 0.5) {
    return "Needs Improvement";
  }
  return "Poor";
});
</script>

