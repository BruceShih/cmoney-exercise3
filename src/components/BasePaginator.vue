<template>
  <ul class="paginator">
    <li
      class="paginator__item"
      :class="{ disabled: currentPage === start }"
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
    <li
      v-for="n in pages"
      :key="n"
      class="paginator__item"
      :class="{ active: n === currentPage }"
      @click="goToPage(n)"
      @keydown="onKeydown"
    >
      <a
        class="paginator__link"
      >
        {{ n }}
      </a>
    </li>
    <li
      v-if="totalPages - end > 0"
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
      :class="{ disabled: currentPage === end }"
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
import {
  ref,
  computed,
} from 'vue';

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

const length = ref(8);
const start = computed(() => {
  if (props.currentPage - length.value / 2 < 1) {
    return 1;
  }
  return props.currentPage - length.value / 2;
});
const end = computed(() => {
  if (props.currentPage + length.value / 2 > props.totalPages) {
    return props.totalPages;
  }
  return props.currentPage + length.value / 2;
});
const pages = computed(() => {
  const arr = [];
  for (let i = start.value; i <= end.value; i += 1) {
    arr.push(i);
  }
  return arr;
});

const updatePaginator = (page) => {
  emits('change', page);
};
const goToPreviousPage = () => {
  if (props.currentPage > 1) {
    updatePaginator(props.currentPage - 1);
  }
};
const goToPage = (page) => {
  if (page !== props.currentPage) updatePaginator(page);
};
const goToNextPage = () => {
  if (props.currentPage < props.totalPages) {
    updatePaginator(props.currentPage + 1);
  }
};
const onKeydown = () => {};
</script>
