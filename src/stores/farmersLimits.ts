import type { IFarmer, IFarmerRegistration } from "@/interfaces/farmers";
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
          url: "/farmers-limits",
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
          url: `/farmers-limits/${farmerId}`,
        });
        this.farmerLimits = response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async registerFarmerLimits(payload) {
      try {
        const response = await $http.Api({
          method: "POST",
          url: `/farmers-limits`,
          data: payload,
        });
        console.log("added farmer limits", response.data);
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async updateFarmerLimits(payload) {
      try {
        const response = await $http.Api({
          method: "PUT",
          url: `/farmers-limits/${payload.id}`,
          data: payload.data,
        });
        console.log("updated farmer limits", response.data);
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async deleteFarmerLimits(farmerId: number) {
      try {
        const response = await $http.Api({
          method: "DELETE",
          url: `/farmers-limits/${farmerId}`,
        });
        console.log("deleted farmer limit", response.data);
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },
  },
});
