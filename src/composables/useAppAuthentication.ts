import { useRouter } from "vue-router";

import { useAuthenticationStore } from "@/stores/authentication";

import type { ILogin } from "@/interfaces/authentication";

export default function useAppAuthentication(): {
  loginUser?: (payload: ILogin) => Promise<void>;
  logout: () => void;
} {
  const { login } = useAuthenticationStore();

  const router = useRouter();

  async function loginUser(payload: ILogin): Promise<void> {
    try {
      await login(payload);
      return;
    } catch (error) {
      console.error(error);
    }
  }

  function logout() {
    localStorage.clear();
    router.push("/login");
  }

  return {
    loginUser,
    logout,
  };
}
