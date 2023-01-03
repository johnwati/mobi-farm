<template>
  <a-spin :spinning="loading">
    <a-descriptions
      v-if="isEditing"
      :column="1"
      :contentStyle="{
        alignText: 'right',
        fontWeight: 'normal',
        color: '#36454F',
      }"
      :labelStyle="{
        fontWeight: 'bold',
      }"
    >
      <a-descriptions-item label="Farmer">
        {{ formState.farmer_name }}
      </a-descriptions-item>
      <a-descriptions-item label="Loan Product">
        {{ formState.loan_product_name }}
      </a-descriptions-item>
    </a-descriptions>
    <a-form
      layout="vertical"
      ref="farmerLimitsForm"
      :rules="rules"
      :model="formState"
    >
      <template v-if="!isEditing">
        <a-form-item label="Farmer" name="farmer_name">
          <a-auto-complete
            v-model:value="formState.farmer_name"
            :options="farmerOptions"
            placeholder="Search for farmer"
            :filter-option="filterOption"
            @select="onFarmerSelect"
          />
        </a-form-item>

        <a-form-item label="Loan Product" name="loan_product_code">
          <a-select
            v-model:value="formState.loan_product_code"
            :options="loanProductOptions"
            @select="onLoanProductSelect"
          ></a-select>
        </a-form-item>
      </template>

      <a-form-item
        label="Min. Amount"
        name="min_amount"
        :help="
          range.length > 0 ? 'Ksh ' + range[0] + ' to Ksh ' + range[1] : ''
        "
      >
        <a-input-number v-model:value="formState.min_amount" />
      </a-form-item>

      <a-form-item
        label="Max. Amount"
        name="max_amount"
        :help="
          range.length > 0 ? 'Ksh ' + range[0] + ' to Ksh ' + range[1] : ''
        "
      >
        <a-input-number v-model:value="formState.max_amount" />
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
import { useAdmin, useFarmers } from "@/composables";
import type { Rule } from "ant-design-vue/lib/form";
import { computed, defineComponent, onMounted, ref, watch } from "vue";

interface Option {
  id: number;
  value: string;
  idNumber: string;
  code: string;
}

interface LoanProductOption {
  label: string;
  value: string;
  type: string;
  min: number;
  max: number;
}

export default defineComponent({
  name: "FarmerLimitsForm",

  props: {
    isEditing: {
      type: Boolean,
      required: true,
    },
  },

  emits: ["close-drawer", "submitted"],

  setup(props, { emit }) {
    const {
      farmerLimit,
      updateFarmerLimits,
      createFarmerLimit,
      loanProducts,
      fetchLoanProducts,
    } = useAdmin();
    const { farmers, fetchFarmers } = useFarmers();

    const farmerLimitsForm = ref();

    const loading = ref<boolean>(false);

    const range = ref([]);

    const loanCategories = ref<string[]>(["LOAN", "INPUT"]);

    const loanProductOptions = computed((): LoanProductOption[] =>
      loanProducts.value.map((i) => ({
        label: i.name as string,
        value: i.code as string,
        type: i.loan_type as string,
        min: i.min_amount as number,
        max: i.max_amount as number,
      }))
    );

    const filterOption = (input: string, option: Option) => {
      return option.value?.toUpperCase().indexOf(input.toUpperCase()) >= 0;
    };

    const farmerOptions = computed((): Option[] =>
      farmers.value.map((i) => ({
        value: (i.fname + " " + i.lname) as string,
        id: i.id as number,
        idNumber: i.id_no as string,
        code: i.farmer_code as string,
      }))
    );

    const formState = ref({
      loan_product_code: "",
      loan_product_name: "",
      category: "",
      farmer_id: null,
      farmer_name: "",
      farmer_id_no: "",
      min_amount: null,
      max_amount: null,
    });

    const rules = ref<Record<string, Rule[]>>({
      min_amount: [{ required: true }],
      max_amount: [{ required: true }],
    });

    const onFarmerSelect = (string: string, value: Option) => {
      formState.value = {
        ...formState.value,
        farmer_id: value.id,
        farmer_name: value.value,
        farmer_id_no: value.idNumber,
      };
    };

    const onLoanProductSelect = (string: string, value: LoanProductOption) => {
      formState.value = {
        ...formState.value,
        loan_product_name: value.label,
        loan_product_code: value.value,
        category: value.type,
      };
      range.value = [value.min, value.max];
      rules.value = {
        ...rules.value,
        min_amount: [
          {
            type: "number",
            required: true,
            min: value.min,
            max: value.max,
          },
        ],
        max_amount: [
          {
            type: "number",
            required: true,
            min: value.min,
            max: value.max,
          },
        ],
      };
    };

    const submit = async () => {
      loading.value = true;
      try {
        await farmerLimitsForm.value.validate();
        if (props.isEditing) {
          await updateFarmerLimits({
            id: farmerLimit.value.id,
            data: formState.value,
          });
        } else {
          await createFarmerLimit(formState.value);
        }
        await farmerLimitsForm.value.resetFields();
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
        emit("close-drawer");
        emit("submitted");
      }
    };

    const reset = () => {
      try {
        farmerLimitsForm.value.resetFields();
        emit("close-drawer");
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(async () => {
      loading.value = true;
      try {
        await fetchLoanProducts();
        await fetchFarmers();
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
              loan_product_code: farmerLimit.value.loan_product_code,
              loan_product_name: farmerLimit.value.loan_product_name,
              category: farmerLimit.value.category,
              farmer_id: farmerLimit.value.farmer_id,
              farmer_name: farmerLimit.value.farmer_name,
              farmer_id_no: farmerLimit.value.farmer_id_no,
              min_amount: farmerLimit.value.min_amount,
              max_amount: farmerLimit.value.max_amount,
            };
          } else {
            formState.value = {
              loan_product_code: "",
              loan_product_name: "",
              category: "",
              farmer_id: null,
              farmer_name: "",
              farmer_id_no: "",
              min_amount: null,
              max_amount: null,
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

    // watch(
    //   () => formState.value.status,
    //   async () => {
    //     loading.value = true;
    //     try {
    //       if (formState.value.status === loan.value.status) {
    //         formState.value.comments = loan.value.reason;
    //       } else {
    //         formState.value.comments = "";
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     } finally {
    //       loading.value = false;
    //     }
    //   },
    //   { immediate: false, deep: true }
    // );

    return {
      farmerLimitsForm,
      rules,
      formState,
      loading,
      loanProducts,
      loanProductOptions,
      farmerOptions,
      loanCategories,
      range,
      onFarmerSelect,
      onLoanProductSelect,
      filterOption,
      submit,
      reset,
    };
  },
});
</script>
