import type { IFarmer, IFarmerRegistration } from "@/interfaces/farmers";
import $http from "@/plugins/axios";
import type { AxiosError } from "axios";
import { defineStore } from "pinia";

export const useBatchImportStore = defineStore({
  id: "batchImport",
  state: () => ({
    importTemplate: null,
    isLoading: false,
  }),
  getters: {
    getTemplate: (state) => state.importTemplate,
    getLoading: (state) => state.isLoading,
  },
  actions: {
    async generateTemplate(templateType: string) {
      try {
        const response = await $http.Api({
          method: "GET",
          url: `/api/template?type=${templateType}`,
        });
        this.importTemplate = response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },
  },
});
