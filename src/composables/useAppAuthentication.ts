import { useRouter } from "vue-router";

import { useAuthenticationStore } from "@/stores/authentication";
import jwt_decode from "jwt-decode";

import type { ILogin } from "@/interfaces/authentication";

export default function useAppAuthentication(): {
  loginUser?: (payload: ILogin) => Promise<void>;
  logout: () => void;
  hasPermission: (payload: string) => Promise<boolean>;
} {
  const { login } = useAuthenticationStore();

  const router = useRouter();

  const access_token = localStorage.getItem("access_token");

  const hasPermission = (permission: string) => {
    if (access_token) {
      const { realm_access } = jwt_decode(access_token || "") as any;
      const { roles } = realm_access;

      return roles.includes(permission);
    }
  };

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
    hasPermission,
  };
}
