import $http from "@/plugins/axios";
import type { AxiosError } from "axios";
import { defineStore } from "pinia";

export const useEnumStore = defineStore({
  id: "enums",
  state: () => ({
    loanStatus: [
      {
        id: 1,
        name: "PENDING",
        label: null,
      },
      {
        id: 2,
        name: "APPROVED",
        label: null,
      },
      {
        id: 3,
        name: "REJECTED",
        label: null,
      },
      {
        id: 4,
        name: "DISBURSED",
        label: null,
      },
      {
        id: 5,
        name: "DEFAULTED",
        label: null,
      },
      {
        id: 6,
        name: "REVISED",
        label: null,
      },
      {
        id: 7,
        name: "FULLY_PAID",
        label: null,
      },
      {
        id: 8,
        name: "WRITTEN_OFF",
        label: null,
      },
      {
        id: 9,
        name: "REJECTED_AFTER_APPROVAL",
        label: null,
      },
      {
        id: 10,
        name: "UNCLEARED",
        label: null,
      },
      {
        id: 11,
        name: "DUE",
        label: null,
      },
      {
        id: 12,
        name: "PAID",
        label: null,
      },
      {
        id: 13,
        name: "APPLIED",
        label: null,
      },
      {
        id: 14,
        name: "ACTIVE",
        label: null,
      },
      {
        id: 15,
        name: "RUNNING",
        label: null,
      },
    ],
    paymentMethods: [],
    itemCategories: [],
    itemUom: [],
    agrodealerCurrencies: [],
    isLoading: false,
  }),
  getters: {
    getLoanStatus: (state) => state.loanStatus,
    getLoading: (state) => state.isLoading,
  },
  actions: {
    async fetchTransactions() {
      try {
        const response = await $http.Api({
          method: "GET",
          url: "/loan/status-enum",
        });
        this.loanStatus = response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchPaymentMethods() {
      try {
        const response = await $http.Api({
          method: "GET",
          url: "/loan/amortization-enum",
        });
        this.paymentMethods = response.data.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchItemCategories() {
      try {
        const response = await $http.Api3({
          method: "GET",
          url: "/items/$metadata",
        });
        this.itemCategories = response.data.data.categories;
        this.itemUom = response.data.data.uom;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchAgrodealerMeta() {
      try {
        const response = await $http.Api({
          method: "GET",
          url: "/Agrodealers/$metadata",
        });
        this.agrodealerCurrencies = response.data.data.currencies;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },
  },
});
