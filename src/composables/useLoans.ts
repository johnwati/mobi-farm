import type { ComputedRef } from "vue";
import { computed } from "vue";
import { useLoansStore } from "@/stores/loans";
import { useEnumStore } from "@/stores/enums";

export default function useLoans(): {
  loan: ComputedRef<Record<string, string>>;
  loans: ComputedRef<Record<string, unknown>[]>;
  loanCount: ComputedRef<number>;
  loanStatusList: ComputedRef<Record<string, unknown>[]>;
  fetchLoans: (payload) => Promise<void>;
  updateLoanStatus: (payload) => Promise<void>;
  setLoan: (payload) => Promise<void>;
} {
  const store = useLoansStore();
  const enumStore = useEnumStore();

  const loanStatusList = computed(() => enumStore.getLoanStatus);

  const loans = computed(() => store.getLoans);

  const loanCount = computed(() => store.getLoanCount);

  const loan = computed(() => store.getLoan);

  async function setLoan(payload): Promise<void> {
    try {
      await store.setLoan(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchLoans(payload): Promise<void> {
    try {
      await store.fetchLoans(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateLoanStatus(payload): Promise<void> {
    try {
      await store.updateLoanStatus(payload);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    loans,
    loan,
    loanCount,
    loanStatusList,
    fetchLoans,
    setLoan,
    updateLoanStatus,
  };
}
