<template>
  <div
    class="notification"
    :class="classList"
  >
    {{ message }}
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useExpose from '../composables/useExpose';

// reactivities
const message = ref('');
const classList = ref([]);

const show = (type, text) => new Promise((resolve) => {
  classList.value = [];
  classList.value.push('show');
  if (['danger', 'success'].includes(type)) {
    classList.value.push(`bg-${type}`);
  }
  message.value = text;

  setTimeout(() => {
    classList.value.splice(classList.value.indexOf('show'), 1);
    resolve();
  }, 1500);
});

useExpose({ show });
</script>
