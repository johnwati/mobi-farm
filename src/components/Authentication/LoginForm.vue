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
    const router = useRouter();
    const { loginUser } = useAppAuthentication();
    const formState = reactive<FormState>({
      username: "",
      password: "",
      remember: true,
    });
    const onFinish = async (values: ILogin) => {
      console.log("Success:", values);
      try {
        const credentials = {
          username: values.username,
          password: values.password,
        };
        await loginUser(credentials);
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const onFinishFailed = (errorInfo: unknown) => {
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
