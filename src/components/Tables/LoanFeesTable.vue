<template>
  <NewDataGrid
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
import { LoanFeesForm } from "@/components/Forms";
import NewDataGrid from "@/components/NewDataGrid.vue";
import { useAdmin } from "@/composables";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "LoanFeesTable",

  components: {
    NewDataGrid,
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
    const filteredInfo = ref();
    const sortedInfo = ref();

    const columns = computed(() => {
      const filtered = filteredInfo.value || {};
      const sorted = sortedInfo.value || {};

      return [
        {
          title: "Fee Name",
          dataIndex: "fee_name",
          key: "fee_name",
          filterKey: "fee_name",
          filteredValue: filtered.fee_name,
          onFilter: (value: string, record) =>
            `${record.fee_name}`.toLowerCase().includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
        },
        {
          title: "Interest Rate",
          dataIndex: "rate",
          key: "rate",
          filterKey: "rate",
          filteredValue: filtered.rate,
          onFilter: (value: string, record) =>
            `${record.rate}`.toLowerCase().includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
            customRender: "percentage",
          },
        },
        {
          title: "Fee Type",
          dataIndex: "loan_fee_type",
          key: "loan_fee_type",
          filterKey: "loan_fee_type",
          filteredValue: filtered.loan_fee_type,
          filters: [
            { text: "PERCENTAGE", value: "PERCENTAGE" },
            { text: "FIXED", value: "FIXED" },
          ],
          onFilter: (value: string, record) =>
            `${record.loan_fee_type}`
              .toLowerCase()
              .includes(value.toLowerCase()),
        },
        {
          title: "Duration",
          dataIndex: "duration",
          key: "duration",
          filterKey: "duration",
          filteredValue: filtered.duration,
          filters: [
            { text: "Monthly", value: "Monthly" },
            { text: "Annually", value: "Annually" },
          ],
          onFilter: (value: string, record) =>
            `${record.duration}`.toLowerCase().includes(value.toLowerCase()),
        },
        {
          title: "Loan Product",
          dataIndex: "product_name",
          key: "product_name",
          filterKey: "product_name",
          filteredValue: filtered.product_name,
          onFilter: (value: string, record) =>
            `${record.product_name}`
              .toLowerCase()
              .includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          filterKey: "status",
          filteredValue: filtered.status,
          filters: [
            { text: "ACTIVE", value: "ACTIVE" },
            { text: "INACTIVE", value: "INACTIVE" },
          ],
          onFilter: (value: string, record) =>
            `${record.status}`.toLowerCase().includes(value.toLowerCase()),
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
