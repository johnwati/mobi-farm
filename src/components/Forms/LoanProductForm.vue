<template>
  <a-spin :spinning="loading">
    <a-form
      layout="vertical"
      ref="loanProductForm"
      :rules="rules"
      :model="formState"
    >
      <a-form-item label="Name" name="name">
        <a-input v-model:value="formState.name" type="text" />
      </a-form-item>

      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12">
          <a-form-item label="Min. Amount" name="min_amount">
            <a-input-number v-model:value="formState.min_amount" />
          </a-form-item>
        </a-col>

        <a-col class="gutter-row" :span="12">
          <a-form-item label="Max. Amount" name="max_amount">
            <a-input-number v-model:value="formState.max_amount" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item label="Repayment Method" name="repayment_method">
        <a-select
          ref="statusSelect"
          v-model:value="formState.repayment_method"
          style="width: 150px"
        >
          <a-select-option
            v-for="(item, ind) in paymentMethods"
            :value="item.name"
            :key="ind"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12">
          <a-form-item label="Max Grace Period" name="max_grace_period">
            <a-input-number v-model:value="formState.max_grace_period" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item
        label="Allow Concurrrent Loans"
        name="allow_concurrent_loans"
      >
        <a-switch v-model:checked="formState.allow_concurrent_loans" />
      </a-form-item>

      <a-form-item
        v-if="formState.allow_concurrent_loans"
        label="Max Concurrrent Loans"
        name="max_concurrent_loans"
      >
        <a-input-number v-model:value="formState.max_concurrent_loans" />
      </a-form-item>

      <a-form-item label="Loan Type" name="loan_type">
        <a-select v-model:value="formState.loan_type" style="width: 100%">
          <a-select-option
            v-for="(item, ind) in loanTypes"
            :value="item"
            :key="ind"
          >
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" @click.prevent="submit">
          {{ isEditing ? "Update" : "Create" }}
        </a-button>

        <a-button style="margin-left: 10px" @click="reset"> Cancel </a-button>
      </a-form-item>
    </a-form>
  </a-spin>
</template>
<script lang="ts">
import { useAdmin, useLoans } from "@/composables";
import useConfigs from "@/composables/useConfigs";
import { useLoanProductStore } from "@/stores/loanProduct";
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  name: "LoanProductForm",

  props: {
    isEditing: {
      type: Boolean,
      required: true,
    },
  },

  emits: ["close-drawer"],

  setup(props, { emit }) {
    const { loan, loanStatusList } = useLoans();
    const { loanProduct, updateLoanProduct, createLoanProduct } = useAdmin();
    const { paymentMethods, fetchPaymentMethods } = useConfigs();

    const loanProductForm = ref();

    const loading = ref<boolean>(false);

    const loanTypes = ref<string[]>(["LOAN", "INPUT"]);

    const formState = ref({
      name: "",
      min_amount: null,
      max_amount: null,
      repayment_method: "PARTIAL_PAYMENT",
      max_grace_period: null,
      allow_concurrent_loans: true,
      max_concurrent_loans: null,
      loan_type: "LOAN",
      loan_fees_data: [],
    });

    const rules = ref({
      name: [{ required: true }],
    });

    const submit = async () => {
      loading.value = true;
      try {
        await loanProductForm.value.validate();
        if (props.isEditing) {
          await updateLoanProduct({
            code: loanProduct.value.code,
            data: formState.value,
          });
        } else {
          const state = formState.value;
          // const value = {
          //   name: state.name,
          //   min_amount: state.min_amount || 0,
          //   max_amount: state.max_amount || 0,
          //   repayment_method: state.repayment_method,
          //   max_grace_period: state.max_grace_period || 0,
          //   allow_concurrent_loans: state.allow_concurrent_loans,
          //   max_concurrent_loans: state.max_concurrent_loans || 0,
          //   loan_type: state.loan_type,
          //   loan_fees_data: [
          //     {
          //       product_code: "string",
          //       duration: "Monthly",
          //       loan_fee_type: "PERCENTAGE",
          //       fee_name: "string",
          //       rate: 0,
          //       status: "ACTIVE",
          //       charged_on: "Disbursement",
          //     },
          //   ],
          // };
          await createLoanProduct(state);
        }
        loanProductForm.value.resetFields();
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
        emit("close-drawer");
      }
    };

    const reset = () => {
      try {
        loanProductForm.value.resetFields();
        emit("close-drawer");
      } catch (error) {
        console.error(error);
      }
    };

    const loanProductsStore = useLoanProductStore();

    onMounted(async () => {
      loading.value = true;
      try {
        await fetchPaymentMethods();
        await loanProductsStore.fetchLoanFees();
        console.log(loan);
        // await fetchClassrooms({ "school.id": schoolId.value });
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    });

    watch(
      () => props.isEditing,
      async (currentValue) => {
        loading.value = true;
        try {
          if (currentValue) {
            formState.value = {
              name: loanProduct.value.name,
              min_amount: loanProduct.value?.min_amount || null,
              max_amount: loanProduct.value?.max_amount || null,
              repayment_method: loanProduct.value?.repayment_method || null,
              max_grace_period: loanProduct.value?.max_grace_period || null,
              allow_concurrent_loans:
                loanProduct.value?.allow_concurrent_loans || null,
              max_concurrent_loans:
                loanProduct.value?.max_concurrent_loans || null,
              loan_type: loanProduct.value.loan_type,
              loan_fees_data: loanProduct.value.loan_fees_data,
            };
          } else {
            formState.value = {
              name: "",
              min_amount: null,
              max_amount: null,
              repayment_method: "PARTIAL_PAYMENT",
              max_grace_period: null,
              allow_concurrent_loans: true,
              max_concurrent_loans: null,
              loan_type: "LOAN",
              loan_fees_data: [],
            };
          }
        } catch (error) {
          console.error(error);
        } finally {
          loading.value = false;
        }
      },
      { immediate: true, deep: true }
    );

    return {
      loan,
      loanProductForm,
      loanStatusList,
      paymentMethods,
      rules,
      formState,
      loading,
      loanTypes,
      submit,
      reset,
    };
  },
});
</script>
