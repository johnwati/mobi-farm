<template>
  <div>
    <a-breadcrumb>
      <a-breadcrumb-item>
        <a-typography-link href="/dashboard"> Dashboard </a-typography-link>
      </a-breadcrumb-item>

      <a-breadcrumb-item>Loans</a-breadcrumb-item>
    </a-breadcrumb>

    <a-page-header title="Loans" :ghost="false" class="list-page-header">
      <template #extra>
        <report-export-button reportType="Loans" />
      </template>
    </a-page-header>

    <NewDataGrid
      label="loans"
      :total="loanCount"
      rowKey="code"
      :data-source="loans"
      :columns="columns"
      :loading="loading"
      :rowExpandable="true"
    />
  </div>
</template>

<script lang="ts">
import { useLoans } from "@/composables";
import { computed, defineComponent, onMounted, ref } from "vue";
import NewDataGrid from "../../components/NewDataGrid.vue";
import ReportExportButton from "@/components/ExportButton.vue";
export default defineComponent({
  name: "LoansList",
  components: {
    NewDataGrid,
    ReportExportButton,
  },
  setup() {
    const { loans, loanCount, loanStatusList, fetchLoans } = useLoans();
    const loading = ref<boolean>(false);

    const visible = ref<boolean>(false);

    const filteredInfo = ref();
    const sortedInfo = ref();

    const columns = computed(() => {
      const filtered = filteredInfo.value || {};
      const sorted = sortedInfo.value || {};

      return [
        {
          // title: "Photo",
          dataIndex: "photo",
          key: "photo",
          slots: {
            customRender: "photo",
          },
        },
        {
          title: "Applicant Name",
          dataIndex: "applicant_name",
          key: "applicant_name",
          filterKey: "applicant_name",
          filteredValue: filtered.applicant_name,
          onFilter: (value: string, record) =>
            `${record.applicant_name}`
              .toLowerCase()
              .includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
            customRender: "applicantName",
          },
          // sorter: true,
        },
        {
          title: "Product Name",
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
          // sorter: true,
        },
        {
          title: "Applicant Code",
          dataIndex: "applicant_code",
          key: "applicant_code",
          filterKey: "applicant_code",
          filteredValue: filtered.applicant_code,
          onFilter: (value: string, record) =>
            `${record.applicant_code}`
              .toLowerCase()
              .includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
          // sorter: true,
        },
        {
          title: "Code",
          dataIndex: "code",
          key: "code",
          filterKey: "code",
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
          // sorter: true,
        },
        {
          title: "Loan Status",
          dataIndex: "status",
          key: "status",
          filterKey: "status",
          filteredValue: filtered.status,
          filters: loanStatusList.value,
          onFilter: (value: string, record) =>
            `${record.status}`.toLowerCase().includes(value.toLowerCase()),
          slots: {
            // filterIcon: "filterIcon",
            // filterDropdown: "filterDropdown",
          },
          // sorter: true,
        },
        {
          title: "Interest Rate (%)",
          dataIndex: "interest_rate",
          key: "interest_rate",
          filterKey: "interest_rate",
          // slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // },
          // sorter: true,
        },
        {
          title: "Requested Amount",
          dataIndex: "requested_amount",
          key: "requested_amount",
          filterKey: "requested_amount",
          // slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // },
          // sorter: true,
        },
        {
          title: "Loan Payment Status",
          dataIndex: "payment_status",
          key: "payment_status",
          //   filterKey: "payment_status",
          //   slots: {
          //     filterIcon: "filterIcon",
          //     filterDropdown: "filterDropdown",
          //   },
          //   sorter: true,
        },
        {
          title: "Agrodealer Code",
          dataIndex: "agrodealer_code",
          key: "agrodealer_code",
          // filterKey: "agrodealer_code",
          // slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // },
          // sorter: true,
        },
      ];
    });

    onMounted(async () => {
      try {
        const payload = {
          code: "",
          memberCode: "",
          loanStatus: "",
          page: "",
          pageSize: "",
        };
        await fetchLoans(payload);
      } catch (error) {
        console.error(error);
      }
    });

    const handleTableChange = ({ filteredInfo, sortedInfo }) => {
      filteredInfo.value = filteredInfo;
      sortedInfo.value = sortedInfo;
    };

    return {
      loans,
      loanCount,
      loanStatusList,
      columns,
      loading,
      visible,
      handleTableChange,
    };
  },
});
</script>
