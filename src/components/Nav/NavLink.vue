<template>
  <router-link :to="link.href" class="px-4 py-2 text-black hover:underline hover:text-stone-950 transition-colors">
    {{ link.label }}
  </router-link>
</template>

<script setup>
defineProps({
  link: Object,
});
</script>
