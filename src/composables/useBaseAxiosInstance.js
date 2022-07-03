import { ref } from 'vue';
import axios from 'axios';

export default function useBaseAxiosInstance() {
  return ref(
    axios.create({
      baseURL: 'http://localhost:3000',
      headers: { 'Content-Type': 'application/json' },
    }),
  );
}
