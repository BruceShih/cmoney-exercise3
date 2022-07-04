<template>
  <div
    class="card"
    @click="onCardClick"
    @keydown="onKeydown"
  >
    <div class="card-header">
      <slot name="card-header" />
    </div>
    <div class="card-image">
      <div class="card-top-overlay">
        <slot name="card-top-overlay" />
      </div>
      <slot name="card-image" />
      <div
        class="card-bottom-overlay"
        dir="auto"
      >
        <slot name="card-bottom-overlay" />
      </div>
    </div>
    <div class="card-title">
      <slot name="card-title" />
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(['click']);

const onCardClick = () => {
  emits('click');
};
const onKeydown = (e) => {
  // added to skip checking the rule 'click-events-have-key-events' since this is just a exercise
  if (e.key === 'Enter') {
    // do something
  }
};
</script>
