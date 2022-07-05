<template>
  <div class="wrapper">
    <form
      class="login-form"
      @submit.prevent="submit"
    >
      <img
        class="mb-4"
        src="../assets/logo.png"
        alt="Logo"
      >
      <fieldset class="login-form-fields">
        <legend>請登入</legend>
        <label for="email">
          <span>Email</span>
          <input
            id="email"
            v-model="email"
            class="form-control"
            type="text"
            name="email"
            placeholder="olivier@mail.com"
            required
          >
        </label>
        <label for="password">
          <span>Password</span>
          <input
            id="password"
            v-model="password"
            class="form-control"
            type="password"
            name="password"
            placeholder="somepassword"
            required
          >
        </label>

        <div class="login-form-buttons">
          <button
            class="btn btn-primary"
            type="submit"
          >
            送出
          </button>
          <input
            class="btn btn-outline-primary"
            type="reset"
            value="清除"
          >
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import { useEventBus } from '@vueuse/core';
import useAuthService from '../composables/useAuthService';
import store from '../store';

const vm = getCurrentInstance();
const { emit: onShowEmit } = useEventBus('notification-show');
const { emit: onHideEmit } = useEventBus('notification-hide');
const { login } = useAuthService();

const email = ref('');
const password = ref('');

const submit = () => {
  if (!email.value && !password.value) {
    return;
  }

  login(email.value, password.value).then(
    (res) => {
      const { data, error } = res;
      const { set } = useCookies(['stegosaurus']);

      if (error.value) {
        onShowEmit({ type: 'danger', text: '帳號或密碼有誤，請重新輸入！' });
      } else {
        set('stegosaurus', JSON.stringify(data.value), {
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        store.commit('authStore/setUser', data.value);
        onShowEmit({ type: 'success', text: '登入成功' });
        setTimeout(() => {
          onHideEmit();
          vm.proxy.$router.push('/');
        }, 1500);
      }
    },
  );
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 300px;
  height: 100%;
  text-align: center;

  > .login-form-fields {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border: none;
    width: 100%;

    > legend {
      text-align: center;
    }

    > label {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      > span {
        display: none;
      }

      > input {
        flex-grow: 1;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }

      + label {
        > input {
          border-top: none;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          border-bottom-left-radius: $form-border-radius;
          border-bottom-right-radius: $form-border-radius;
        }
      }
    }

    > .login-form-buttons {
      margin-top: 1rem;
      display: flex;
      flex-direction: row;
      width: 100%;

      > .btn {
        flex-grow: 1;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;

        + .btn {
          border-left: none;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-top-right-radius: $button-border-radius;
          border-bottom-right-radius: $button-border-radius;
        }
      }
    }
  }
}
</style>
