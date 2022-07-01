<template>
  <div class="container">
    <form class="login-form">
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
            class="form-control"
            type="password"
            name="password"
            placeholder="密碼"
            required
          >
        </label>

        <div class="login-form-buttons">
          <BaseButton
            variant="primary"
          >
            送出
          </BaseButton>
          <BaseButton
            variant="base"
            outline
          >
            清除
          </BaseButton>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue';
</script>

<style lang="scss" scoped>
.container {
  justify-content: center;

  .login-form {
    text-align: center;
    width: 300px;

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

        > button {
          flex-grow: 1;
        }
      }
    }
  }
}
</style>
