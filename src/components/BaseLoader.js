import { ref, h } from 'vue';
import useExpose from '../composables/useExpose';

export default {
  setup() {
    const loader = ref(null);

    const show = () => {
      loader.value.classList.add('show');
    };
    const hide = () => {
      loader.value.classList.remove('show');
    };

    useExpose({ show, hide });

    return h('div', {
      ref: 'loader',
      class: 'loader',
    }, [
      h('svg', {
        viewBox: '0 0 100 100',
      }, [
        h('circle', {
          cx: '50',
          cy: '50',
          r: '25',
          strokeWidth: '8',
          fill: 'none',
        }),
      ]),
    ]);
  },
};
