<template>
  <div
    ref="modal"
    class="modal"
    :class="{ show: showModal }"
  >
    <div
      ref="modalBody"
      class="modal-body"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  toRefs,
  watch,
} from 'vue';
import { onClickOutside, onKeyStroke } from '@vueuse/core';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['update:show']);

const modal = ref(null);
const modalBody = ref(null);
const { show: showModal } = toRefs(props);

onClickOutside(modalBody, () => {
  emits('update:show', false);
});

onKeyStroke('Escape', () => {
  emits('update:show', false);
  document.body.classList.remove('overflow-hidden');
});

watch(() => showModal, (value) => {
  if (value) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }
});
</script>
