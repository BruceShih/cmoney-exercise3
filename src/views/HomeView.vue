<template>
  <div class="wrapper">
    <div
      class="flex justify-center"
    >
      <h1>前端開發人力仲介</h1>
    </div>
    <div class="grid grid-8 mb-4">
      <div
        v-for="employee in employees"
        :key="employee.id"
        class="card"
      >
        <img
          class="card-image"
          :src="employee.picture.large"
          :alt="employee.name.title + ' ' + employee.name.first + ' ' + employee.name.last"
        >
        <div class="card-title">
          <small>{{ employee.location.country }}</small>
          <br>
          <small>{{ employee.location.city }}</small>
        </div>
      </div>
    </div>
    <BasePaginator
      :current-page="currentPage"
      :total-pages="totalPages"
      @change="onPageChange"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BasePaginator from '@/components/BasePaginator.vue';
import useEmployeeService from '../composables/useEmployeeService';

const {
  pageSize,
  getEmployees,
  getEmployeesWithPaging,
} = useEmployeeService();

// const countries = ref([]);
const employees = ref([]);
const currentPage = ref(1);
const totalItems = ref(0);
const totalPages = ref(0);

const getTotalEmployees = () => {
  getEmployees().then((res) => {
    const { data, error } = res;

    if (error.value) {
      // notification.value.show('danger', '帳號或密碼有誤，請重新輸入！');
    } else {
      totalItems.value = data.value.length;
      totalPages.value = Math.ceil(totalItems.value / pageSize);
      // countries.value = [...new Set(data.value
      //   .map((item) => item.location).map((item) => item.country))];

      // notification.value.show('success', '登入成功');
    }
  });
};
const getPagedEmployees = (page) => {
  getEmployeesWithPaging(page).then((res) => {
    const { data, error } = res;

    if (error.value) {
      // notification.value.show('danger', '帳號或密碼有誤，請重新輸入！');
    } else {
      employees.value = data.value;

      // notification.value.show('success', '登入成功');
    }
  });
};
const onPageChange = (page) => {
  currentPage.value = page;
  getPagedEmployees(page);
};

onMounted(() => {
  if (totalItems.value === 0) getTotalEmployees();
  getPagedEmployees(1);
});
</script>
