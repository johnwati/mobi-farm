// import { computed, ComputedRef } from "vue";
// import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { useAuthenticationStore } from "@/stores/authentication";

import type { ILogin } from "@/interfaces/authentication";

export default function useAppAuthentication(): {
  // accessToken?: ComputedRef<string>;
  // username?: ComputedRef<string>;
  // schoolId?: ComputedRef<number>;
  // teacherId?: ComputedRef<number>;
  loginUser?: (payload: ILogin) => Promise<void>;
  logout: () => void;
} {
  const { login } = useAuthenticationStore();
  // const store = useStore();

  // const router = useRouter();

  // const accessToken = computed(
  //   (): string => store.getters["Authentication/getAccessToken"]
  // );

  // const username = computed(
  //   (): string => store.getters["Authentication/getUsername"]
  // );

  // const schoolId = computed(
  //   (): number => store.getters["Authentication/getSchoolId"]
  // );

  // const teacherId = computed(
  //   (): number => store.getters["Authentication/getTeacherId"]
  // );

  async function loginUser(payload: ILogin): Promise<void> {
    try {
      await login(payload);
    } catch (error) {
      console.error(error);
    }
  }

  function logout() {
    localStorage.clear();
    // router.push("/login");
  }

  return {
    // accessToken,
    // username,
    // schoolId,
    // teacherId,
    loginUser,
    logout,
  };
}
