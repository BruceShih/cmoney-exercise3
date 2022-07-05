import { ref, getCurrentInstance } from 'vue';
import axios from 'axios';

export default function useBaseAxiosInstance() {
  const vm = getCurrentInstance();
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { 'Content-Type': 'application/json' },
  });
  const loader = vm.proxy.$loader;

  instance.interceptors.request.use((config) => {
    loader.show();
    return config;
  }, (error) => Promise.reject(error));

  instance.interceptors.response.use((response) => {
    loader.hide();
    return response;
  }, (error) => {
    loader.hide();
    return Promise.reject(error);
  });

  return { instance: ref(instance) };
}
