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
        const response = await $http.Api2({
          method: "GET",
          url: `/template?type=${templateType}`,
          responseType: "blob",
        });
        console.log(response);
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = templateType;
        link.click();
        URL.revokeObjectURL(link.href);
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async batchImport(payload) {
      try {
        const response = await $http.Api({
          method: "POST",
          url: `/api/import/${payload.fileType}`,
          data: payload.file,
        });
        return response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },
  },
});
