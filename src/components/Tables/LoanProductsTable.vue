<template>
  <NewDataGrid
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
import NewDataGrid from "@/components/NewDataGrid.vue";
import LoanProductForm from "@/components/Forms/LoanProductForm.vue";
import { useAdmin } from "@/composables";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "LoanProductsTable",

  components: {
    NewDataGrid,
    LoanProductForm,
  },

  emits: ["load-data"],

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

  setup(props, { emit }) {
    const { setLoanProduct } = useAdmin();

    const filteredInfo = ref();
    const sortedInfo = ref();

    const columns = computed(() => {
      const filtered = filteredInfo.value || {};
      const sorted = sortedInfo.value || {};

      return [
        {
          title: "Product Name",
          dataIndex: "name",
          key: "name",
          filterKey: "name",
          filteredValue: filtered.name,
          onFilter: (value: string, record) =>
            record.name.toLowerCase().includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
        },
        {
          title: "Min Amount",
          dataIndex: "min_amount",
          key: "min_amount",
          filterKey: "min_amount",
          slots: {
            customRender: "currency",
          },
        },
        {
          title: "Max Amount",
          dataIndex: "max_amount",
          key: "max_amount",
          filterKey: "max_amount",
          slots: {
            customRender: "currency",
          },
        },
        {
          title: "Repayment Method",
          dataIndex: "repayment_method",
          key: "repayment_method",
          filterKey: "repayment_method",
          filteredValue: filtered.repayment_method,
          onFilter: (value: string, record) =>
            record.repayment_method.toLowerCase().includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
        },
        // {
        //   title: "Interest Rate (%)",
        //   dataIndex: "interest",
        //   key: "interest",
        //   filterKey: "interest",
        //   slots: {
        //     // customRender: "currency",
        //   },
        // },
        // {
        //   title: "Fee Type",
        //   dataIndex: "loan_fees_data.loan_fee_type",
        //   key: "loan_fees_data.loan_fee_type",
        //   filterKey: "loan_fee_type",
        //   slots: {
        //     customRender: "currency",
        //   },
        // },
        // {
        //   title: "Duration",
        //   dataIndex: "loan_fees_data.duration",
        //   key: "loan_fees_data.duration",
        //   filterKey: "duration",
        //   slots: {
        //     // customRender: "currency",
        //   },
        // },
        // {
        //   title: "Charged on",
        //   dataIndex: "loan_fees_data.charged_on",
        //   key: "loan_fees_data.charged_on",
        //   filterKey: "charged_on",
        //   slots: {
        //     // customRender: "currency",
        //   },
        // },
        {
          title: "Max Grace Period",
          dataIndex: "max_grace_period",
          key: "max_grace_period",
          filterKey: "max_grace_period",
        },
        {
          title: "Allow Concurrent Loans",
          dataIndex: "allow_concurrent_loans",
          key: "allow_concurrent_loans",
          filterKey: "allow_concurrent_loans",
          filteredValue: filtered.allow_concurrent_loans,
          filters: [
            { text: "Yes", value: true },
            { text: "No", value: false },
          ],
          onFilter: (value: string, record) =>
            record.allow_concurrent_loans === value,
          slots: {
            customRender: "boolean",
          },
        },
        {
          title: "Max Concurrent Loans",
          dataIndex: "max_concurrent_loans",
          key: "max_concurrent_loans",
          filterKey: "max_concurrent_loans",
        },
        {
          title: "Loan Code",
          dataIndex: "code",
          key: "code",
          filterKey: "code",
          filteredValue: filtered.code,
          onFilter: (value: string, record) =>
            record.code.toLowerCase().includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
        },
        {
          title: "Loan Type",
          dataIndex: "loan_type",
          key: "loan_type",
          filterKey: "loan_type",
          filteredValue: filtered.loan_type,
          onFilter: (value: string, record) =>
            record.loan_type.toLowerCase().includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
        },
        {
          title: "Action",
          key: "action",
          slots: { customRender: "editAction" },
        },
      ];
    });

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
        emit("load-data");
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
