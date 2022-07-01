<template>
  <header class="header">
    <div class="header-logo">
      <img
        src="../assets/logo.png"
        alt="Logo"
      >
    </div>
    <nav class="header-nav">
      <RouterLink to="/">
        Home
      </RouterLink>
      <RouterLink to="/admin">
        Admin
      </RouterLink>
      <RouterLink to="/customer">
        Customer
      </RouterLink>
    </nav>
    <BaseButton
      variant="base"
      @click="handleLogin"
    >
      登入
    </BaseButton>
  </header>
</template>

<script>
import BaseButton from './BaseButton.vue';

export default {
  name: 'BaseHeader',
  components: { BaseButton },
  setup() {
    const handleLogin = () => {
      console.log('login');
    };

    return {
      handleLogin,
    };
  },
};
</script>
