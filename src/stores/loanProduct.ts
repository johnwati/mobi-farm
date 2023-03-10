import $http from "@/plugins/axios";
import type { AxiosError } from "axios";
import { defineStore } from "pinia";

export const useLoanProductStore = defineStore({
  id: "loanProducts",
  state: () => ({
    loanProducts: [],
    loanProduct: {},
    loanProductFees: [],
    loanProductStats: [],
    isLoading: false,
  }),
  getters: {
    getLoading: (state) => state.isLoading,
  },
  actions: {
    async fetchLoanProduct(code: string) {
      try {
        const response = await $http.Api({
          method: "GET",
          url: `/loan-product/${code}`,
        });
        this.loanProduct = response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchLoanFees() {
      try {
        const response = await $http.Api2({
          method: "GET",
          url: `/loan-fees`,
        });
        this.loanProductFees = response.data.content;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchLoanProducts(payload) {
      try {
        const response = await $http.Api({
          method: "GET",
          url: `/loan-product?code=${payload.code}&name=${payload.name}&loanType=${payload.loanType}&page=${payload.page}&pageSize=${payload.pageSize}`,
        });
        this.loanProducts = response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchLoanProductStats() {
      try {
        const response = await $http.Api({
          method: "GET",
          url: `/loan-product/stats`,
        });
        this.loanProductStats = response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async createLoanProduct(payload) {
      try {
        await $http.Api({
          method: "POST",
          url: `/loan-product`,
          data: payload,
        });
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async updateLoanProduct(payload) {
      try {
        await $http.Api({
          method: "PUT",
          url: `/loan-product/${payload.code}`,
          data: payload.data,
        });
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },
  },
});
