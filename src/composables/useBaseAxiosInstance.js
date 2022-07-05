import { ref } from 'vue';
import { useEventBus } from '@vueuse/core';
import axios from 'axios';

export default function useBaseAxiosInstance() {
  const { emit } = useEventBus('loader');
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { 'Content-Type': 'application/json' },
  });

  instance.interceptors.request.use((config) => {
    emit(true);
    return config;
  }, (error) => Promise.reject(error));

  instance.interceptors.response.use((response) => {
    emit(false);
    return response;
  }, (error) => {
    emit(false);
    return Promise.reject(error);
  });

  return { instance: ref(instance) };
}
