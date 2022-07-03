import { useAxios } from '@vueuse/integrations/useAxios';
import { useCookies } from '@vueuse/integrations/useCookies';
import useBaseAxiosInstance from './useBaseAxiosInstance';
import store from '../store';

export default function useAuthService() {
  const login = (email, password) => {
    const instance = useBaseAxiosInstance();

    return useAxios(
      '/signin',
      {
        method: 'POST',
        data: { email, password },
      },
      instance.value,
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
