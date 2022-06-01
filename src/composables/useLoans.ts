// import { computed, ComputedRef } from "vue";
import { computed } from "vue";
// import { useStore } from "vuex";
// import { useRouter } from "vue-router";

import type { IFarmer } from "@/interfaces/farmers";
import type { ILoan } from "@/interfaces/loans";
import { useLoansStore } from "@/stores/loans";
import { useEnumStore } from "@/stores/enums";

export default function useLoans(): {
  // loan: Record<string, unknown>;
  loan: ILoan;
  farmerLoans: [];
  loanCount: number;
  loanStatusList: [];
  fetchFarmers: () => Promise<void>;
  updateLoanStatus: (payload) => Promise<void>;
  setLoan: (payload) => Promise<void>;
  // farmerId: ComputedRef<number>;
} {
  const store = useLoansStore();
  const enumStore = useEnumStore();

  // const router = useRouter();
  const loanStatusList = computed(() => enumStore.getLoanStatus);

  const loans = computed(() => store.getLoans);

  const farmerLoans = [
    {
      farmer_id: 288,
      loan_product_code: "LP-XWZ48QVG",
      agrodealer_code: null,
      reason: "string",
      created_on: "2022-05-09T09:30:27.520719Z",
      code: "LON-0QP5R2GPGFJ3",
      requested_amount: 1,
      interest_rate: 0,
      interest: 0,
      fees: 0,
      principal_amount: 1,
      total_amount: 1,
      installments: null,
      installment_amount: null,
      repayment_start_date: null,
      status: "APPROVED",
      payment_status: "PENDING",
      expected_completion_date: null,
      paid: 0,
      balance: 1,
      product_code: null,
      product_name: "Dairy Loan",
      applicant_name: "Mary Otieno",
      applicant_phone: "0708321651",
      applicant_address: null,
      applicant_email: null,
      applicant_code: "32711464",
      receiver_account_name: null,
      receiver_account_number: null,
      receiver_bank_name: null,
      loan_type: "LOAN",
    },
    {
      farmer_id: 288,
      loan_product_code: "LP-XWZ48QVG",
      agrodealer_code: null,
      reason:
        "The applied loan amount of KES 1.0is below the minimum amount of 50.0 for this loan product",
      created_on: "2022-05-09T16:06:24.652045Z",
      code: "LON-WKEJQBWJCCDR",
      requested_amount: 1,
      interest_rate: 0,
      interest: 0,
      fees: 0,
      principal_amount: 1,
      total_amount: null,
      installments: null,
      installment_amount: null,
      repayment_start_date: null,
      status: "REJECTED",
      payment_status: "PENDING",
      expected_completion_date: null,
      paid: 0,
      balance: null,
      product_code: null,
      product_name: "Dairy Loan",
      applicant_name: "Mary Otieno",
      applicant_phone: "0708321651",
      applicant_address: null,
      applicant_email: null,
      applicant_code: "32711464",
      receiver_account_name: null,
      receiver_account_number: null,
      receiver_bank_name: "MPESA",
      loan_type: "LOAN",
    },
    {
      farmer_id: 288,
      loan_product_code: "LP-XWZ48QVG",
      agrodealer_code: null,
      reason:
        "The applied loan amount of KES 1.0is below the minimum amount of 50.0 for this loan product",
      created_on: "2022-05-09T17:19:54.569999Z",
      code: "LON-XVKOAJS3R6OY",
      requested_amount: 1,
      interest_rate: 0,
      interest: 0,
      fees: 0,
      principal_amount: 1,
      total_amount: null,
      installments: null,
      installment_amount: null,
      repayment_start_date: null,
      status: "REJECTED",
      payment_status: "PENDING",
      expected_completion_date: null,
      paid: 0,
      balance: null,
      product_code: null,
      product_name: "Dairy Loan",
      applicant_name: "Mary Otieno",
      applicant_phone: "0708321651",
      applicant_address: null,
      applicant_email: null,
      applicant_code: "32711464",
      receiver_account_name: null,
      receiver_account_number: null,
      receiver_bank_name: "MPESA",
      loan_type: "LOAN",
    },
    {
      farmer_id: 288,
      loan_product_code: "LP-XWZ48QVG",
      agrodealer_code: null,
      reason: "Farmer already has an active loan",
      created_on: "2022-05-17T08:47:34.600556Z",
      code: "LON-RSMRP7HFLPPY",
      requested_amount: 1000,
      interest_rate: 0,
      interest: 0,
      fees: 0,
      principal_amount: 1000,
      total_amount: null,
      installments: null,
      installment_amount: null,
      repayment_start_date: null,
      status: "REJECTED",
      payment_status: "PENDING",
      expected_completion_date: null,
      paid: 0,
      balance: null,
      product_code: null,
      product_name: "Dairy Loan",
      applicant_name: "Mary Otieno",
      applicant_phone: "0708321651",
      applicant_address: null,
      applicant_email: null,
      applicant_code: "32711464",
      receiver_account_name: "string",
      receiver_account_number: "string",
      receiver_bank_name: "MPESA",
      loan_type: "LOAN",
    },
    {
      farmer_id: 288,
      loan_product_code: "LP-XWZ48QVG",
      agrodealer_code: null,
      reason: "string",
      created_on: "2022-05-17T09:13:22.578525Z",
      code: "LON-FUJUQ6PMKKQU",
      requested_amount: 1000,
      interest_rate: 0,
      interest: 0,
      fees: 0,
      principal_amount: 1000,
      total_amount: 1000,
      installments: null,
      installment_amount: null,
      repayment_start_date: null,
      status: "PAID",
      payment_status: "PAID",
      expected_completion_date: null,
      paid: 1000,
      balance: 0,
      product_code: null,
      product_name: "Dairy Loan",
      applicant_name: "Mary Otieno",
      applicant_phone: "0708321651",
      applicant_address: null,
      applicant_email: null,
      applicant_code: "32711464",
      receiver_account_name: null,
      receiver_account_number: null,
      receiver_bank_name: null,
      loan_type: "LOAN",
    },
  ];

  const loanCount = computed(() => store.getLoanCount);

  const loan = computed(() => store.getLoan);

  async function setLoan(payload): Promise<void> {
    try {
      await store.setLoan(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchLoans(): Promise<void> {
    try {
      await store.fetchLoans();
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
    farmerLoans,
    loans,
    loan,
    loanCount,
    loanStatusList,
    fetchLoans,
    setLoan,
    updateLoanStatus,
  };
}
