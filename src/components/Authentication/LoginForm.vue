<template>
  <a-form
    :model="formState"
    name="normal_login"
    class="login-form"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Username"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username">
        <template #prefix>
          <user-outlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>

    <!-- <div class="login-form-wrap">
      <a-form-item name="remember" no-style>
        <a-checkbox v-model:checked="formState.remember"
          >Remember me</a-checkbox
        >
      </a-form-item>
      <a class="login-form-forgot" href="">Forgot password</a>
    </div> -->

    <a-form-item>
      <a-button
        :disabled="disabled"
        type="primary"
        html-type="submit"
        class="login-form-button"
      >
        Log in
      </a-button>
      Or
      <a href="">register now!</a>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import useAppAuthentication from "@/composables/useAppAuthentication";
import type { ILogin } from "@/interfaces/authentication";
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}
export default defineComponent({
  name: "LoginForm",
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const route = useRouter();
    const { loginUser } = useAppAuthentication();
    const formState = reactive<FormState>({
      username: "",
      password: "",
      remember: true,
    });
    const onFinish = (values: ILogin) => {
      console.log("Success:", values);
      try {
        localStorage.setItem(
          "access_token",
          "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4Q0dtWGlsUlJaaUhFcm9hNkw1UDNILUZIZHhXS1hUdF9CQWNITUZ6a1lzIn0.eyJleHAiOjE2NTI3OTc5MzEsImlhdCI6MTY1Mjc5NzMzMSwianRpIjoiM2IyYTZmYjUtZDI1NS00M2Q0LTk3NGUtZGEzMjIzOTVlZWMxIiwiaXNzIjoiaHR0cDovL21vYmlmYXJtLWF1dGgtbGJsLTEwNzQyNjM4NS51cy1lYXN0LTEuZWxiLmFtYXpvbmF3cy5jb20vYXV0aC9yZWFsbXMvdHV0b3JpYWxzYnVkZHktZXhhbXBsZSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIxYjgwN2Y4My1lZjNjLTQxNjgtYWJjNy00OTg0MzY3YWFkMTEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ0dXRvcmlhbHNidWRkeS1hcHAiLCJzZXNzaW9uX3N0YXRlIjoiOWE1N2UxMWMtYjkyNS00NjJjLThhN2YtMDg5ODVmZmE1MjM2IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJzdHVkZW50IiwiZGVmYXVsdC1yb2xlcy10dXRvcmlhbHNidWRkeS1leGFtcGxlIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCBpZF9wYXNzcG9ydF9ubyBmYXJtZXJzIiwic2lkIjoiOWE1N2UxMWMtYjkyNS00NjJjLThhN2YtMDg5ODVmZmE1MjM2IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJET0IiOiIxMzMiLCJuYW1lIjoiVGVzdCBQZXJzb24iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0ZXN0dXNlciIsImdpdmVuX25hbWUiOiJUZXN0IiwiZmFtaWx5X25hbWUiOiJQZXJzb24iLCJlbWFpbCI6InRlc3R1c2VyIn0.gf8Vx0JHnhQk84PP4jQgD2VyD8_yTl-6HWPp2kkqoXj2XcVnAGNUVdPDUkqOMx9J0Me0djjzqifm0504vkbj93Fk2FzgHRxYLqKfg6Gr3PlMKqbJK4fCTZm4CnOjzPADrwJJDKFIePwQBWdYcpOy-2HBG-qqEt1lk3wZ8hTDMVigTkG7ScCnro3dfXbBN_JGxMXO_wSTdJA6jczXKCod244HYIsSzMLMdz5utJz0c4Q_8I5o49_yI6r-Aoute1_xvsA78E6bKHu8H_coT5PLj3dHzpr28VtciAhM5f6wb-BSoQpDj3067qXtABtXQfb7s5V2hp_03J-A6yXwRv62CQ"
        );
        const credentials = {
          username: values.username,
          password: values.password,
        };
        // loginUser(credentials);
        route.push("/farmers");
      } catch (error) {
        console.log(error);
      }
      // route.push("/dashboard");
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };
    const disabled = computed(() => {
      return !(formState.username && formState.password);
    });
    return {
      formState,
      onFinish,
      onFinishFailed,
      disabled,
    };
  },
});
</script>

<style>
/* #components-form-demo-normal-login .login-form {
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
} */
</style>
