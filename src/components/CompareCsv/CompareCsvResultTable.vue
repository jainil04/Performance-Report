<template>
  <div class="bg-[#fffceb] rounded-2xl shadow border border-[#fff599] p-6 w-full mx-auto m-14">
    <!-- <h2 class="text-2xl font-bold mb-1 text-gray-900">Test Results</h2>
    <p class="text-gray-500 mb-6 text-sm">Click on any row to view detailed audit information</p> -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-left">
        <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900">
          <div class="flex justify-between items-start w-full">
            <div>
              <h2 class="text-2xl font-bold mb-1 text-gray-900">Uploaded Test Results</h2>
              <p class="mt-1 text-md font-normal text-gray-500">
                {{ result.name }}
              </p>
            </div>
          </div>
        </caption>
        <thead>
          <tr class="border-b border-gray-100 text-gray-500 text-sm">
            <th v-for="(metric, index) in Object.keys(result.data[0])" :key="index" class="py-2 px-4 font-semibold">
              {{ metric }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-100 hover:bg-[#fff7d1] cursor-pointer">
            <td v-for="(metricVal, index) in Object.values(result.data[0])" :key="index"
              class="py-3 px-4 font-medium text-gray-900">
              {{ metricVal }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";


const props = defineProps({
  result: { type: Object, required: true },
});
</script>
