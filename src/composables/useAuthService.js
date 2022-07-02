import axios from 'axios';
import { useAxios } from '@vueuse/integrations/useAxios';
import { useCookies } from '@vueuse/integrations/useCookies';
import store from '../store';

export default function useAuthService() {
  const login = (email, password) => {
    const instance = axios.create({
      baseURL: 'http://localhost:3000',
      headers: { 'Content-Type': 'application/json' },
    });

    return useAxios(
      '/signin',
      {
        method: 'POST',
        data: { email, password },
      },
      instance,
    );
  };

  const logout = () => {
    const { get, remove } = useCookies(['stegosaurus']);

    if (get('stegosaurus')) {
      remove('stegosaurus');
      store.commit('authStore/clearUser');
    }
  };

  return {
    login,
    logout,
  };
}
