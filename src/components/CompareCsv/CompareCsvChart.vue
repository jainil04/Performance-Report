<template>
  <div class="w-full h-64">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  fileResults: {
    type: Array,
    required: true
  }
})

const chartCanvas = ref(null)
let chartInstance = null

// turn a string like "1.8 s" / "6770 ms" / "0.29" into a numeric ms value
function parseMetric(str) {
  if (!str) return 0
  const s = str.toString().trim().toLowerCase()
  // extract only digits, dot, minus
  const num = parseFloat(s.replace(/[^0-9.-]+/g, ''))
  if (s.endsWith('ms')) return num
  if (s.endsWith('s')) return num * 1000
  return num
}

function drawChart() {
  if (!chartCanvas.value) return

  const metrics = ['FCP', 'LCP', 'TTI', 'CLS', 'SI', 'TBT', 'SRT']
  const labels = metrics

  const datasets = props.fileResults.map((file, idx) => {
    const row = Array.isArray(file.data) && file.data[0] ? file.data[0] : {}
    return {
      label: file.name,
      data: metrics.map(m => parseMetric(row[m])),
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#8b5cf6', '#f472b6'][idx % 7],
      barPercentage: 0.6
    }
  })

  if (chartInstance) chartInstance.destroy()

  chartInstance = new Chart(chartCanvas.value, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' },
        tooltip: {
          callbacks: {
            // show the original display string in the tooltip
            label(ctx) {
              const file = props.fileResults[ctx.datasetIndex]
              const row = file.data[0] || {}
              const m = metrics[ctx.dataIndex]
              return `${file.name} ${m}: ${row[m] || ''}`
            }
          }
        }
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Milliseconds (ms)' }
        }
      }
    }
  })
}

onMounted(drawChart)
watch(() => props.fileResults, drawChart, { deep: true })
onBeforeUnmount(() => chartInstance?.destroy())
</script>

<style scoped>
/* nothing needed; sizing & colors via Tailwind/Chart.js */
</style>
