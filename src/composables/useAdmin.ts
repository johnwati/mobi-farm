import type { ComputedRef } from "vue";
import { computed } from "vue";
// import { useStore } from "vuex";
// import { useRouter } from "vue-router";

import { useSettingsStore } from "@/stores/settings";
import { useFarmerLimitsStore } from "@/stores/farmersLimits";
import { useLoanProductStore } from "@/stores/loanProduct";

export default function useAdmin(): {
  loanProduct: ComputedRef;
  loanProducts: ComputedRef<Record<string, unknown>[]>;
  loanProductsCount: ComputedRef<number>;
  farmerLimit: ComputedRef;
  farmerLimits: ComputedRef<Record<string, unknown>[]>;
  farmerLimitsCount: ComputedRef<number>;
  agroDealer: ComputedRef;
  agroDealers: ComputedRef<Record<string, unknown>[]>;
  agroDealersCount: ComputedRef<number>;
  currency: ComputedRef;
  currencies: ComputedRef<Record<string, unknown>[]>;
  currenciesCount: ComputedRef<number>;
  item: ComputedRef;
  items: ComputedRef<Record<string, unknown>[]>;
  itemsCount: ComputedRef<number>;
  loanFee: ComputedRef;
  loanFees: ComputedRef<Record<string, unknown>[]>;
  loanFeesCount: ComputedRef<number>;
  tenure: ComputedRef;
  tenureList: ComputedRef<Record<string, unknown>[]>;
  tenureListCount: ComputedRef<number>;
  createFarmerLimit: (payload) => Promise<void>;
  createCurrency: (payload) => Promise<void>;
  createLoanProduct: (payload) => Promise<void>;
  createAgroDealer: (payload) => Promise<void>;
  createItem: (payload) => Promise<void>;
  createLoanFees: (payload) => Promise<void>;
  createTenure: (payload) => Promise<void>;
  fetchFarmerLimits: () => Promise<void>;
  fetchLoanProducts: () => Promise<void>;
  fetchAgroDealers: () => Promise<void>;
  fetchAgroDealer: (id: number) => Promise<void>;
  fetchItems: () => Promise<void>;
  // fetchItem: () => Promise<void>;
  fetchCurrencies: () => Promise<void>;
  fetchLoanFees: () => Promise<void>;
  fetchTenure: () => Promise<void>;
  setFarmerLimit: (payload) => Promise<void>;
  setLoanProduct: (payload) => Promise<void>;
  setAgroDealer: (payload) => Promise<void>;
  setItem: (payload) => Promise<void>;
  setCurrency: (payload) => Promise<void>;
  setLoanFee: (payload) => Promise<void>;
  setTenure: (payload) => Promise<void>;
  updateFarmerLimits: (payload) => Promise<void>;
  updateLoanProduct: (payload) => Promise<void>;
  updateAgroDealer: (payload) => Promise<void>;
  updateItem: (payload) => Promise<void>;
  updateLoanFees: (payload) => Promise<void>;
  updateTenure: (payload) => Promise<void>;
  updateCurrency: (payload) => Promise<void>;
  deleteFarmerLimits: (payload) => Promise<void>;
  // deleteLoanProduct: (payload) => Promise<void>;
  // deleteAgroDealer: (payload) => Promise<void>;
  // deleteItem: (payload) => Promise<void>;
  // deleteCurrency: (payload) => Promise<void>;
} {
  const store = useSettingsStore();
  const limitStore = useFarmerLimitsStore();
  const loanProductStore = useLoanProductStore();

  const farmerLimit = computed(() => store.farmerLimit);

  const farmerLimits = computed(() => store.farmerLimits);

  const farmerLimitsCount = computed(() => store.farmerLimits.length);

  const agroDealers = computed(() => store.getAgroDealers);

  const agroDealer = computed(() => store.agroDealer);

  const agroDealersCount = computed(() => store.getAgroDealersCount);

  const loanProduct = computed(() => store.loanProduct);

  const loanProducts = computed(() => store.getLoanProducts);

  const loanProductsCount = computed(() => store.getLoanProductsCount);

  const currency = computed(() => store.currency);

  const currencies = computed(() => store.getCurrencies);

  const currenciesCount = computed(() => store.getCurrenciesCount);

  const item = computed(() => store.item);

  const items = computed(() => store.getItems);

  const itemsCount = computed(() => store.getItemsCount);

  const loanFee = computed(() => store.loanFee);

  const loanFees = computed(() => store.getLoanFees);

  const loanFeesCount = computed(() => store.getLoanFeesCount);

  const tenure = computed(() => store.tenure);

  const tenureList = computed(() => store.getTenureList);

  const tenureListCount = computed(() => store.getTenureListCount);

  async function fetchFarmerLimits(): Promise<void> {
    try {
      await store.fetchFarmerLimits();
    } catch (error) {
      console.error(error);
    }
  }

  async function createFarmerLimit(payload): Promise<void> {
    try {
      await limitStore.registerFarmerLimits(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateFarmerLimits(payload): Promise<void> {
    try {
      await limitStore.updateFarmerLimits(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteFarmerLimits(payload): Promise<void> {
    try {
      await limitStore.deleteFarmerLimits(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function createLoanProduct(payload): Promise<void> {
    try {
      await loanProductStore.createLoanProduct(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchLoanProducts(): Promise<void> {
    try {
      await store.fetchLoanProducts();
    } catch (error) {
      console.error(error);
    }
  }

  async function updateLoanProduct(payload): Promise<void> {
    try {
      await loanProductStore.updateLoanProduct(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function createAgroDealer(payload): Promise<void> {
    try {
      await store.createAgroDealer(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchAgroDealers(): Promise<void> {
    try {
      await store.fetchAgroDealers();
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchAgroDealer(payload): Promise<void> {
    try {
      await store.fetchAgroDealer(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateAgroDealer(payload): Promise<void> {
    try {
      await store.updateAgroDealer(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function createCurrency(payload): Promise<void> {
    try {
      await store.createCurrency(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchCurrencies(): Promise<void> {
    try {
      await store.fetchCurrencies();
    } catch (error) {
      console.error(error);
    }
  }

  async function updateCurrency(payload): Promise<void> {
    try {
      await store.updateCurrency(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchLoanFees(): Promise<void> {
    try {
      await store.fetchLoanFees();
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchTenure(): Promise<void> {
    try {
      await store.fetchTenure();
    } catch (error) {
      console.error(error);
    }
  }

  async function createLoanFees(payload): Promise<void> {
    try {
      await store.createLoanFees(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function createTenure(payload): Promise<void> {
    try {
      await store.createTenure(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateLoanFees(payload): Promise<void> {
    try {
      await store.updateLoanFees(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateTenure(payload): Promise<void> {
    try {
      await store.updateTenure(payload);
    } catch (error) {
      console.error(error);
    }
  }

  // // async function fetchItem(payload): Promise<void> {
  // //   try {
  // //     await store.fetchItem(payload);
  // //   } catch (error) {
  // //     console.error(error);
  // //   }
  // // }

  // async function updateItem(payload): Promise<void> {
  //   try {
  //     await store.updateItem(payload);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async function fetchItems(): Promise<void> {
    try {
      await store.fetchItems();
    } catch (error) {
      console.error(error);
    }
  }

  // async function fetchItem(payload): Promise<void> {
  //   try {
  //     await store.fetchItem(payload);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async function createItem(payload): Promise<void> {
    try {
      await store.createItem(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateItem(payload): Promise<void> {
    try {
      await store.updateItem(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function setFarmerLimit(payload): Promise<void> {
    try {
      console.log("setting");
      await store.setFarmerLimit(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function setLoanProduct(payload): Promise<void> {
    try {
      await store.setLoanProduct(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function setAgroDealer(payload): Promise<void> {
    try {
      await store.setAgroDealer(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function setCurrency(payload): Promise<void> {
    try {
      await store.setCurrency(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function setItem(payload): Promise<void> {
    try {
      await store.setItem(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function setLoanFee(payload): Promise<void> {
    try {
      await store.setLoanFee(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function setTenure(payload): Promise<void> {
    try {
      await store.setTenure(payload);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    loanProduct,
    loanProducts,
    loanProductsCount,
    farmerLimit,
    farmerLimits,
    farmerLimitsCount,
    agroDealer,
    agroDealers,
    agroDealersCount,
    item,
    items,
    itemsCount,
    loanFee,
    loanFees,
    loanFeesCount,
    currency,
    currencies,
    currenciesCount,
    tenure,
    tenureList,
    tenureListCount,
    createFarmerLimit,
    createCurrency,
    createLoanProduct,
    createAgroDealer,
    createItem,
    createLoanFees,
    createTenure,
    fetchFarmerLimits,
    fetchLoanProducts,
    fetchAgroDealers,
    fetchAgroDealer,
    fetchCurrencies,
    fetchItems,
    fetchLoanFees,
    fetchTenure,
    setAgroDealer,
    setCurrency,
    setFarmerLimit,
    setItem,
    setLoanProduct,
    setLoanFee,
    setTenure,
    updateFarmerLimits,
    updateAgroDealer,
    updateCurrency,
    updateItem,
    updateLoanProduct,
    updateLoanFees,
    updateTenure,
    deleteFarmerLimits,
  };
}
