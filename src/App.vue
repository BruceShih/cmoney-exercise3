<template>
  <div id="app">
    <RouterView name="header" />
    <main>
      <RouterView />
    </main>

    <BaseLoader />
    <BaseNotification />
  </div>
</template>

<script setup>
import BaseLoader from './components/BaseLoader.vue';
import BaseNotification from './components/BaseNotification.vue';
</script>

<style lang="scss">
@import "./styles/main.scss";
</style>
