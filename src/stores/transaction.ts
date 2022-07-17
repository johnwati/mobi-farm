import $http from "@/plugins/axios";
import type { AxiosError } from "axios";
import { defineStore } from "pinia";

export const useTransactionStore = defineStore({
  id: "transactions",
  state: () => ({
    deposits: {
      content: [],
      total_elements: 0,
    },
    transactions: [],
    transaction: {},
    isLoading: false,
  }),
  getters: {
    getDeposits: (state) => state.deposits,
    getTransactions: (state) => state.transactions,
    getTransaction: (state) => state.transaction,
    getLoading: (state) => state.isLoading,
  },
  actions: {
    async fetchDeposits() {
      try {
        const response = await $http.Api({
          method: "GET",
          url: "/transaction?transactionType=DEPOSIT",
        });
        this.deposits = response.data.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchTransactions() {
      try {
        const response = await $http.Api({
          method: "GET",
          url: "/transaction",
        });
        this.transactions = response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchTransaction(code: string) {
      try {
        const response = await $http.Api({
          method: "GET",
          url: `/transaction/${code}`,
        });
        this.transaction = response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async updateFarmerLimits(payload) {
      try {
        const response = await $http.Api({
          method: "PUT",
          url: `/transaction/${payload.transactionNumber}`,
          data: payload.data,
        });
        console.log("updated transaction status", response.data);
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },
  },
});
