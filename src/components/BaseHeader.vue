<template>
  <header class="header">
    <div class="header-logo">
      <img
        src="../assets/logo.png"
        alt="Logo"
      >
    </div>
    <nav
      v-if="isLoggedIn"
      class="header-nav"
    >
      <RouterLink to="/">
        首頁
      </RouterLink>
      <RouterLink to="/admin">
        會員列表
      </RouterLink>
      <RouterLink to="/customer">
        自選清單
      </RouterLink>
    </nav>
    <div class="header-profile">
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
        class="btn btn-white"
        to="/login"
      >
        登入
      </RouterLink>
    </div>
    <CreateEmployeeModal
      :show="showCreateModel"
    />
  </header>
</template>

<script setup>
import { ref, computed, getCurrentInstance } from 'vue';
import BaseButton from './BaseButton.vue';
import CreateEmployeeModal from './admin/CreateEmployeeModal.vue';
import useAuthService from '../composables/useAuthService';
import store from '../store';

const vm = getCurrentInstance();
const { logout } = useAuthService();

const showCreateModel = ref(false);
const isLoggedIn = computed(() => store.getters['authStore/isAuthenticated']);

const openCreateModal = () => {
  showCreateModel.value = true;
};
const doLogout = () => {
  logout();
  vm.proxy.$router.push('/login');
};
</script>
