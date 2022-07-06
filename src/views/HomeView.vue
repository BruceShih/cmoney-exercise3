<template>
  <div class="wrapper">
    <div
      class="flex justify-center"
    >
      <h1>前端開發人力仲介</h1>
    </div>
    <div class="grid grid-column-8 grid-row-2 grid-gap-2 mb-4">
      <BaseCard
        v-for="employee in employees"
        :key="employee.id"
        @click="onCardClick(employee)"
      >
        <template #card__top-overlay>
          <IconFemale v-if="employee.gender === 'female'" />
          <IconMale v-if="employee.gender === 'male'" />
        </template>
        <template #card__image>
          <img
            :src="employee.picture.large"
            :alt="`${employee.name.title} ${employee.name.first} ${employee.name.last}`"
          >
        </template>
        <template #card__bottom-overlay>
          {{ employee.name.first }} {{ employee.name.last }}
        </template>
        <template #card__title>
          <span dir="auto">{{ employee.location.country }}</span>
          <br>
          <span dir="auto">{{ employee.location.city }}</span>
        </template>
      </BaseCard>
    </div>
    <div class="flex justify-center items-center">
      <BasePaginator
        :current-page="currentPage"
        :total-pages="totalPages"
        @change="onPageChange"
      />
    </div>
    <BaseModal
      :show="showMap"
      no-header
      @update:show="showMap = showMap ? !showMap : showMap"
    >
      <template #modal-text>
        <div
          class="flex flex-row justify-start items-start mb-3"
        >
          <img
            class="employee-avatar"
            :src="selectedEmployee.avatar"
            :alt="selectedEmployee.name"
          >
          <div class="w-100">
            <span
              class="inline-block w-100"
              dir="auto"
            >
              {{ selectedEmployee.name }}
            </span><br>
            <span>Gender: {{ selectedEmployee.gender }}</span><br>
            <span>Email: {{ selectedEmployee.email }}</span><br>
            <span>Phone: {{ selectedEmployee.phone }}</span><br>
            <span>Age: {{ selectedEmployee.age }}</span>
          </div>
        </div>
        <GmapMap
          :center="{lat:10, lng:10}"
          :zoom="7"
          map-type-id="terrain"
          style="width: 500px; height: 300px"
        >
          <GmapMarker
            :position="selectedEmployee.location"
            :clickable="true"
            :draggable="false"
            @click="center=selectedEmployee.location"
          />
        </GmapMap>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useEventBus } from '@vueuse/core';
import IconFemale from '../components/icons/IconFemale.vue';
import IconMale from '../components/icons/IconMale.vue';
import BaseCard from '../components/BaseCard.vue';
import BaseModal from '../components/BaseModal.vue';
import BasePaginator from '../components/BasePaginator.vue';
import useEmployeeService from '../composables/useEmployeeService';

const { emit } = useEventBus('notification-show');
const {
  getEmployees,
  getEmployeesWithPaging,
} = useEmployeeService();

const employees = ref([]);
const currentPage = ref(1);
const totalItems = ref(0);
const totalPages = ref(0);
const pageSize = ref(20);
const selectedEmployee = ref({});
const showMap = ref(false);

const getTotalEmployees = () => {
  getEmployees().then((res) => {
    const { data, error } = res;

    if (error.value) {
      emit({ type: 'danger', text: '讀取資料失敗！' });
    } else {
      totalItems.value = data.value.length;
      totalPages.value = Math.ceil(totalItems.value / pageSize.value);
    }
  });
};
const getPagedEmployees = (page) => {
  getEmployeesWithPaging({ page, pageSize: pageSize.value }).then((res) => {
    const { data, error } = res;

    if (error.value) {
      emit({ type: 'danger', text: '讀取資料失敗！' });
    } else {
      employees.value = data.value;
    }
  });
};
const onCardClick = (employee) => {
  const emp = {
    avatar: employee.picture.large,
    name: `${employee.name.first} ${employee.name.last}`,
    gender: employee.gender.charAt(0).toUpperCase() + employee.gender.slice(1),
    email: employee.email,
    phone: employee.cell,
    age: employee.dob.age,
    location: {
      lat: Number(employee.location.coordinates.latitude),
      lng: Number(employee.location.coordinates.longitude),
    },
  };

  selectedEmployee.value = emp;
  showMap.value = true;
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

<style lang="scss" scoped>
.employee-avatar {
  border-radius: 0.25rem;
  margin-right: 1rem;
}
</style>
