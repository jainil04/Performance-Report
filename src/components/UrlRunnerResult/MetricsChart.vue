<template>
  <div class="w-full h-70">

    <canvas ref="canvas"></canvas>
    <p class="text-center text-gray-500 mt-8">
      An average of the metrics across all runs.
    </p>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import Chart from "chart.js/auto";

/**
 * Props:
 * metrics: Array<{
 *   label: string,
 *   value: number,
 *   display: string
 * }>
 */
const props = defineProps({
  metrics: {
    type: Array,
    required: true,
  },
});

const canvas = ref(null);
let chart = null;

function draw() {
  const labels = props.metrics.map((m) => m.label);
  const data = props.metrics.map((m) => m.numeric);
  const displayValues = props.metrics.map((m) => m.display);

  if (chart) chart.destroy();

  chart = new Chart(canvas.value, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            "#3b82f6",
            "#10b981",
            "#f59e0b",
            "#ef4444",
            "#8b5cf6",
          ].slice(0, labels.length),
          borderRadius: 10,
          barPercentage: 0.7,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            // show the friendly displayValue instead of raw number
            label(ctx) {
              return displayValues[ctx.dataIndex];
            },
          },
        },
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          beginAtZero: true,
          grid: { color: "#e5e7eb" },
        },
      },
    },
  });
}

onMounted(draw);
watch(() => props.metrics, draw, { deep: true });

onBeforeUnmount(() => {
  if (chart) chart.destroy();
});
</script>

<style scoped>
/* all styling via Tailwind / Chart.js options */
</style>
