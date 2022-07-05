<template>
  <div
    ref="loader"
    class="loader"
  >
    <svg viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="25"
        strokeWidth="16"
        fill="none"
      />
    </svg>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useEventBus } from '@vueuse/core';

const { on } = useEventBus('loader');
const loader = ref(null);

on((show) => {
  if (show) loader.value.classList.add('show');
  else loader.value.classList.remove('show');
});
</script>
