import type { IFarmerRegistration } from "@/interfaces/farmers";
import $http from "@/plugins/axios";
import type { AxiosError } from "axios";
import { defineStore } from "pinia";

export const useFarmersStore = defineStore({
  id: "farmers",
  state: () => ({
    farmers: [],
    farmer: {},
    farmerLoans: {
      data: [],
      page_details: {
        total_elements: 0,
      },
    },
    farmerDeposits: {
      content: [],
      total_elements: 0,
    },
    farmerLoanPayments: {
      content: [],
      total_elements: 0,
    },
    farmerAccount: {},
    farmerAccountBalance: 10000,
    isLoading: false,
  }),
  getters: {
    getFarmers: (state) => state.farmers,
    getFarmerCount: (state) => state.farmers.length,
    getFarmerAccountBalance: (state) => state.farmerAccountBalance,
    getFarmerLoans: (state) => state.farmerLoans?.data,
    getFarmerLoansCount: (state) =>
      state.farmerLoans?.page_details?.total_elements,
    getFarmerDeposits: (state) => state.farmerDeposits?.content,
    getFarmerDepositCount: (state) => state.farmerDeposits?.total_elements,
    getFarmerLoanPayments: (state) => state.farmerLoanPayments?.content,
    getFarmerPaymentsCount: (state) => state.farmerLoanPayments?.total_elements,
    getFarmer: (state) => state.farmer,
    getLoading: (state) => state.isLoading,
  },
  actions: {
    async fetchFarmerAccount(payload) {
      try {
        const response = await $http.Api({
          method: "GET",
          url: `/farmer-account?includeClosed=${payload.includeClosed}&q=${payload.q}&type=${payload.type}&page=${payload.page}&pageSize=${payload.pageSize}`,
        });
        this.farmerAccount = response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchFarmerAccountBalance(farmerId: number) {
      try {
        const response = await $http.Api({
          method: "GET",
          url: `/farmer-account/${farmerId}/balance`,
        });
        this.farmerAccountBalance = response.data.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchFarmers() {
      try {
        const response = await $http.Api({
          method: "GET",
          url: "/farmers",
        });
        this.farmers = response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchFarmer(farmerId: number) {
      try {
        const response = await $http.Api({
          method: "GET",
          url: `/farmers/${farmerId}`,
        });
        this.farmer = response.data;
        return response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchFarmerbyPhone(phoneNumber: number) {
      try {
        const response = await $http.Api({
          method: "GET",
          url: `/farmers/get-farmer-by-phone-number/${phoneNumber}`,
        });
        this.farmer = response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchFarmerbyIdNumber(idNumber: string) {
      try {
        const response = await $http.Api({
          method: "GET",
          url: `/farmers/get-farmer-by-id-no/${idNumber}`,
        });
        this.farmer = response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchFarmerDeposits(farmerCode: string) {
      try {
        const response = await $http.Api({
          method: "GET",
          url: `/transaction?memberCode=${farmerCode}&transactionType=DEPOSIT`,
        });
        this.farmerDeposits = response.data.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchFarmerLoans(farmerCode: string) {
      try {
        const response = await $http.Api({
          method: "GET",
          url: `/loan?memberCode=${farmerCode}`,
        });
        this.farmerLoans = response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchFarmerLoanPayments(farmerCode: string) {
      try {
        const response = await $http.Api({
          method: "GET",
          url: `/transaction?memberCode=${farmerCode}&transactionType=PAYMENT`,
        });
        this.farmerLoanPayments = response.data.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async registerFarmer(payload: IFarmerRegistration) {
      try {
        const response = await $http.Api({
          method: "POST",
          url: `/farmers/bulk/register`,
          data: payload,
        });
        console.log("registered farmer", response.data);
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async updateFarmer(payload) {
      try {
        const response = await $http.Api({
          method: "PUT",
          url: `/farmers/${payload.id}`,
          data: payload.data,
        });
        console.log("registered farmer", response.data);
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

    async setFarmer(farmerItem) {
      try {
        console.log("setting farmer", farmerItem.id);
        this.farmer = farmerItem;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },
  },
});
