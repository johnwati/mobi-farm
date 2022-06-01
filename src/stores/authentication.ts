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
    // login(payload) {
    // async login(
    //   payload
    //   // payload: ILogin,
    // ): Promise<void> {
    //     try {
    //       const response = await $http.Authentication({
    //         method: 'POST',
    //         url: '/auth/local',
    //         data: payload,
    //       });
    //       const { jwt, user } = response.data;
    //       this.accessToken = jwt;
    //       this.role = user?.role?.type;
    //     } catch (error) {
    //       const err = error as AxiosError;
    //       throw err.response;
    //     }
    //   },
    // },
    async login(payload) {
      try {
        const response = await $http.Authentication({
          method: "POST",
          url: "/auth/user-login",
          data: payload,
        });
        //TODO --- handle saving token...
        console.log("log in", response.data);
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
        //TODO --- handle saving token...
        console.log("log out", response.data);
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },
  },
});
