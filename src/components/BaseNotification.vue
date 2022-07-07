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
import { useEventBus } from '@vueuse/core';

const { on: onShow } = useEventBus('notification-show');
const { emit, on: onHide } = useEventBus('notification-hide');
const message = ref('');
const classList = ref([]);

onShow(({ type, text }) => {
  classList.value = [];
  classList.value.push('show');
  if (['danger', 'success'].includes(type)) {
    classList.value.push(`bg--${type}`);
  }
  message.value = text;

  setTimeout(() => {
    emit();
  }, 1500);
});

onHide(() => {
  classList.value.splice(classList.value.indexOf('show'), 1);
  classList.value.push('none');
});
</script>
