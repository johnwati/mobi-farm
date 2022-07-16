<template>
  <DataGrid
    :label="label"
    :total="total"
    :data-source="dataSource"
    :columns="columns"
    :loading="loading"
    :rowExpandable="false"
    @edit="editProduct"
  />

  <a-drawer
    title="Loan Products"
    placement="right"
    :closable="false"
    :mask-closable="false"
    size="large"
    v-model:visible="formVisible"
    @after-visible-change="afterVisibleChange"
  >
    <loan-product-form
      ref="loanProductForm"
      :is-editing="isEditing"
      @close-drawer="closeDrawer"
    />
  </a-drawer>
</template>

<script lang="ts">
import DataGrid from "@/components/DataGrid.vue";
import LoanProductForm from "@/components/Forms/LoanProductForm.vue";
import { useAdmin } from "@/composables";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LoanProductsTable",

  components: {
    DataGrid,
    LoanProductForm,
  },

  props: {
    label: {
      type: String,
      required: true,
    },

    dataSource: {
      type: Array,
      required: true,
    },

    loading: {
      type: Boolean,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },
  },

  setup() {
    const { setLoanProduct } = useAdmin();
    const columns = ref([
      {
        title: "Product Name",
        dataIndex: "name",
        key: "name",
        filterKey: "name_contains",
      },
      {
        title: "Interest Rate (%)",
        dataIndex: "interest",
        key: "interest",
        filterKey: "interest_contains",
        slots: {
          // customRender: "currency",
        },
      },
      {
        title: "Service Fee",
        dataIndex: "service_fee",
        key: "service_fee",
        filterKey: "service_fee_contains",
        slots: {
          customRender: "currency",
        },
      },
      {
        title: "Min Amount",
        dataIndex: "min_amount",
        key: "min_amount",
        filterKey: "min_amount_contains",
        slots: {
          customRender: "currency",
        },
      },
      {
        title: "Max Amount",
        dataIndex: "max_amount",
        key: "max_amount",
        filterKey: "max_amount_contains",
        slots: {
          customRender: "currency",
        },
      },
      {
        title: "Min Payment Duration",
        dataIndex: "min_payment_duration",
        key: "min_payment_duration",
        filterKey: "min_payment_duration_contains",
        slots: {
          // customRender: "currency",
        },
      },
      {
        title: "Max Payment Duration",
        dataIndex: "max_payment_duration",
        key: "max_payment_duration",
        filterKey: "max_payment_duration_contains",
        slots: {
          // customRender: "currency",
        },
      },
      {
        title: "Processing Insurance",
        dataIndex: "processing_insurance",
        key: "processing_insurance",
        filterKey: "processing_insurance_contains",
      },
      {
        title: "Repayment Method",
        dataIndex: "repayment_method",
        key: "repayment_method",
        filterKey: "repayment_method_contains",
      },
      {
        title: "Has Penalty",
        dataIndex: "has_penalty",
        key: "has_penalty",
        filterKey: "has_penalty_contains",
        slots: {
          customRender: "boolean",
        },
      },
      {
        title: "Penalty Rate Type",
        dataIndex: "penalty_rate_type",
        key: "penalty_rate_type",
        filterKey: "penalty_rate_type_contains",
      },
      {
        title: "Penalty Rate",
        dataIndex: "penalty_rate",
        key: "penalty_rate",
        filterKey: "penalty_rate_contains",
      },
      {
        title: "Max Grace Period",
        dataIndex: "max_grace_period",
        key: "max_grace_period",
        filterKey: "max_grace_period_contains",
      },
      {
        title: "Penalty grace period",
        dataIndex: "penalty_grace_period",
        key: "penalty_grace_period",
        filterKey: "penalty_grace_period_contains",
      },
      {
        title: "Min guarantors",
        dataIndex: "min_guarantors",
        key: "min_guarantors",
        filterKey: "min_guarantors_contains",
      },
      {
        title: "Allow Concurrent Loans",
        dataIndex: "allow_concurrent_loans",
        key: "allow_concurrent_loans",
        filterKey: "allow_concurrent_loans_contains",
        slots: {
          customRender: "boolean",
        },
      },
      {
        title: "Max Concurrent Loans",
        dataIndex: "max_concurrent_loans",
        key: "max_concurrent_loans",
        filterKey: "max_concurrent_loans_contains",
      },
      {
        title: "Loan Code",
        dataIndex: "code",
        key: "code",
        filterKey: "code_contains",
        slots: {
          filterIcon: "filterIcon",
          filterDropdown: "filterDropdown",
        },
      },
      {
        title: "Loan Type",
        dataIndex: "loan_type",
        key: "loan_type",
        filterKey: "loan_type_contains",
        slots: {
          filterIcon: "filterIcon",
          filterDropdown: "filterDropdown",
        },
      },
      // {
      //   title: "Requested Amount",
      //   dataIndex: "requested_amount",
      //   key: "requested_amount",
      //   filterKey: "requested_amount_contains",
      // },
      {
        title: "Action",
        key: "action",
        slots: { customRender: "editAction" },
      },
    ]);

    const isEditing = ref<boolean>(false);

    const formVisible = ref<boolean>(false);

    const loanProductForm = ref<InstanceType<typeof LoanProductForm>>();

    const createProduct = () => {
      formVisible.value = true;
      isEditing.value = false;
    };

    const editProduct = (data) => {
      formVisible.value = true;
      setLoanProduct(data);
      isEditing.value = true;
    };

    const closeDrawer = () => {
      formVisible.value = false;
    };

    const afterVisibleChange = (status: boolean) => {
      if (!status) {
        loanProductForm.value?.reset();
      }
    };
    return {
      columns,
      isEditing,
      formVisible,
      loanProductForm,
      editProduct,
      createProduct,
      closeDrawer,
      afterVisibleChange,
    };
  },
});
</script>
