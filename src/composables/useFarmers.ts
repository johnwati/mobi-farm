// import { computed, ComputedRef } from "vue";
import { computed } from "vue";
// import { useStore } from "vuex";
// import { useRouter } from "vue-router";
import { useFarmersStore } from "@/stores/farmers";

import type {
  IFarmer,
  IFarmerDGResponse,
  IFarmerRegistration,
} from "@/interfaces/farmers";

export default function useFarmers(): {
  farmers: IFarmer[];
  farmer: IFarmer;
  farmerCount: number;
  farmerAccountBalance: number;
  farmerDeposits: [];
  farmerDepositCount: number;
  farmerLoanPayments: [];
  farmerPaymentsCount: number;
  fetchFarmers: () => Promise<void>;
  fetchFarmer: (id: number) => Promise<void>;
  updateFarmer: (payload: IFarmer) => Promise<void>;
  createFarmer: (payload: IFarmerRegistration) => Promise<void>;
  setFarmer: (payload: IFarmerDGResponse) => Promise<void>;
  deleteFarmer: (payload: number) => Promise<void>;
  // farmerId: ComputedRef<number>;
} {
  const store = useFarmersStore();

  // const router = useRouter();

  const farmers = computed(() => store.getFarmers);

  const farmer = computed(() => store.getFarmer);

  const farmerCount = computed(() => store.getFarmerCount);

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

  async function fetchFarmer(id: number): Promise<void> {
    try {
      await store.fetchFarmer(id);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateFarmer(payload: IFarmer): Promise<void> {
    try {
      await store.updateFarmer(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function createFarmer(payload: IFarmerRegistration): Promise<void> {
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
    setFarmer,
    fetchFarmers,
    fetchFarmer,
    updateFarmer,
    createFarmer,
    deleteFarmer,
  };
}
