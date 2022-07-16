import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { notification } from "ant-design-vue";

import router from "@/router";

const $http = {
  Authentication: axios.create({
    baseURL: import.meta.env.VITE_VUE_APP_API_BASE_URL + "/api/v1",
  }),

  Api: axios.create({
    baseURL: import.meta.env.VITE_VUE_APP_API_BASE_URL + "/api/v1",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  }),

  Api2: axios.create({
    baseURL: import.meta.env.VITE_VUE_APP_API_BASE_URL + "/api",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  }),

  Api3: axios.create({
    baseURL: import.meta.env.VITE_VUE_APP_API_BASE_URL,
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  }),
};

const accessToken = () => localStorage.getItem("access_token");

const authenticationInterceptor = (config: AxiosRequestConfig) => {
  // eslint-disable-next-line no-param-reassign
  config.headers = {
    Authorization: `Bearer ${accessToken()}`,
  };
  return config;
};
$http.Api.interceptors.request.use(authenticationInterceptor);
$http.Api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      router.push("/unauthorized").then(() => {
        localStorage.clear();
      });
      notification.error({
        message: "Error",
        description: error.response?.data?.error,
      });
    } else if (error.response.status === 403) {
      router.push("/forbidden");
      notification.error({
        message: "Error",
        description: error.response?.data?.error,
      });
    } else if (error.response.status === 500) {
      notification.error({
        message: "Error",
        description: error.response?.data?.error,
      });
      // router.push("/internal-server-error");
    }
    return Promise.reject(error);
  }
);

export default $http;
