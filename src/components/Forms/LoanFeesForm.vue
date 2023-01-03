<template>
  <a-spin :spinning="loading">
    <a-form
      layout="vertical"
      ref="loanFeesForm"
      :rules="rules"
      :model="formState"
    >
      <a-form-item label="Name" name="fee name">
        <a-input v-model:value="formState.fee_name" />
      </a-form-item>

      <a-form-item label="Product Code" name="product code">
        <!-- <a-input v-model:value="formState.product_code" type="text" /> -->
        <a-auto-complete
          v-model:value="selectedProduct"
          :options="productList"
          style="width: 200px"
          placeholder="input here"
          :filter-option="filterOption"
          @select="onProductSelect"
        />
      </a-form-item>

      <a-form-item label="Duration" name="duration">
        <a-select v-model:value="formState.duration" style="width: 100%">
          <a-select-option
            v-for="(item, ind) in feesDuration"
            :value="item"
            :key="ind"
          >
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Fee Type" name="fee type">
        <a-select v-model:value="formState.loan_fee_type" style="width: 100%">
          <a-select-option
            v-for="(item, ind) in feesTypes"
            :value="item"
            :key="ind"
          >
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Interest Rate" name="rate">
        <a-input-number v-model:value="formState.rate" />
      </a-form-item>

      <a-form-item label="Charge on" name="charged on">
        <a-select v-model:value="formState.charged_on" style="width: 100%">
          <a-select-option
            v-for="(item, ind) in feesChargedOn"
            :value="item"
            :key="ind"
          >
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item v-if="isEditing" label="Status" name="status">
        <a-select v-model:value="formState.status" style="width: 100%">
          <a-select-option
            v-for="(item, ind) in feesStatus"
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
import { useAdmin } from "@/composables";
import { defineComponent, onMounted, ref, watch } from "vue";

interface LoanProductOption {
  value: string;
  code: string;
}

export default defineComponent({
  name: "LoanFeesForm",

  props: {
    isEditing: {
      type: Boolean,
      required: true,
    },
  },

  emits: ["close-drawer"],

  setup(props, { emit }) {
    const { loanFee, createLoanFees, updateLoanFees, loanProducts } =
      useAdmin();

    const loanFeesForm = ref();

    const loading = ref<boolean>(false);

    const selectedProduct = ref<string>("");
    const feesDuration = ref<string[]>(["Monthly", "Annually"]);
    const feesTypes = ref<string[]>(["PERCENTAGE", "FIXED"]);
    const feesStatus = ref<string[]>(["ACTIVE", "INACTIVE"]);
    const feesChargedOn = ref<string[]>([
      "Disbursement",
      "Installment",
      "Repayment",
      "Default",
    ]);
    const productList = ref<LoanProductOption[]>(
      loanProducts.value.map((i) => ({
        code: i.code as string,
        value: i.name as string,
      }))
    );

    const filterOption = (input: string, option: LoanProductOption) => {
      return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
    };

    const onProductSelect = (string: string, value: LoanProductOption) => {
      formState.value = {
        ...formState.value,
        product_code: value.code,
      };
    };

    const formState = ref({
      product_code: "",
      duration: "Monthly",
      loan_fee_type: "PERCENTAGE",
      fee_name: "",
      rate: null,
      status: "ACTIVE",
      charged_on: "",
    });

    const rules = ref({
      name: [{ required: true }],
    });

    const submit = async () => {
      loading.value = true;
      try {
        await loanFeesForm.value.validate();

        if (props.isEditing) {
          await updateLoanFees({
            id: loanFee.value.id,
            data: formState.value,
          });
        } else {
          await createLoanFees(formState.value);
        }
        loanFeesForm.value.resetFields();
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
        emit("close-drawer");
      }
    };

    const reset = () => {
      try {
        loanFeesForm.value.resetFields();
        emit("close-drawer");
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(async () => {
      loading.value = true;
      try {
        // console.log(loan);
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
              product_code: loanFee.value.product_code,
              duration: loanFee.value.duration,
              loan_fee_type: loanFee.value.loan_fee_type,
              fee_name: loanFee.value.fee_name,
              rate: loanFee.value.rate,
              status: loanFee.value.status,
              charged_on: loanFee.value.charged_on,
            };
          } else {
            formState.value = {
              product_code: "",
              duration: "Monthly",
              loan_fee_type: "PERCENTAGE",
              fee_name: "",
              rate: null,
              status: "ACTIVE",
              charged_on: "",
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
      loanFeesForm,
      rules,
      formState,
      loading,
      feesDuration,
      feesTypes,
      feesStatus,
      feesChargedOn,
      productList,
      selectedProduct,
      filterOption,
      onProductSelect,
      submit,
      reset,
    };
  },
});
</script>
