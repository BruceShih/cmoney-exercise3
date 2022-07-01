import { getCurrentInstance } from 'vue';

export default function useRoute() {
  const vm = getCurrentInstance();
  return { route: vm.proxy.$route, router: vm.proxy.$router };
}
