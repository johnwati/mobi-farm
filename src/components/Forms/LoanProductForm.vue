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
          <a-form-item
            label="Min. Payment Duration"
            name="min_payment_duration"
          >
            <a-input-number v-model:value="formState.min_payment_duration" />
          </a-form-item>
        </a-col>

        <a-col class="gutter-row" :span="12">
          <a-form-item
            label="Max. Payment Duration"
            name="max_payment_duration"
          >
            <a-input-number v-model:value="formState.max_payment_duration" />
          </a-form-item>
        </a-col>
      </a-row>

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

      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12">
          <a-form-item label="Interest" name="interest">
            <a-input-number v-model:value="formState.interest" />
          </a-form-item>
        </a-col>

        <a-col class="gutter-row" :span="12">
          <a-form-item label="Service Fee" name="service_fee">
            <a-input-number v-model:value="formState.service_fee" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item label="Processing Insurance" name="processing_insurance">
        <a-input-number v-model:value="formState.processing_insurance" />
      </a-form-item>

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

      <a-form-item label="Has Penalty" name="has_penalty">
        <a-switch v-model:checked="formState.interest" />
      </a-form-item>

      <template v-if="formState.interest">
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="12">
            <a-form-item label="Penalty Rate Type" name="penalty_rate_type">
              <a-input
                v-model:value="formState.penalty_rate_type"
                type="text"
              />
            </a-form-item>
          </a-col>

          <a-col class="gutter-row" :span="12">
            <a-form-item label="Penalty Rate" name="penalty_rate">
              <a-input-number v-model:value="formState.penalty_rate" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">
          <a-col class="gutter-row" :span="12">
            <a-form-item label="Max Grace Period" name="max_grace_period">
              <a-input-number v-model:value="formState.max_grace_period" />
            </a-form-item>
          </a-col>

          <a-col class="gutter-row" :span="12">
            <a-form-item
              label="Penalty Grace Period"
              name="penalty_grace_period"
            >
              <a-input-number v-model:value="formState.penalty_grace_period" />
            </a-form-item>
          </a-col>
        </a-row>
      </template>

      <a-form-item label="Min. Guarantors" name="min_guarantors">
        <a-input-number v-model:value="formState.min_guarantors" />
      </a-form-item>

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

      <!-- <a-form-item label="Loan Type" name="loan_type">
        <a-select v-model:value="formState.loan_type" style="width: 100%">
          <a-select-option
            v-for="(item, ind) in loanTypes"
            :value="item"
            :key="ind"
          >
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-item> -->

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
      min_payment_duration: 1,
      max_payment_duration: 1,
      min_amount: null,
      max_amount: null,
      interest: null,
      service_fee: null,
      processing_insurance: null,
      repayment_method: "",
      has_penalty: true,
      penalty_rate_type: "",
      penalty_rate: null,
      max_grace_period: null,
      penalty_grace_period: null,
      min_guarantors: null,
      allow_concurrent_loans: true,
      max_concurrent_loans: null,
      // code: "",
      // loan_type: "",
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
              min_payment_duration:
                loanProduct.value?.min_payment_duration || null,
              max_payment_duration:
                loanProduct.value?.max_payment_duration || null,
              min_amount: loanProduct.value?.min_amount || null,
              max_amount: loanProduct.value?.max_amount || null,
              interest: loanProduct.value?.interest || null,
              service_fee: loanProduct.value?.service_fee || null,
              processing_insurance:
                loanProduct.value?.processing_insurance || null,
              repayment_method: loanProduct.value?.repayment_method || null,
              has_penalty: loanProduct.value?.has_penalty || null,
              penalty_rate_type: loanProduct.value?.penalty_rate_type || null,
              penalty_rate: loanProduct.value?.penalty_rate || null,
              max_grace_period: loanProduct.value?.max_grace_period || null,
              penalty_grace_period:
                loanProduct.value?.penalty_grace_period || null,
              min_guarantors: loanProduct.value?.min_guarantors || null,
              allow_concurrent_loans:
                loanProduct.value?.allow_concurrent_loans || null,
              max_concurrent_loans:
                loanProduct.value?.max_concurrent_loans || null,
              // code: loanProduct.value.code,
              // loan_type: loanProduct.value.loan_type,
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

    watch(
      () => formState.value.has_penalty,
      async (value) => {
        loading.value = true;
        try {
          if (value === false) {
            formState.value.penalty_rate = "";
            formState.value.penalty_rate_type = "";
            formState.value.penalty_grace_period = "";
            formState.value.max_grace_period = "";
          }
        } catch (error) {
          console.error(error);
        } finally {
          loading.value = false;
        }
      },
      { immediate: false, deep: true }
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
