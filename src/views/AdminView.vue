<template>
  <div class="wrapper">
    <div
      class="flex justify-center"
    >
      <h1>會員列表</h1>
    </div>
    <div class="flex justify-start items-center mb-3">
      <label
        for="CountrySelector"
        class="mr-2"
      >
        <select
          id="CountrySelector"
          v-model="selectedCountry"
          name="CountrySelector"
          class="form-control"
          @change="onCountryChange"
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
          @change="onGenderChange"
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
        共 {{ totalItems }} 人
      </div>
    </div>
    <table class="table table-striped table-hover">
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
        >
          <td class="text-center">
            <label :for="`Employee${employee.id}`">
              <input
                :id="`Employee${employee.id}`"
                :name="`Employee${employee.id}`"
                type="checkbox"
                @change="onCheckboxChange(employee.id)"
              >
            </label>
          </td>
          <td>
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
    <BasePaginator
      :current-page="currentPage"
      :total-pages="totalPages"
      @change="onPageChange"
    />
    <EditEmployeeModal
      :show="showEditModal"
      :employee="selectedEmployee"
      @update:show="showEditModal = showEditModal ? !showEditModal : showEditModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import EditEmployeeModal from '@/components/admin/EditEmployeeModal.vue';
import BaseButton from '@/components/BaseButton.vue';
import BasePaginator from '../components/BasePaginator.vue';
import useEmployeeService from '../composables/useEmployeeService';
import store from '../store';

const {
  pageSize,
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

const showEditModal = ref(false);
const selectedEmployee = ref({});

const getTotalEmployees = () => {
  getEmployees().then((res) => {
    const { data, error } = res;

    if (error.value) {
      // notification.value.show('danger', '帳號或密碼有誤，請重新輸入！');
    } else {
      const uniques = new Set();
      totalItems.value = data.value.length;
      totalPages.value = Math.ceil(totalItems.value / pageSize);
      countries.value = data.value.filter((employee) => {
        const isDuplicate = uniques.has(employee.nat);
        uniques.add(employee.nat);
        if (!isDuplicate) return true;
        return false;
      }).map((employee) => ({
        nat: employee.nat,
        country: employee.location.country,
      }));

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
const getPagedEmployeesWithFilter = () => {
  getEmployeesByCountryAndGenderWithPaging(
    selectedCountry.value,
    selectedGender.value,
    currentPage.value,
  ).then((res) => {
    const { data, error } = res;

    if (error.value) {
      // notification.value.show('danger', '帳號或密碼有誤，請重新輸入！');
    } else {
      totalItems.value = data.value.length;
      totalPages.value = Math.ceil(totalItems.value / pageSize);
      employees.value = data.value;

      // notification.value.show('success', '登入成功');
    }
  });
};
const onCountryChange = () => {
  getPagedEmployeesWithFilter();
};
const onGenderChange = () => {
  getPagedEmployeesWithFilter();
};
const onPageChange = (page) => {
  currentPage.value = page;
  if (selectedCountry.value !== 'All' || selectedGender.value !== 'a') {
    getPagedEmployeesWithFilter();
  } else {
    getPagedEmployees(page);
  }
};
const onCheckboxChange = (id) => {
  store.commit('employeeStore/add', id);
};
const openEditModal = (employee) => {
  showEditModal.value = true;
  selectedEmployee.value = employee;
};
const onDelete = (id) => {
  deleteEmployeeById(id).then((res) => {
    const { data, error } = res;

    if (error.value) {
      // notification.value.show('danger', '帳號或密碼有誤，請重新輸入！');
    } else {
      totalItems.value = data.value.length;
      totalPages.value = Math.ceil(totalItems.value / pageSize);
      employees.value = data.value;

      // notification.value.show('success', '登入成功');
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
