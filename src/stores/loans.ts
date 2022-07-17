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
        const response = await $http.Api({
          method: "POST",
          url: `/loan`,
          data: payload,
        });
        console.log("create loan", response.data);
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async sendSmsStatement(farmerCode: string) {
      try {
        const response = await $http.Api({
          method: "POST",
          url: `/loan/${farmerCode}/sms-statement`,
        });
        console.log("sent SMS", response.data);
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async massLoan(payload) {
      try {
        const response = await $http.Api({
          method: "POST",
          url: `/loan/mass`,
          data: payload,
        });
        console.log("create loan", response.data);
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async lastLoanStatus(payload) {
      try {
        const response = await $http.Api({
          method: "POST",
          url: `/loan/last-loan-status`,
          data: payload,
        });
        console.log("last loan status", response.data);
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async farmerPayLoan(payload) {
      try {
        const response = await $http.Api({
          method: "POST",
          url: `/loan/farmer-pay-loan`,
          data: payload,
        });
        console.log("pay loan", response.data);
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async updateLoanStatus(payload) {
      try {
        const response = await $http.Api({
          method: "PUT",
          url: `/loan/status/${payload.code}`,
          data: payload.data,
        });
        console.log("updated loan status", response.data);
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async deleteFarmer(farmerId: number) {
      try {
        const response = await $http.Api({
          method: "DELETE",
          url: `/farmers/${farmerId}`,
        });
        console.log("deleted farmer", response.data);
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async setLoan(loan) {
      try {
        console.log("setting loan", loan);
        this.loan = loan;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },
  },
});
