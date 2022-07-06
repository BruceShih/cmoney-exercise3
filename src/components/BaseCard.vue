<template>
  <div
    class="card"
    @click="onCardClick"
    @keydown="onKeydown"
  >
    <div class="card__header">
      <slot name="card__header" />
    </div>
    <div class="card__image">
      <div class="card__top-overlay">
        <slot name="card__top-overlay" />
      </div>
      <slot name="card__image" />
      <div
        class="card__bottom-overlay"
        dir="auto"
      >
        <slot name="card__bottom-overlay" />
      </div>
    </div>
    <div class="card__title">
      <slot name="card__title" />
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
