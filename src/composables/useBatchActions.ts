import type { ComputedRef } from "vue";
import { computed } from "vue";

import { useBatchImportStore } from "@/stores/batchImport";

export default function useBatchActions(): {
  importTemplate: ComputedRef<unknown>;
  fetchBatchImportTemplate: (payload) => Promise<void>;
  batchImportData: (payload) => Promise<void>;
  downloadReport: (payload) => Promise<void>;
} {
  const store = useBatchImportStore();

  const importTemplate = computed(() => store.importTemplate);

  async function fetchBatchImportTemplate(payload): Promise<void> {
    try {
      await store.generateTemplate(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function batchImportData(payload): Promise<void> {
    try {
      await store.batchImport(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function downloadReport(payload): Promise<void> {
    try {
      await store.downloadReport(payload);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    importTemplate,
    fetchBatchImportTemplate,
    batchImportData,
    downloadReport,
  };
}
