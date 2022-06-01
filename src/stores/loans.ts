import type { IFarmer, IFarmerRegistration } from "@/interfaces/farmers";
import $http from "@/plugins/axios";
import type { AxiosError } from "axios";
import { defineStore } from "pinia";

interface CreateLoanPayload {
  farmer_id: number;
  loan_product_code: string;
  agrodealer_code: string;
  reason: string;
  requested_amount: number;
}

export const useLoansStore = defineStore({
  id: "loans",
  state: () => ({
    loans: {
      status: 200,
      message: "Success",
      data: [
        {
          farmer_id: 288,
          loan_product_code: "LP-XWZ48QVG",
          agrodealer_code: null,
          reason: "string",
          created_on: null,
          code: "LON-0QP5R2GPGFJ3",
          requested_amount: 1,
          interest_rate: 0,
          interest: 0,
          fees: 0,
          principal_amount: 1,
          total_amount: 1,
          installments: null,
          installment_amount: null,
          repayment_start_date: null,
          status: "APPROVED",
          payment_status: "PENDING",
          expected_completion_date: null,
          paid: 0,
          balance: 1,
          product_code: null,
          product_name: "Dairy Loan",
          applicant_name: "Mary Otieno",
          applicant_phone: "0708321651",
          applicant_address: null,
          applicant_email: null,
          applicant_code: "32711464",
          receiver_account_name: null,
          receiver_account_number: null,
          receiver_bank_name: null,
        },
        {
          farmer_id: 288,
          loan_product_code: "LP-XWZ48QVG",
          agrodealer_code: null,
          reason: "string",
          created_on: null,
          code: "LON-WKEJQBWJCCDR",
          requested_amount: 1,
          interest_rate: 0,
          interest: 0,
          fees: 0,
          principal_amount: 1,
          total_amount: null,
          installments: null,
          installment_amount: null,
          repayment_start_date: null,
          status: "PENDING",
          payment_status: "PENDING",
          expected_completion_date: null,
          paid: 0,
          balance: null,
          product_code: null,
          product_name: "Dairy Loan",
          applicant_name: "Mary Otieno",
          applicant_phone: "0708321651",
          applicant_address: null,
          applicant_email: null,
          applicant_code: "32711464",
          receiver_account_name: null,
          receiver_account_number: null,
          receiver_bank_name: "MPESA",
        },
        {
          farmer_id: 288,
          loan_product_code: "LP-XWZ48QVG",
          agrodealer_code: null,
          reason: "string",
          created_on: null,
          code: "LON-XVKOAJS3R6OY",
          requested_amount: 1,
          interest_rate: 0,
          interest: 0,
          fees: 0,
          principal_amount: 1,
          total_amount: null,
          installments: null,
          installment_amount: null,
          repayment_start_date: null,
          status: "PENDING",
          payment_status: "PENDING",
          expected_completion_date: null,
          paid: 0,
          balance: null,
          product_code: null,
          product_name: "Dairy Loan",
          applicant_name: "Mary Otieno",
          applicant_phone: "0708321651",
          applicant_address: null,
          applicant_email: null,
          applicant_code: "32711464",
          receiver_account_name: null,
          receiver_account_number: null,
          receiver_bank_name: "MPESA",
        },
        {
          farmer_id: 288,
          loan_product_code: "LP-XWZ48QVG",
          agrodealer_code: null,
          reason: "string",
          created_on: null,
          code: "LON-RSMRP7HFLPPY",
          requested_amount: 1000,
          interest_rate: 0,
          interest: 0,
          fees: 0,
          principal_amount: 1000,
          total_amount: null,
          installments: null,
          installment_amount: null,
          repayment_start_date: null,
          status: "PENDING",
          payment_status: "PENDING",
          expected_completion_date: null,
          paid: 0,
          balance: null,
          product_code: null,
          product_name: "Dairy Loan",
          applicant_name: "Mary Otieno",
          applicant_phone: "0708321651",
          applicant_address: null,
          applicant_email: null,
          applicant_code: "32711464",
          receiver_account_name: "string",
          receiver_account_number: "string",
          receiver_bank_name: "MPESA",
        },
        {
          farmer_id: 256,
          loan_product_code: "LP-XWZ48QVG",
          agrodealer_code: null,
          reason: "string",
          created_on: null,
          code: "LON-FUJUQ6PMKKQU",
          requested_amount: 1000,
          interest_rate: 0,
          interest: 0,
          fees: 0,
          principal_amount: 1000,
          total_amount: 1000,
          installments: null,
          installment_amount: null,
          repayment_start_date: null,
          status: "PAID",
          payment_status: "PAID",
          expected_completion_date: null,
          paid: 1000,
          balance: 0,
          product_code: null,
          product_name: "Dairy Loan",
          applicant_name: "string",
          applicant_phone: "+254726339982",
          applicant_address: null,
          applicant_email: null,
          applicant_code: "26446168",
          receiver_account_name: null,
          receiver_account_number: null,
          receiver_bank_name: null,
        },
        {
          farmer_id: 256,
          loan_product_code: "LP-XWZ48QVG",
          agrodealer_code: null,
          reason: "string",
          created_on: null,
          code: "LON-A1WGD11VCZAC",
          requested_amount: 4566,
          interest_rate: 0,
          interest: 0,
          fees: 0,
          principal_amount: 4566,
          total_amount: null,
          installments: null,
          installment_amount: null,
          repayment_start_date: null,
          status: "PENDING",
          payment_status: "PENDING",
          expected_completion_date: null,
          paid: 0,
          balance: null,
          product_code: null,
          product_name: "Dairy Loan",
          applicant_name: "string",
          applicant_phone: "+254726339982",
          applicant_address: null,
          applicant_email: null,
          applicant_code: "26446168",
          receiver_account_name: "string",
          receiver_account_number: "string",
          receiver_bank_name: "MPESA",
        },
      ],
      page_details: {
        page: 1,
        per_page: 20,
        total_page: 1,
        total_elements: 6,
        report_name: "Loan Requests",
      },
    },
    loan: {},
    loanStatusEnum: {},
    loansByStatus: {},
    loanAmortizationEnum: {},
    isLoading: false,
  }),
  getters: {
    getLoans: (state) => state.loans.data,
    getLoanCount: (state) => state.loans.page_details.total_elements,
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
