import $http from "@/plugins/axios";
import type { AxiosError } from "axios";
import { defineStore } from "pinia";

export const useEnumStore = defineStore({
  id: "enums",
  state: () => ({
    loanStatus: [
      {
        // id: 1,
        text: "PENDING",
        value: "PENDING",
      },
      {
        // id: 2,
        text: "APPROVED",
        value: "APPROVED",
      },
      {
        // id: 3,
        text: "REJECTED",
        value: "REJECTED",
      },
      {
        // id: 4,
        text: "DISBURSED",
        value: "DISBURSED",
      },
      {
        // id: 5,
        text: "DEFAULTED",
        value: "DEFAULTED",
      },
      {
        // id: 6,
        text: "REVISED",
        value: "REVISED",
      },
      {
        // id: 7,
        text: "FULLY_PAID",
        value: "FULLY_PAID",
      },
      {
        // id: 8,
        text: "WRITTEN_OFF",
        value: "WRITTEN_OFF",
      },
      {
        // id: 9,
        text: "REJECTED_AFTER_APPROVAL",
        value: "REJECTED_AFTER_APPROVAL",
      },
      {
        // id: 10,
        text: "UNCLEARED",
        value: "UNCLEARED",
      },
      {
        // id: 11,
        text: "DUE",
        value: "DUE",
      },
      {
        // id: 12,
        text: "PAID",
        value: "PAID",
      },
      {
        // id: 13,
        text: "APPLIED",
        value: "APPLIED",
      },
      {
        // id: 14,
        text: "ACTIVE",
        value: "ACTIVE",
      },
      {
        // id: 15,
        text: "RUNNING",
        value: "RUNNING",
      },
    ],
    paymentMethods: [],
    itemCategories: [],
    itemUom: [],
    agrodealerCurrencies: [],
    isLoading: false,
  }),
  getters: {
    getLoanStatus: (state) => [...state.loanStatus],
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
