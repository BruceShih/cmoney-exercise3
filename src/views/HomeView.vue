<template>
  <div class="wrapper">
    <div
      class="flex justify-center"
    >
      <h1>前端開發人力仲介</h1>
    </div>
    <div class="grid grid-column-8 grid-row-2 mb-4">
      <BaseCard
        v-for="employee in employees"
        :key="employee.id"
        @click="onCardClick(employee.location.coordinates)"
      >
        <template #card-top-overlay>
          <IconFemale v-if="employee.gender === 'female'" />
          <IconMale v-if="employee.gender === 'male'" />
        </template>
        <template #card-image>
          <img
            :src="employee.picture.large"
            :alt="employee.name.title + ' ' + employee.name.first + ' ' + employee.name.last"
          >
        </template>
        <template #card-bottom-overlay>
          {{ employee.name.first }} {{ employee.name.last }}
        </template>
        <template #card-title>
          <span dir="auto">{{ employee.location.country }}</span>
          <br>
          <span dir="auto">{{ employee.location.city }}</span>
        </template>
      </BaseCard>
    </div>
    <BasePaginator
      :current-page="currentPage"
      :total-pages="totalPages"
      @change="onPageChange"
    />
    <BaseModal
      :show="showMap"
      @update:show="showMap = showMap ? !showMap : showMap"
    >
      <GmapMap
        :center="{lat:10, lng:10}"
        :zoom="7"
        map-type-id="terrain"
        style="width: 500px; height: 300px"
      >
        <GmapMarker
          v-for="(m, index) in location"
          :key="index"
          :position="m.position"
          :clickable="true"
          :draggable="false"
          @click="center=m.position"
        />
      </GmapMap>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import IconFemale from '@/components/icons/IconFemale.vue';
import IconMale from '@/components/icons/IconMale.vue';
import BaseCard from '@/components/BaseCard.vue';
import BaseModal from '@/components/BaseModal.vue';
import BasePaginator from '../components/BasePaginator.vue';
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
const location = ref([]);
const showMap = ref(false);

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
const onCardClick = (coordinates) => {
  const { latitude, longitude } = coordinates;

  location.value = [];
  location.value.push({
    position: {
      lat: Number(latitude),
      lng: Number(longitude),
    },
  });

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
