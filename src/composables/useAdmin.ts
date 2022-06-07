import type { ComputedRef } from "vue";
import { computed } from "vue";
// import { useStore } from "vuex";
// import { useRouter } from "vue-router";

import type { IFarmer } from "@/interfaces/farmers";
import type { ILoan } from "@/interfaces/loans";
import { useLoansStore } from "@/stores/loans";
import { useEnumStore } from "@/stores/enums";

export default function useAdmin(): {
  farmerLimits: Record<string, unknown>[];
  farmerLimitsCount: ComputedRef<number>;
} {
  const store = useLoansStore();
  const enumStore = useEnumStore();

  const farmerLimits = [
    {
      id: 449,
      code: "FR-KUEXV",
      loan_product_code: "LP-XWZ48QVG",
      loan_product_name: "Dairy Loan",
      category: null,
      farmer_id: 444,
      farmer_name: "Edwin Kitur",
      farmer_id_no: "22222222",
      min_amount: 1000,
      max_amount: 10000,
      loan_min_amount: 50,
      loan_max_amount: 10000,
      status: true,
    },
    {
      id: 505,
      code: "FR-EUYOI",
      loan_product_code: "LP-XWZ48QVG",
      loan_product_name: "Dairy Loan",
      category: null,
      farmer_id: 502,
      farmer_name: "Emmanuel Muchiri",
      farmer_id_no: "40382477",
      min_amount: 1000,
      max_amount: 10000,
      loan_min_amount: 50,
      loan_max_amount: 10000,
      status: true,
    },
    {
      id: 550,
      code: "FR-2GDF5",
      loan_product_code: "LP-XWZ48QVG",
      loan_product_name: "Dairy Loan",
      category: null,
      farmer_id: 543,
      farmer_name: "Dolbert Omari",
      farmer_id_no: "50382477",
      min_amount: 1000,
      max_amount: 10000,
      loan_min_amount: 50,
      loan_max_amount: 10000,
      status: true,
    },
    {
      id: 586,
      code: "FR-1MUA7",
      loan_product_code: "LP-XWZ48QVG",
      loan_product_name: "Dairy Loan",
      category: null,
      farmer_id: 584,
      farmer_name: "Albert Mulei",
      farmer_id_no: "44463321",
      min_amount: 1000,
      max_amount: 10000,
      loan_min_amount: 50,
      loan_max_amount: 10000,
      status: true,
    },
    {
      id: 588,
      code: "FR-ZO7I4",
      loan_product_code: "LP-XWZ48QVG",
      loan_product_name: "Dairy Loan",
      category: null,
      farmer_id: 584,
      farmer_name: "Albert Mulei",
      farmer_id_no: "44463321",
      min_amount: 1000,
      max_amount: 15000,
      loan_min_amount: 50,
      loan_max_amount: 10000,
      status: true,
    },
    {
      id: 599,
      code: "FR-CXH0E",
      loan_product_code: "LP-XWZ48QVG",
      loan_product_name: "Dairy Loan",
      category: null,
      farmer_id: 597,
      farmer_name: "Roza Ngeno",
      farmer_id_no: "22859213",
      min_amount: 1000,
      max_amount: 15000,
      loan_min_amount: 50,
      loan_max_amount: 10000,
      status: true,
    },
    {
      id: 607,
      code: "FR-DGAIQ",
      loan_product_code: "LP-XWZ48QVG",
      loan_product_name: "Dairy Loan",
      category: null,
      farmer_id: 604,
      farmer_name: "Roza Ngeno",
      farmer_id_no: "22856500",
      min_amount: 1000,
      max_amount: 15000,
      loan_min_amount: 50,
      loan_max_amount: 10000,
      status: true,
    },
    {
      id: 614,
      code: "FR-YFHKB",
      loan_product_code: "LP-XWZ48QVG",
      loan_product_name: "Dairy Loan",
      category: null,
      farmer_id: 612,
      farmer_name: "Valentine Wambui",
      farmer_id_no: "60382477",
      min_amount: 1000,
      max_amount: 25000,
      loan_min_amount: 50,
      loan_max_amount: 10000,
      status: true,
    },
    {
      id: 636,
      code: "FR-JA34V",
      loan_product_code: "LP-XWZ48QVG",
      loan_product_name: "Dairy Loan",
      category: null,
      farmer_id: 634,
      farmer_name: "Kiprono Tanui",
      farmer_id_no: "70382477",
      min_amount: 1000,
      max_amount: 30000,
      loan_min_amount: 50,
      loan_max_amount: 10000,
      status: true,
    },
    {
      id: 703,
      code: "FR-X2AS5",
      loan_product_code: "LP-XWZ48QVG",
      loan_product_name: "Dairy Loan",
      category: null,
      farmer_id: 667,
      farmer_name: "John Deng",
      farmer_id_no: "80382478",
      min_amount: 1000,
      max_amount: 20000,
      loan_min_amount: 50,
      loan_max_amount: 10000,
      status: true,
    },
  ];

  const farmerLimitsCount = computed(() => 10);

  return {
    farmerLimits,
    farmerLimitsCount,
  };
}
