import type { ComputedRef } from "vue";
import { computed } from "vue";
import { useTransactionStore } from "@/stores/transaction";

export default function useDeposits(): {
  deposits: ComputedRef<Record<string, unknown>>;
  // deposits: ComputedRef<unknown>;
  depositsCount: ComputedRef<number>;
  fetchDeposits: () => Promise<void>;
} {
  const transactionStore = useTransactionStore();

  const deposits = computed(() => transactionStore.deposits.content);

  const depositsCount = computed(
    () => transactionStore.deposits.total_elements
  );

  async function fetchDeposits(): Promise<void> {
    try {
      await transactionStore.fetchDeposits();
    } catch (error) {
      console.error(error);
    }
  }

  return {
    deposits,
    depositsCount,
    fetchDeposits,
  };
}
