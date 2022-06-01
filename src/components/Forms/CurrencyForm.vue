<template>
  <a-spin :spinning="loading">
    <a-form
      layout="vertical"
      ref="currencyForm"
      :rules="rules"
      :model="formState"
    >
      <a-form-item label="Code" name="currency code">
        <a-input v-model:value="formState.code" type="text" />
      </a-form-item>

      <a-form-item label="Symbol" name="symbol">
        <a-input v-model:value="formState.symbol" type="text" />
      </a-form-item>

      <a-form-item label="Name" name="name">
        <a-input v-model:value="formState.name" type="text" />
      </a-form-item>

      <a-form-item label="Decimal Places" name="decimalPlaces">
        <a-input v-model:value="formState.decimalPlaces" type="text" />
      </a-form-item>

      <a-form-item label="Format" name="decimalPlaces">
        <a-input v-model:value="formState.format" type="text" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" @click.prevent="submit">
          {{ "Update" }}
        </a-button>

        <a-button style="margin-left: 10px" @click="reset"> Cancel </a-button>
      </a-form-item>
    </a-form>
  </a-spin>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import type { IFarmer, IFarmerRegistration } from "@/interfaces/farmers";
import { useFarmers, useLoans } from "@/composables";

export default defineComponent({
  name: "CurrencyForm",

  props: {
    isEditing: {
      type: Boolean,
      required: true,
    },
  },

  emits: ["close-drawer"],

  setup(props, { emit }) {
    const { loan, loanStatusList, updateLoanStatus } = useLoans();

    const currencyForm = ref();

    const loading = ref<boolean>(false);

    const formState = ref({
      code: "",
      symbol: "",
      name: "",
      decimalPlaces: 0,
      format: "",
    });

    const rules = ref({
      status: [{ required: true }],
      comments: [{ required: true }],
    });

    const submit = async () => {
      loading.value = true;
      try {
        await currencyForm.value.validate();

        if (props.isEditing) {
          await updateCurrency({
            code: loan.code,
            data: formState.value,
          });
        } else {
          await createCurrency(formState.value);
        }
        currencyForm.value.resetFields();
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
        emit("close-drawer");
      }
    };

    const reset = () => {
      try {
        currencyForm.value.resetFields();
        emit("close-drawer");
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(async () => {
      loading.value = true;
      try {
        // console.log(loan);
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
              code: currency.value.code,
              symbol: currency.value.symbol,
              name: currency.value.name,
              decimalPlaces: currency.value.decimalPlaces,
              format: currency.value.format,
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
      currency,
      currencyForm,
      rules,
      formState,
      loading,
      submit,
      reset,
    };
  },
});
</script>
