<template>
  <authentication-layout>
    <template #content>
      <a-typography-title :level="3" strong>
        Login to your account
      </a-typography-title>
      <login-form />
    </template>
  </authentication-layout>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { LoginForm } from "@/components/Authentication";
import AuthenticationLayout from "@/layouts/AuthenticationLayout.vue";
export default defineComponent({
  name: "LoginPage",
  components: {
    LoginForm,
    AuthenticationLayout,
  },
});
</script>

<style>
.gr-bg {
  background: rgb(4, 76, 125);
  background: linear-gradient(
    355deg,
    rgba(4, 76, 125, 1) 0%,
    rgba(50, 135, 185, 1) 31%,
    rgba(0, 215, 209, 1) 100%
  );
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#components-form-demo-normal-login .login-form-forgot {
  margin-bottom: 24px;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
