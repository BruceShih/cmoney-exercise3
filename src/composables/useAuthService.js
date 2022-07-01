import axios from 'axios';
import { useAxios } from '@vueuse/integrations/useAxios';
import { useCookies } from '@vueuse/integrations/useCookies';
import store from '../store';

export default function useAuthService() {
  const login = (email, password) => {
    const instance = axios.create({
      headers: { 'Content-Type': 'application/json' },
    });

    const { data, isFinished } = useAxios(
      '/signin',
      {
        method: 'POST',
        data: { email, password },
      },
      instance,
    );

    if (isFinished.value) {
      const { get, set } = useCookies(['stegosaurus']);

      if (typeof get('stegosaurus') === 'string' && get('stegosaurus')) {
        set('stegosaurus', JSON.stringify(data));
        store.commit('auth/setUser', data);
        return true;
      }
    }

    return false;
  };

  const logout = () => {
    const { get, remove } = useCookies(['stegosaurus']);

    if (typeof get('stegosaurus') === 'string' && get('stegosaurus')) {
      remove('stegosaurus');
      store.commit('auth/clearUser');
      return true;
    }

    return false;
  };

  return {
    login,
    logout,
  };
}
