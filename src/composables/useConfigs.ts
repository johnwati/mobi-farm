import type { ComputedRef } from "vue";
import { computed } from "vue";

import { useEnumStore } from "@/stores/enums";

export default function useConfigs(): {
  paymentMethods: ComputedRef<unknown>;
  itemCategories: ComputedRef<unknown>;
  itemUom: ComputedRef<unknown>;
  agrodealerCurrencies: ComputedRef<unknown>;
  fetchPaymentMethods: () => Promise<void>;
  fetchItemCategories: () => Promise<void>;
  fetchAgrodealerMeta: () => Promise<void>;
} {
  const enumStore = useEnumStore();

  const paymentMethods = computed(() => enumStore.paymentMethods);
  const itemCategories = computed(() => enumStore.itemCategories);
  const itemUom = computed(() => enumStore.itemUom);
  const agrodealerCurrencies = computed(() => enumStore.agrodealerCurrencies);

  async function fetchPaymentMethods(): Promise<void> {
    try {
      await enumStore.fetchPaymentMethods();
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchItemCategories(): Promise<void> {
    try {
      await enumStore.fetchItemCategories();
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchAgrodealerMeta(): Promise<void> {
    try {
      await enumStore.fetchAgrodealerMeta();
    } catch (error) {
      console.error(error);
    }
  }

  return {
    paymentMethods,
    itemCategories,
    itemUom,
    agrodealerCurrencies,
    fetchPaymentMethods,
    fetchItemCategories,
    fetchAgrodealerMeta,
  };
}
