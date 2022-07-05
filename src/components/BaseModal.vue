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
      <div
        v-if="!noHeader"
        class="modal-header"
        :class="[headerTextClass, headerBgClass]"
      >
        <slot name="modal-header" />
      </div>
      <div class="model-text">
        <slot name="modal-text" />
      </div>
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
  noHeader: {
    type: Boolean,
    default: false,
  },
  headerTextClass: {
    type: String,
    default: 'text-black',
  },
  headerBgClass: {
    type: String,
    default: 'bg-white',
  },
});

const emits = defineEmits(['update:show']);

const modal = ref(null);
const modalBody = ref(null);
const {
  show: showModal, noHeader, headerTextClass, headerBgClass,
} = toRefs(props);

onClickOutside(modalBody, () => {
  emits('update:show', false);
});

onKeyStroke('Escape', () => {
  emits('update:show', false);
  document.body.classList.remove('overflow-hidden');
});

watch(() => showModal, (newValue) => {
  if (newValue.value) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }
});
</script>
