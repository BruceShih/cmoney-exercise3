<template>
  <button
    type="button"
    :class="classes"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'base',
    validator: (value) => ['base', 'primary', 'success', 'danger', 'gray', 'white', 'black'].includes(value),
  },
  outline: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['click']);

// reactivities
const classes = computed(() => {
  const classList = ['btn'];
  if (props.variant) {
    if (props.outline) {
      classList.push(`btn-outline-${props.variant}`);
    } else {
      classList.push(`btn-${props.variant}`);
    }
  }
  return classList;
});

// methods
const handleClick = () => {
  emits('click');
};
</script>
