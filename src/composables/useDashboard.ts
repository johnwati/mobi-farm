import { capitalize, computed, type ComputedRef } from "vue";
// import { } from "vue";

import { useDashboardStore } from "@/stores/dashboard";

export default function useDashboard(): {
  loanProductSeries: ComputedRef;
  statusCountSeries: ComputedRef;
  statusValueSeries: ComputedRef;
  approvedLoans: ComputedRef<number>;
  approvedLoansValue: ComputedRef<number>;
  mostPopularLoanProduct: ComputedRef;
  fetchLoanProductStats: () => Promise<void>;
  fetchLoansByStatus: () => Promise<void>;
} {
  const store = useDashboardStore();

  const approvedLoans = computed(() => {
    return store.getLoansByStatus?.count_of_approved;
  });

  const approvedLoansValue = computed(() => {
    return store.getLoansByStatus?.value_of_approved;
  });

  const mostPopularLoanProduct = computed(() => {
    const popular = store.getLoanProductStats.reduce((a, b) => {
      return (a = a > b.total_requests ? a : b.total_requests);
    }, 0);
    const value = store.getLoanProductStats.filter(
      (i) => i.total_requests === popular
    )[0]?.name;
    return value;
  });

  const loanProductSeries = computed(() => {
    return store.getLoanProductStats.map((i) => ({
      name: capitalize(i.name),
      y: i.total_requested_amount,
    }));
  });

  const statusCountSeries = computed(() => {
    console.log(
      Object.entries(store.getLoansByStatus)
        .filter((i) => i[0].startsWith("count"))
        .map((i) => ({
          name: capitalize(i[0].replace("count_of_", "").replace("_", " ")),
          y: i[1],
        }))
    );
    return Object.entries(store.getLoansByStatus)
      .filter((i) => i[0].startsWith("count"))
      .map((i) => ({
        name: capitalize(i[0].replace("count_of_", "").replace("_", " ")),
        y: i[1],
      }));
  });

  const statusValueSeries = computed(() => {
    console.log(store.getLoansByStatus);
    return Object.entries(store.getLoansByStatus)
      .filter((i) => i[0].startsWith("value"))
      .map((i) => ({
        name: capitalize(i[0].replace("value_of_", "").replace("_", " ")),
        y: i[1],
      }));
  });

  async function fetchLoanProductStats(): Promise<void> {
    try {
      await store.fetchLoanProductStats();
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchLoansByStatus(): Promise<void> {
    try {
      await store.fetchLoansByStatus();
    } catch (error) {
      console.error(error);
    }
  }

  return {
    statusValueSeries,
    statusCountSeries,
    loanProductSeries,
    approvedLoans,
    approvedLoansValue,
    mostPopularLoanProduct,
    fetchLoanProductStats,
    fetchLoansByStatus,
  };
}
