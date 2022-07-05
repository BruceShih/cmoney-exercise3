<template>
  <div class="flex justify-center items-center paginator">
    <BaseButton
      variant="primary"
      outline
      :disabled="current === start"
      @click="goToPreviousPage"
    >
      «
    </BaseButton>
    <BaseButton
      v-if="start - 1 > 0"
      variant="primary"
      outline
      disabled
    >
      ...
    </BaseButton>
    <template
      v-for="n in (total >= 8 ? 8 : total)"
    >
      <BaseButton
        v-if="start <= end"
        :key="n"
        :class="{ active: (n + start - 1) === current }"
        variant="primary"
        outline
        @click="goToPage(n + start - 1)"
      >
        {{ n + start - 1 }}
      </BaseButton>
    </template>
    <BaseButton
      v-if="total - end > 0"
      variant="primary"
      outline
      disabled
    >
      ...
    </BaseButton>
    <BaseButton
      variant="primary"
      outline
      :disabled="current === end"
      @click="goToNextPage"
    >
      »
    </BaseButton>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue';
import BaseButton from './BaseButton.vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(['change']);

const start = ref(1);
const end = ref(1);
const { currentPage: current, totalPages: total } = toRefs(props);

// watch(() => total, (newValue) => {
//   if (newValue.value < 8) end.value = newValue.value;
//   else end.value = 8;
// });

const updatePaginator = (page) => {
  start.value = page - 4;
  end.value = page + 4;
  if (start.value < 1) {
    start.value = 1;
    end.value = 8;
  }
  if (end.value > total.value) {
    start.value = total.value - 7;
    end.value = total.value;
  }
  emits('change', page);
};
const goToPreviousPage = () => {
  if (current.value > 1) {
    current.value -= 1;
    updatePaginator(current.value);
  }
};
const goToPage = (page) => {
  current.value = page;
  updatePaginator(page);
};
const goToNextPage = () => {
  if (current.value < total.value) {
    current.value += 1;
    updatePaginator(current.value);
  }
};
</script>
