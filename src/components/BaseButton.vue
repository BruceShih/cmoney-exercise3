<template>
  <button
    type="button"
    class="btn"
    :class="classes"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
import { computed } from '@vue/composition-api';

export default {
  props: {
    variant: {
      type: String,
      default: 'base',
      validator: (value) => ['base', 'primary', 'success', 'danger', 'gray', 'white', 'black'].includes(value),
    },
    outline: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    // reactivities
    const classes = computed(() => {
      const classList = [];
      if (props.variant) {
        classList.push(`btn-${props.variant}`);
      }
      if (props.outline) {
        classList.push(`btn-outline-${props.variant}`);
      }
      return classList;
    });

    // methods
    const handleClick = () => {
      emit('click');
    };

    return {
      classes,
      handleClick,
    };
  },
};
</script>
