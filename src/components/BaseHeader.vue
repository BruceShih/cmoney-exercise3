<template>
  <header class="header">
    <div class="header__logo">
      <RouterLink to="/">
        <img
          src="../assets/logo.png"
          alt="Logo"
        >
      </RouterLink>
    </div>
    <nav
      v-if="isLoggedIn"
      class="header__nav"
    >
      <RouterLink to="/">
        首頁
      </RouterLink>
      <RouterLink to="/admin">
        會員列表
      </RouterLink>
      <RouterLink
        v-if="hasSelection"
        to="/customer"
      >
        自選清單
      </RouterLink>
    </nav>
    <div class="header__profile">
      <BaseButton
        v-if="isLoggedIn"
        variant="white"
        class="mr-2"
        @click="openCreateModal"
      >
        +
      </BaseButton>
      <BaseButton
        v-if="isLoggedIn"
        variant="primary"
        @click="doLogout"
      >
        登出
      </BaseButton>
      <RouterLink
        v-else
        class="btn btn--white"
        to="/login"
      >
        登入
      </RouterLink>
    </div>
    <CreateEmployeeModal
      :show="showCreateModel"
      @update:show="showCreateModel = showCreateModel ? !showCreateModel : showCreateModel"
    />
  </header>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  getCurrentInstance,
} from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import BaseButton from './BaseButton.vue';
import CreateEmployeeModal from './admin/CreateEmployeeModal.vue';
import useAuthService from '../composables/useAuthService';
import store from '../store';

const vm = getCurrentInstance();
const { logout } = useAuthService();

const showCreateModel = ref(false);
const isLoggedIn = computed(() => store.getters['authStore/isAuthenticated']);
const hasSelection = computed(() => store.getters['employeeStore/getEmployees'].length > 0);

const openCreateModal = () => {
  showCreateModel.value = true;
};
const doLogout = () => {
  logout();
  if (vm.proxy.$route.path !== '/') {
    vm.proxy.$router.push('/');
  }
};

onMounted(() => {
  const { get } = useCookies(['stegosaurus']);
  if (!get('stegosaurus')) {
    store.commit('authStore/clearUser');
  }
});
</script>
