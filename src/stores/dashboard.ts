import $http from "@/plugins/axios";
import type { AxiosError } from "axios";
import { defineStore } from "pinia";

export const useDashboardStore = defineStore({
  id: "dashboard",
  state: () => ({
    loanProductStats: [],
    loansByStatus: {
      count_of_applications: null,
      value_of_applications: null,
      count_of_disbursed: null,
      value_of_disbursed: null,
      count_of_approved: null,
      value_of_approved: null,
      count_of_pending: null,
      value_of_pending: null,
      count_of_rejected: null,
      value_of_rejected: null,
      count_of_defaults: null,
      value_of_defaults: null,
      count_of_written_off: null,
      value_of_written_off: null,
      count_of_fully_paid: null,
      value_of_fully_paid: null,
      count_of_due: null,
      value_of_due: null,
    },
    isLoading: false,
  }),
  getters: {
    getLoanProductStats: (state) => state.loanProductStats,
    getLoansByStatus: (state) => state.loansByStatus,
    getLoading: (state) => state.isLoading,
  },
  actions: {
    async fetchLoanProductStats() {
      try {
        const response = await $http.Api({
          method: "GET",
          url: "/loan-product/stats",
        });
        this.loanProductStats = response.data.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchLoansByStatus() {
      try {
        const response = await $http.Api({
          method: "GET",
          url: "/loan/stats/by-status",
        });
        this.loansByStatus = response.data.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },
  },
});
