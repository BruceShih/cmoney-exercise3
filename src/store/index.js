import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import authStore from './modules/authStore';
import employeeStore from './modules/employeeStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authStore,
    employeeStore,
  },
  plugins: [createPersistedState()],
});
