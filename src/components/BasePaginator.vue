<template>
  <ul class="paginator">
    <li
      class="paginator__item"
      :class="{ disabled: current === start }"
      @click="goToPreviousPage"
      @keydown="onKeydown"
    >
      <a
        class="paginator__link"
        aria-label="Previous"
      >
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li
      v-if="start - 1 > 0"
      class="paginator__item disabled"
    >
      <a
        class="paginator__link"
      >
        ...
      </a>
    </li>
    <template
      v-for="n in (total >= 8 ? 8 : total)"
    >
      <li
        v-if="start <= end"
        :key="n"
        class="paginator__item"
        :class="{ active: (n + start - 1) === current }"
        @click="goToPage(n + start - 1)"
        @keydown="onKeydown"
      >
        <a
          class="paginator__link"
        >
          {{ n + start - 1 }}
        </a>
      </li>
    </template>
    <li
      v-if="total - end > 0 && total > maximumDisplayingPages"
      class="paginator__item disabled"
    >
      <a
        class="paginator__link"
      >
        ...
      </a>
    </li>
    <li
      class="paginator__item"
      :class="{ disabled: current === end }"
      @click="goToNextPage"
      @keydown="onKeydown"
    >
      <a
        class="paginator__link"
        aria-label="Next"
      >
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</template>

<script setup>
import { ref, toRefs } from 'vue';

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
const maximumDisplayingPages = ref(8);
const { currentPage: current, totalPages: total } = toRefs(props);

const updatePaginator = (page) => {
  start.value = page - maximumDisplayingPages.value / 2;
  end.value = page + maximumDisplayingPages.value / 2;
  if (start.value < 1) {
    start.value = 1;
    end.value = maximumDisplayingPages.value;
  }
  if (end.value > total.value) {
    start.value = total.value - (maximumDisplayingPages.value - 1) < 1
      ? 1 : total.value - (maximumDisplayingPages.value - 1);
    end.value = total.value;
  }
  emits('change', page);
};
const goToPreviousPage = () => {
  if (current.value > 1) {
    updatePaginator(current.value - 1);
  }
};
const goToPage = (page) => {
  if (page !== current.value) updatePaginator(page);
};
const goToNextPage = () => {
  if (current.value < total.value) {
    updatePaginator(current.value + 1);
  }
};
const onKeydown = () => {};
</script>
