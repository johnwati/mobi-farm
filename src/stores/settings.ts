import $http from "@/plugins/axios";
import type { AxiosError } from "axios";
import { defineStore } from "pinia";

export const useSettingsStore = defineStore({
  id: "settings",
  state: () => ({
    farmerLimit: {},
    farmerLimits: [],
    loanProduct: {},
    loanProducts: {
      content: [],
      total_elements: 0,
    },
    agroDealer: {},
    agroDealers: {
      data: [],
      page_details: {
        total_elements: 0,
      },
    },
    currency: {},
    currencies: {
      content: [],
      total_elements: 0,
    },
    item: {},
    items: {
      content: [],
      page_details: {
        total_elements: 0,
      },
    },
  }),
  getters: {
    farmerLimitsCount: (state) => state.farmerLimits?.length || 0,
    getLoanProducts: (state) => state.loanProducts?.content || [],
    getLoanProductsCount: (state) => state.loanProducts?.total_elements || 0,
    getAgroDealers: (state) => state.agroDealers?.data || [],
    getAgroDealersCount: (state) =>
      state.agroDealers?.page_details?.total_elements || 0,
    getCurrencies: (state) => state.currencies?.content || [],
    getCurrenciesCount: (state) => state.currencies?.total_elements || 0,
    getItems: (state) => state.items?.content || [],
    getItemsCount: (state) => state.items?.page_details?.total_elements || 0,
  },
  actions: {
    async fetchFarmerLimits() {
      try {
        const response = await $http.Api({
          method: "GET",
          url: "/farmer-limits?status=true",
        });
        this.farmerLimits = response.data.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async updateFarmerLimits(payload) {
      try {
        await $http.Api({
          method: "PUT",
          url: `/farmer-limits/${payload.id}`,
          data: payload.data,
        });
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    // async deleteFarmerLimits(payload) {
    //   try {
    //     await $http.Api({
    //       method: "DELETE",
    //       url: `/farmer-limits/${payload.id}`,
    //     });
    //   } catch (error) {
    //     const err = error as AxiosError;
    //     throw err.response;
    //   }
    // },

    async fetchLoanProducts() {
      try {
        const response = await $http.Api({
          method: "GET",
          url: "/loan-product",
        });
        this.loanProducts = response.data.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchAgroDealers() {
      try {
        const response = await $http.Api({
          method: "GET",
          url: "/Agrodealers",
        });
        this.agroDealers = response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchAgroDealer(payload) {
      try {
        const response = await $http.Api({
          method: "GET",
          url: `/Agrodealers/${payload}`,
        });
        this.agroDealer = response.data.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async createAgroDealer(payload) {
      try {
        const response = await $http.Api({
          method: "POST",
          url: `/Agrodealers`,
          data: payload,
        });
        return response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async updateAgroDealer(payload) {
      try {
        const response = await $http.Api({
          method: "PUT",
          url: `/Agrodealers/${payload.id}`,
          data: payload.data,
        });
        this.agroDealer = response.data.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchCurrencies() {
      try {
        const response = await $http.Api({
          method: "GET",
          url: "/currencies",
        });
        this.currencies = response.data.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async createCurrency(payload) {
      try {
        await $http.Api({
          method: "POST",
          url: `currencies`,
          data: payload,
        });
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async updateCurrency(payload) {
      try {
        await $http.Api({
          method: "PUT",
          url: `currencies/${payload.id}`,
          data: payload.data,
        });
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchItems() {
      try {
        const response = await $http.Api3({
          method: "GET",
          url: "/items",
        });
        this.items = response.data.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async createItem(payload) {
      try {
        const response = await $http.Api3({
          method: "POST",
          url: "/items",
          data: payload,
        });
        return response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async updateItem(payload) {
      try {
        const response = await $http.Api3({
          method: "PUT",
          url: `/items/${payload.id}`,
          data: payload.data,
        });
        return response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async setAgroDealer(payload) {
      try {
        this.agroDealer = payload;
      } catch (error) {
        console.error(error);
      }
    },

    async setCurrency(payload) {
      try {
        this.currency = payload;
      } catch (error) {
        console.error(error);
      }
    },

    setFarmerLimit(payload) {
      try {
        this.farmerLimit = payload;
      } catch (error) {
        console.error(error);
      }
    },

    async setItem(payload) {
      try {
        this.item = payload;
      } catch (error) {
        console.error(error);
      }
    },

    async setLoanProduct(payload) {
      try {
        this.loanProduct = payload;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
