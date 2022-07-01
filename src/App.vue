<template>
  <div id="app">
    <BaseHeader />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script>
import BaseHeader from './components/BaseHeader.vue';

export default {
  components: {
    BaseHeader,
  },
};
</script>

<style lang="scss">
@import "./styles/main.scss";
</style>
