<template>
  <div class="wrapper">
    <div
      class="flex justify-center"
    >
      <h1>會員列表</h1>
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
          <th colspan="2">
            照片
          </th>
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
          :class="{ 'row-selected': selectedEmployees.includes(employee.id) }"
        >
          <td class="text-center">
            <label :for="`Employee${employee.id}`">
              <input
                :id="`Employee${employee.id}`"
                :name="`Employee${employee.id}`"
                :checked="selectedEmployees.includes(employee.id)"
                type="checkbox"
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
const { on: onEmployeeCreate } = useEventBus('employee-create');
const {
  defaultPageSize,
  getEmployees,
  getEmployeesWithPaging,
  getEmployeesByCountryAndGenderWithPaging,
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

const selectedEmployees = computed(() => store.getters['employeeStore/getEmployees']);

const updateSelect = (data) => {
  const uniques = new Set();
  totalItems.value = data.length;
  totalPages.value = Math.ceil(totalItems.value / defaultPageSize);
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
  getEmployees().then((res) => {
    const { data, error } = res;

    if (error.value) {
      emit({ type: 'danger', text: '讀取資料失敗！' });
    } else {
      updateSelect(data.value);
    }
  });
};
const getPagedEmployees = (page) => {
  getEmployeesWithPaging({ page }).then((res) => {
    const { data, error } = res;

    if (error.value) {
      emit({ type: 'danger', text: '讀取資料失敗！' });
    } else {
      employees.value = data.value;
    }
  });
};
const getPagedEmployeesWithFilter = () => {
  getEmployeesByCountryAndGenderWithPaging({
    country: selectedCountry.value,
    gender: selectedGender.value,
    page: currentPage.value,
  }).then((res) => {
    const { data, error } = res;

    if (error.value) {
      emit({ type: 'danger', text: '讀取資料失敗！' });
    } else {
      filteredItems.value = data.value.length;
      totalPages.value = Math.ceil(filteredItems.value / defaultPageSize);
      employees.value = data.value;
    }
  });
};
const onCountryChange = (event) => {
  if (event.target.selectedIndex > 0) getPagedEmployeesWithFilter();
  else {
    filteredItems.value = 0;
    getTotalEmployees();
    getPagedEmployees(1);
  }
};
const onGenderChange = (event) => {
  if (event.target.selectedIndex > 0) getPagedEmployeesWithFilter();
  else {
    filteredItems.value = 0;
    getTotalEmployees();
    getPagedEmployees(1);
  }
};
const onPageChange = (page) => {
  currentPage.value = page;
  if (selectedCountry.value !== 'All' || selectedGender.value !== 'a') {
    getPagedEmployeesWithFilter();
  } else {
    getPagedEmployees(page);
  }
};
const onCheckboxChange = (id, event) => {
  const tr = event.target.parentNode.parentNode.parentNode;

  if (event.target.checked === true) {
    store.commit('employeeStore/add', id);
    tr.classList.add('row-selected');
  } else {
    store.commit('employeeStore/remove', id);
    tr.classList.remove('row-selected');
  }
};
const openEditModal = (employee) => {
  showEditModal.value = true;
  selectedEmployee.value = employee;
};
const onDelete = (id) => {
  deleteEmployeeById(id).then((res) => {
    const { data, error } = res;

    if (error.value) {
      emit({ type: 'danger', text: '刪除失敗！' });
    } else {
      totalItems.value = data.value.length;
      totalPages.value = Math.ceil(totalItems.value / defaultPageSize);
      employees.value = data.value;

      emit({ type: 'success', text: '刪除成功' });

      getPagedEmployees(currentPage.value);
    }
  });
};
onEmployeeCreate((success) => {
  if (success) getPagedEmployees(currentPage.value);
});

onMounted(() => {
  if (totalItems.value === 0) getTotalEmployees();
  getPagedEmployees(1);
});
</script>

<style lang="scss" scoped>
</style>
