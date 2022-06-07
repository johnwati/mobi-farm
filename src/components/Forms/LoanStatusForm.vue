<template>
  <a-spin :spinning="loading">
    <a-descriptions
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
      <a-descriptions-item label="Loan Code">
        {{ loan.code }}
      </a-descriptions-item>
      <a-descriptions-item label="Applicant Name">
        {{ loan.applicant_name }}
      </a-descriptions-item>
      <a-descriptions-item label="Current Status">
        {{ loan.status }}
      </a-descriptions-item>
    </a-descriptions>
    <a-divider />
    <a-form
      layout="vertical"
      ref="loanStatusForm"
      :rules="rules"
      :model="formState"
    >
      <a-form-item label="Loan Status" name="sale_agent_code">
        <a-select
          ref="statusSelect"
          v-model:value="formState.status"
          style="width: 150px"
        >
          <a-select-option
            v-for="(item, ind) in loanStatusList"
            :value="item.name"
            :key="ind"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Comments" name="id_no">
        <a-textarea
          v-model:value="formState.comments"
          placeholder="Add comments"
          :rows="4"
        />
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
  name: "LoanStatusForm",

  props: {
    isEditing: {
      type: Boolean,
      required: true,
    },
  },

  emits: ["close-drawer"],

  setup(props, { emit }) {
    const { loan, loanStatusList, updateLoanStatus } = useLoans();

    const loanStatusForm = ref();

    const loading = ref<boolean>(false);

    const formState = ref({
      status: "",
      comments: "",
    });

    const rules = ref({
      status: [{ required: true }],
      comments: [{ required: true }],
    });

    const submit = async () => {
      loading.value = true;
      try {
        await loanStatusForm.value.validate();
        await updateLoanStatus({
          code: loan.value.code,
          data: formState.value,
        });
        loanStatusForm.value.resetFields();
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
        emit("close-drawer");
      }
    };

    const reset = () => {
      try {
        loanStatusForm.value.resetFields();
        emit("close-drawer");
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(async () => {
      loading.value = true;
      try {
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
              status: loan.value.status,
              comments: loan.value.reason,
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
      () => formState.value.status,
      async () => {
        loading.value = true;
        try {
          if (formState.value.status === loan.value.status) {
            formState.value.comments = loan.value.reason;
          } else {
            formState.value.comments = "";
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
      loanStatusForm,
      loanStatusList,
      rules,
      formState,
      loading,
      submit,
      reset,
    };
  },
});
</script>
