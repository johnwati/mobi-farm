import type { ComputedRef } from "vue";
import { computed } from "vue";
// import { useStore } from "vuex";
// import { useRouter } from "vue-router";

import type { IFarmer } from "@/interfaces/farmers";
import type { ILoan } from "@/interfaces/loans";
import { useLoansStore } from "@/stores/loans";
import { useEnumStore } from "@/stores/enums";
import { useTransactionStore } from "@/stores/transaction";

export default function useDeposits(): {
  // deposits: ComputedRef<Record<string, unknown>>;
  deposits: ComputedRef<unknown>;
  depositsCount: ComputedRef<number>;
} {
  const store = useLoansStore();
  const enumStore = useEnumStore();
  const transactionStore = useTransactionStore();

  const deposits = computed(() => transactionStore.deposits.content);

  const depositsCount = computed(
    () => transactionStore.deposits.total_elements
  );

  return {
    deposits,
    depositsCount,
  };
}
