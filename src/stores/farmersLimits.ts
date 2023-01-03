import $http from "@/plugins/axios";
import type { AxiosError } from "axios";
import { defineStore } from "pinia";

export const useFarmerLimitsStore = defineStore({
  id: "farmersLimits",
  state: () => ({
    farmersLimits: [],
    farmerLimits: {},
    isLoading: false,
  }),
  getters: {
    getFarmersLimits: (state) => state.farmersLimits,
    getFarmerLimits: (state) => state.farmerLimits,
    getLoading: (state) => state.isLoading,
  },
  actions: {
    async fetchFarmersLimits() {
      try {
        const response = await $http.Api({
          method: "GET",
          url: "/farmer-limits",
        });
        this.farmersLimits = response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async fetchFarmerLimits(farmerId: number) {
      try {
        const response = await $http.Api({
          method: "GET",
          url: `/farmer-limits/${farmerId}`,
        });
        this.farmerLimits = response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async registerFarmerLimits(payload) {
      try {
        await $http.Api({
          method: "POST",
          url: `/farmer-limits`,
          data: payload,
        });
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

    async deleteFarmerLimits(farmerId: number) {
      try {
        await $http.Api({
          method: "DELETE",
          url: `/farmer-limits/${farmerId}`,
        });
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },
  },
});
