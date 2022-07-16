/* eslint-disable @typescript-eslint/ban-types */
import type { ComputedRef } from "vue";
import { computed } from "vue";
import { useFarmersStore } from "@/stores/farmers";

import type { IFarmerDGResponse } from "@/interfaces/farmers";

export default function useFarmers(): {
  farmers: ComputedRef;
  farmer: ComputedRef;
  farmerCount: ComputedRef<number>;
  farmerAccountBalance: ComputedRef<number>;
  farmerDeposits: ComputedRef<Record<string, unknown>[]>;
  farmerDepositCount: ComputedRef<number>;
  farmerLoanPayments: ComputedRef<Record<string, unknown>[]>;
  farmerPaymentsCount: ComputedRef<number>;
  farmerLoans: ComputedRef<Record<string, unknown>[]>;
  farmerLoansCount: ComputedRef<number>;
  fetchFarmers: () => Promise<void>;
  fetchFarmer: (id: number) => Promise<string>;
  fetchFarmerLoans: (code: string) => Promise<void>;
  fetchLoanPayments: (id: number) => Promise<void>;
  fetchDeposits: (id: number) => Promise<void>;
  updateFarmer: (payload: Record<string, unknown>) => Promise<void>;
  createFarmer: (payload) => Promise<void>;
  setFarmer: (payload) => Promise<void>;
  deleteFarmer: (payload: number) => Promise<void>;
} {
  const store = useFarmersStore();

  const farmers = computed(() => store.getFarmers);

  const farmer = computed(() => store.getFarmer);

  const farmerCount = computed(() => store.getFarmerCount);

  const farmerLoans = computed(() => store.getFarmerLoans);

  const farmerLoansCount = computed(() => store.getFarmerLoansCount);

  const farmerAccountBalance = computed(() => store.getFarmerAccountBalance);

  const farmerDeposits = computed(() => store.getFarmerDeposits);

  const farmerDepositCount = computed(() => store.getFarmerDepositCount);

  const farmerLoanPayments = computed(() => store.getFarmerLoanPayments);

  const farmerPaymentsCount = computed(() => store.getFarmerPaymentsCount);

  async function setFarmer(farmer: IFarmerDGResponse): Promise<void> {
    try {
      store.setFarmer(farmer);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchFarmers(): Promise<void> {
    try {
      await store.fetchFarmers();
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchDeposits(payload): Promise<void> {
    try {
      await store.fetchFarmerDeposits(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchLoanPayments(payload): Promise<void> {
    try {
      await store.fetchFarmerLoanPayments(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchFarmerLoans(code: string): Promise<void> {
    try {
      await store.fetchFarmerLoans(code);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchFarmer(id: number): Promise<string> {
    try {
      return await store.fetchFarmer(id);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateFarmer(payload): Promise<void> {
    try {
      await store.updateFarmer(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function createFarmer(payload): Promise<void> {
    try {
      await store.registerFarmer(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteFarmer(payload: number): Promise<void> {
    try {
      await store.deleteFarmer(payload);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    farmers,
    farmer,
    farmerCount,
    farmerDeposits,
    farmerDepositCount,
    farmerAccountBalance,
    farmerLoanPayments,
    farmerPaymentsCount,
    farmerLoans,
    farmerLoansCount,
    setFarmer,
    fetchFarmers,
    fetchFarmer,
    updateFarmer,
    createFarmer,
    deleteFarmer,
    fetchDeposits,
    fetchLoanPayments,
    fetchFarmerLoans,
  };
}
