<template>
  <form
    class="login-form"
    @submit="submit"
  >
    <img
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
          placeholder="電子郵件"
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
          placeholder="密碼"
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
          class="btn btn-base btn-outline"
          type="reset"
          value="清除"
        >
      </div>
    </fieldset>

    <BaseNotification ref="notification" />
  </form>
</template>

<script setup>
import { ref } from 'vue';
import BaseNotification from '@/components/BaseNotification.vue';
import useAuthService from '../composables/useAuthService';
import useRoute from '../composables/useRoute';

const { login } = useAuthService();
const { router } = useRoute();

const email = ref('');
const password = ref('');

const notification = ref(null);

const submit = (e) => {
  e.preventDefault();

  const result = login(email.value, password.value);
  if (result) {
    notification.value.show('success', '登入成功');

    setTimeout(() => {
      router.push('/admin');
    }, 2500);
  } else {
    notification.value.show('danger', '帳號或密碼有誤，請重新輸入！');
  }
};
</script>

<style lang="scss" scoped>
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
      }
    }

    > .login-form-buttons {
      margin-top: 1rem;
      display: flex;
      flex-direction: row;
      width: 100%;

      > * {
        flex-grow: 1;
      }
    }
  }
}
</style>
