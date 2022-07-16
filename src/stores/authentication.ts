import $http from "@/plugins/axios";
import type { AxiosError } from "axios";
import { defineStore } from "pinia";

export const useAuthenticationStore = defineStore({
  id: "authentication",
  state: () => ({
    isAuthenticated: false,
    accessToken: "",
    username: "",
    role: "",
  }),
  getters: {
    getAccessToken: (state) => state.accessToken,
    getUsername: (state) => state.username,
    getRole: (state) => state.role,
  },
  actions: {
    async login(payload) {
      try {
        const response = await $http.Authentication({
          method: "POST",
          url: "/auth/user-login",
          data: payload,
        });
        const { access_token } = response.data;
        localStorage.setItem("access_token", access_token);
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async signup(payload) {
      try {
        const response = await $http.Authentication({
          method: "POST",
          url: "/auth/signup",
          data: payload,
        });
        //TODO --- handle saving token...
        console.log("sign up", response.data);
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async logOut() {
      try {
        const response = await $http.Authentication({
          method: "POST",
          url: "/auth/logout",
          // data: payload,
        });
        console.log("log out", response.data);
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },
  },
});
