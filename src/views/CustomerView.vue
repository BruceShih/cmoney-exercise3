<template>
  <div class="wrapper">
    <div
      class="flex justify-center"
    >
      <h1>自選清單</h1>
    </div>
    <div class="flex justify-start items-center mb-4">
      <label
        for="CountrySelector"
        class="mr-2"
      >
        <select
          id="CountrySelector"
          v-model="selectedCountry"
          name="CountrySelector"
          class="form-control"
          @change="onCountryChange($event)"
        >
          <option
            value="All"
            selected
          >
            全部國家
          </option>
          <option
            v-for="(c, index) in countries"
            :key="index"
            :value="c.nat"
          >
            {{ c.country }}
          </option>
        </select>
      </label>
      <label for="GenderSelector">
        <select
          id="GenderSelector"
          v-model="selectedGender"
          name="GenderSelector"
          class="form-control"
          @change="onGenderChange($event)"
        >
          <option
            value="a"
            selected
          >
            全部性別
          </option>
          <option value="male">Male</option>
          <option value="female">Feale</option>
        </select>
      </label>
      <div
        class="flex-grow text-right"
      >
        <span v-if="filteredItems > 0">
          已篩選 {{ filteredItems }} 人，
        </span>
        <span>
          共 {{ totalItems }} 人
        </span>
      </div>
    </div>
    <table class="table table--striped table--hover mb-4">
      <thead>
        <tr>
          <th>已加入</th>
          <th>照片</th>
          <th>帳號</th>
          <th>姓名</th>
          <th>性別</th>
          <th>年齡</th>
          <th>國籍</th>
          <th>電子郵件</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="employee in employees"
          :key="employee.id"
        >
          <td class="text-center">
            <label :for="`Employee${employee.id}`">
              <input
                :id="`Employee${employee.id}`"
                :name="`Employee${employee.id}`"
                type="checkbox"
                checked
                @change="onCheckboxChange(employee.id, $event)"
              >
            </label>
          </td>
          <td class="w-10">
            <img
              :src="employee.picture.thumbnail"
              :alt="`${employee.name.first} ${employee.name.last}`"
            >
          </td>
          <td>{{ employee.login.username }}</td>
          <td dir="auto">
            {{ `${employee.name.first} ${employee.name.last}` }}
          </td>
          <td>{{ employee.gender }}</td>
          <td>{{ employee.dob.age }}</td>
          <td>{{ employee.location.country }}</td>
          <td>{{ employee.email }}</td>
          <td>
            <BaseButton
              class="mr-2"
              variant="gray"
              @click="openEditModal(employee)"
            >
              編輯
            </BaseButton>
            <BaseButton
              variant="danger"
              @click="onDelete(employee.id)"
            >
              刪除
            </BaseButton>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-center items-center">
      <BasePaginator
        :current-page="currentPage"
        :total-pages="totalPages"
        @change="onPageChange"
      />
    </div>
    <EditEmployeeModal
      :show="showEditModal"
      :employee="selectedEmployee"
      @update:show="showEditModal = showEditModal ? !showEditModal : showEditModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useEventBus } from '@vueuse/core';
import EditEmployeeModal from '../components/admin/EditEmployeeModal.vue';
import BaseButton from '../components/BaseButton.vue';
import BasePaginator from '../components/BasePaginator.vue';
import useEmployeeService from '../composables/useEmployeeService';
import store from '../store';

const { emit } = useEventBus('notification-show');
const {
  defaultPageSize,
  getEmployeesByIds,
  getEmployeesByIdsCountryAndGenderWithPaging,
  deleteEmployeeById,
} = useEmployeeService();

const countries = ref([]);
const employees = ref([]);
const selectedCountry = ref('All');
const selectedGender = ref('a');
const currentPage = ref(1);
const totalItems = ref(0);
const totalPages = ref(0);
const filteredItems = ref(0);

const showEditModal = ref(false);
const selectedEmployee = ref({});

const isFiltered = computed(() => selectedCountry.value !== 'All' || selectedGender.value !== 'a');
const updateSelect = (data) => {
  const uniques = new Set();
  countries.value = data.filter((employee) => {
    const isDuplicate = uniques.has(employee.nat);
    uniques.add(employee.nat);
    if (!isDuplicate) return true;
    return false;
  }).map((employee) => ({
    nat: employee.nat,
    country: employee.location.country,
  }));
};
const getTotalEmployees = () => {
  const ids = store.getters['employeeStore/getEmployees'];

  getEmployeesByIds({ ids }).then((res) => {
    const { data, error } = res;

    if (error.value) {
      emit({ type: 'danger', text: '讀取資料失敗！' });
    } else {
      updateSelect(data.value);
      totalItems.value = data.value.length;
      totalPages.value = Math.ceil(totalItems.value / defaultPageSize);
    }
  });
};
const getPagedEmployees = (page) => {
  const ids = store.getters['employeeStore/getEmployees'];

  getEmployeesByIdsCountryAndGenderWithPaging({
    ids,
    page: page || currentPage.value,
    country: selectedCountry.value,
    gender: selectedGender.value,
  }).then((res) => {
    const { data, error } = res;

    if (error.value) {
      emit({ type: 'danger', text: '讀取資料失敗！' });
    } else {
      if (isFiltered.value) {
        filteredItems.value = data.value.length;
        totalPages.value = Math.ceil(filteredItems.value / defaultPageSize);
      } else if (selectedCountry.value === 'All' && selectedGender.value === 'a') {
        getTotalEmployees();
        filteredItems.value = 0;
      }
      employees.value = data.value;
    }
  });
};
const onCountryChange = () => {
  currentPage.value = 1;
  getPagedEmployees(currentPage.value);
};
const onGenderChange = () => {
  currentPage.value = 1;
  getPagedEmployees(currentPage.value);
};
const onPageChange = (page) => {
  if (currentPage.value !== 1 && isFiltered.value) {
    currentPage.value = 1;
  } else currentPage.value = page;
  getPagedEmployees();
};
const onCheckboxChange = (id, event) => {
  if (event.target.checked === true) {
    store.commit('employeeStore/add', id);
  } else {
    store.commit('employeeStore/remove', id);
  }
  const ids = store.getters['employeeStore/getEmployees'];
  const total = Math.ceil(ids.length / defaultPageSize);
  if (total < totalPages.value) {
    currentPage.value -= 1;
    totalPages.value = total;
    if (currentPage.value < 1) currentPage.value = 1;
  }
  getPagedEmployees();
};
const openEditModal = (employee) => {
  showEditModal.value = true;
  selectedEmployee.value = employee;
};
const onDelete = (id) => {
  deleteEmployeeById(id).then((res) => {
    const { error } = res;

    if (error.value) {
      emit({ type: 'danger', text: '刪除失敗！' });
    } else {
      emit({ type: 'success', text: '刪除成功' });
      getPagedEmployees();
    }
  });
};

onMounted(() => {
  if (totalItems.value === 0) getTotalEmployees();
  getPagedEmployees(1);
});
</script>

<style lang="scss" scoped>
</style>
