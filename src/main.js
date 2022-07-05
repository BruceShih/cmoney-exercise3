import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import App from './App.vue';
import BaseLoader from './components/BaseLoader';
import router from './router';
import store from './store';

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_MAP_API_KEY,
    libraries: 'places',
  },
});

Vue.component('BaseLoader', BaseLoader);

Vue.config.productionTip = false;
Vue.$loader = BaseLoader.methods;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
