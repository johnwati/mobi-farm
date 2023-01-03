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

    async downloadReport(payload) {
      try {
        const response = await $http.Api2({
          method: "GET",
          url: `/report?reportName=${payload.reportName}&format=${payload.format}`,
          responseType: "blob",
        });
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = payload.reportName;
        link.click();
        URL.revokeObjectURL(link.href);
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },

    async batchImport(payload) {
      try {
        const response = await $http.Api2(`/import/${payload.fileType}`, {
          method: "POST",
          data: payload.file,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // const response = await $http.Api2({
        //   method: "POST",
        //   url: `/import/${payload.fileType}`,
        //   data: {
        //     file: payload.file[0],
        //   },
        //   headers: {

        //   }
        //   // url: `/import/${payload.fileType}?file=${payload.file}`,
        // });
        return response.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err.response;
      }
    },
  },
});
