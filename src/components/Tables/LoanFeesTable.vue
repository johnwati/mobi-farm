<template>
  <DataGrid
    :label="label"
    :total="total"
    :data-source="dataSource"
    :columns="columns"
    :loading="loading"
    :rowExpandable="false"
    @edit="editFee"
  />

  <a-drawer
    title="Loan Fee Form"
    placement="right"
    :closable="false"
    :mask-closable="false"
    size="large"
    v-model:visible="formVisible"
    @after-visible-change="afterVisibleChange"
  >
    <loan-fees-form
      ref="loanFeeForm"
      :is-editing="isEditing"
      @close-drawer="closeDrawer"
    />
  </a-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DataGrid from "@/components/DataGrid.vue";
import { LoanFeesForm } from "@/components/Forms";
import { useAdmin } from "@/composables";

export default defineComponent({
  name: "LoanFeesTable",

  components: {
    DataGrid,
    LoanFeesForm,
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
    const columns = ref([
      {
        title: "Fee Name",
        dataIndex: "fee_name",
        key: "fee_name",
        filterKey: "fee_name_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "Interest Rate",
        dataIndex: "rate",
        key: "rate",
        filterKey: "rate_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          customRender: "percentage",
        },
        // sorter: true,
      },
      {
        title: "Fee Type",
        dataIndex: "loan_fee_type",
        key: "loan_fee_type",
        filterKey: "loan_fee_type_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "Duration",
        dataIndex: "duration",
        key: "duration",
        filterKey: "duration_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "Loan Product",
        dataIndex: "product_name",
        key: "product_name",
        filterKey: "product_name_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        filterKey: "status_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // customRender: "boolean",
        },
        // sorter: true,
      },
      {
        title: "Action",
        key: "action",
        slots: { customRender: "editAction" },
      },
    ]);

    const isEditing = ref<boolean>(false);

    const formVisible = ref<boolean>(false);

    const loanFeeForm = ref<InstanceType<typeof LoanFeesForm>>();

    const { setLoanFee } = useAdmin();

    const createFee = () => {
      formVisible.value = true;
      isEditing.value = false;
    };

    const editFee = async (data) => {
      await setLoanFee(data);
      formVisible.value = true;
      isEditing.value = true;
    };

    const closeDrawer = () => {
      formVisible.value = false;
    };

    const afterVisibleChange = (status: boolean) => {
      if (!status) {
        loanFeeForm.value?.reset();
        emit("load-data");
      }
    };
    return {
      columns,
      isEditing,
      formVisible,
      loanFeeForm,
      createFee,
      editFee,
      closeDrawer,
      afterVisibleChange,
    };
  },
});
</script>
