import { ref, getCurrentInstance } from 'vue';
import axios from 'axios';

export default function useBaseAxiosInstance() {
  const vm = getCurrentInstance();
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { 'Content-Type': 'application/json' },
  });
  const loader = ref(null);
  const hideLoader = () => {
    if (loader.value) {
      loader.value.hide();
      loader.value = null;
    }
  };

  instance.interceptors.request.use((config) => {
    loader.value = vm.proxy.$loading.show();
    return config;
  }, (error) => Promise.reject(error));

  instance.interceptors.response.use((response) => {
    hideLoader();
    return response;
  }, (error) => {
    hideLoader();
    return Promise.reject(error);
  });

  return { instance: ref(instance) };
}
