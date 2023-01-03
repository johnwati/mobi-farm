import $http from "@/plugins/axios";
import type { AxiosError } from "axios";
import { defineStore } from "pinia";

export const useLoansStore = defineStore({
  id: "loans",
  state: () => ({
    loans: {
      data: [],
      page_details: {
        total_elements: 0,
      },
    },
    loan: {},
    loanStatusEnum: {},
    loansByStatus: {},
    loanAmortizationEnum: {},
    isLoading: false,
  }),
  getters: {
    getLoans: (state) => state.loans?.data,
    getLoanCount: (state) => state.loans?.page_details?.total_elements,
    getLoan: (state) => state.loan,
    getLoading: (state) => state.isLoading,
  },
  actions: {
    async fetchLoans(payload) {
      try {
        const response = await $http.Api({
          method: "GET",
          url: `/loan?code=${payload.code}&memberCode=${payload.memberCode}&loanStatus=${payload.loanStatus}&page=${payload.page}&pageSize=${payload.pageSize}`,
        });
        this.loans = response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchLoan(loanId: string) {
      try {
        const response = await $http.Api({
          method: "GET",
          url: `/loan/${loanId}`,
        });
        this.loan = response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchLoanStatusEnum() {
      try {
        const response = await $http.Api({
          method: "GET",
          url: `/loan/status-enum`,
        });
        this.loanStatusEnum = response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchLoanStatsTrends() {
      try {
        const response = await $http.Api({
          method: "GET",
          url: `/loan/stats/trends`,
        });
        this.loanStatusEnum = response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchLoansbyStatus(payload) {
      try {
        const response = await $http.Api({
          method: "GET",
          url: `/loan?code=${payload.code}&memberCode=${payload.memberCode}&loanStatus=${payload.loanStatus}&page=${payload.page}&pageSize=${payload.pageSize}`,
        });
        this.loansByStatus = response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchLoanAmortization() {
      try {
        const response = await $http.Api({
          method: "GET",
          url: `/loan/amortization-enum`,
        });
        this.loanAmortizationEnum = response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async createLoan(payload) {
      try {
        await $http.Api({
          method: "POST",
          url: `/loan`,
          data: payload,
        });
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async sendSmsStatement(farmerCode: string) {
      try {
        await $http.Api({
          method: "POST",
          url: `/loan/${farmerCode}/sms-statement`,
        });
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async massLoan(payload) {
      try {
        await $http.Api({
          method: "POST",
          url: `/loan/mass`,
          data: payload,
        });
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async lastLoanStatus(payload) {
      try {
        await $http.Api({
          method: "POST",
          url: `/loan/last-loan-status`,
          data: payload,
        });
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async farmerPayLoan(payload) {
      try {
        await $http.Api({
          method: "POST",
          url: `/loan/farmer-pay-loan`,
          data: payload,
        });
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async updateLoanStatus(payload) {
      try {
        await $http.Api({
          method: "PUT",
          url: `/loan/status/${payload.code}`,
          data: payload.data,
        });
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async deleteFarmer(farmerId: number) {
      try {
        await $http.Api({
          method: "DELETE",
          url: `/farmers/${farmerId}`,
        });
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async setLoan(loan) {
      try {
        this.loan = loan;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },
  },
});
