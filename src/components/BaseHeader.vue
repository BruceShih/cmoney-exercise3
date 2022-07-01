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
    <RouterLink
      class="btn btn-base"
      to="/login"
    >
      登入
    </RouterLink>
  </header>
</template>

<script setup>
</script>
