<template>
  <div>
    <a-breadcrumb>
      <a-breadcrumb-item>
        <a-typography-link href="/dashboard"> Dashboard </a-typography-link>
      </a-breadcrumb-item>

      <a-breadcrumb-item>Loans</a-breadcrumb-item>
    </a-breadcrumb>

    <a-page-header title="Loans" :ghost="false" class="list-page-header">
      <!-- <template #extra>
        <a-button key="1" type="primary" @click="visible = true">
          <template #icon>
            <PlusOutlined />
          </template>

          Add Loan
        </a-button>
      </template> -->
    </a-page-header>

    <DataGrid
      label="loans"
      :total="loanCount"
      rowKey="code"
      :data-source="loans"
      :columns="columns"
      :loading="loading"
      :rowExpandable="true"
    />
    <!-- <DataGrid
      label="assignments"
      :total="assignmentsCount"
      :data-source="assignments"
      :columns="columns"
      :loading="loading"
      @edit="editAssignment"
      @remove="removeAssignment"
      @handle-search="handleSearch"
      @handle-table-change="handleTableChange"
    /> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import DataGrid from "@/components/DataGrid.vue";
import { useLoans } from "@/composables";
export default defineComponent({
  name: "LoansList",
  components: {
    DataGrid,
    PlusOutlined,
  },
  setup() {
    const { loans, loanCount, loanStatusList } = useLoans();
    const loading = ref<boolean>(false);

    const visible = ref<boolean>(false);

    // const loansFilters = [...loanStatusList].map((i) => ({
    //   text: i.name,
    //   name: i.name,
    // }));

    const columns = ref([
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
        filterKey: "applicant_name_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          customRender: "applicantName",
        },
        // sorter: true,
      },
      {
        title: "Product Name",
        dataIndex: "product_name",
        key: "product_name",
        filterKey: "product_name_contains",
        // slots: {
        //   filterIcon: "filterIcon",
        //   filterDropdown: "filterDropdown",
        // },
        // sorter: true,
      },
      {
        title: "Applicant Code",
        dataIndex: "applicant_code",
        key: "applicant_code",
        filterKey: "applicant_code_contains",
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
        filterKey: "code_contains",
        slots: {
          filterIcon: "filterIcon",
          filterDropdown: "filterDropdown",
        },
        // sorter: true,
      },
      // {
      //   title: "Applicant Email",
      //   dataIndex: "applicant_email",
      //   key: "applicant_email",
      //   filterKey: "applicant_email_contains",
      //   slots: {
      //     filterIcon: "filterIcon",
      //     filterDropdown: "filterDropdown",
      //   },
      //   sorter: true,
      // },
      // {
      //   title: "Applicant Phone",
      //   dataIndex: "applicant_phone",
      //   key: "applicant_phone",
      //   filterKey: "applicant_phone_contains",
      //   slots: {
      //     filterIcon: "filterIcon",
      //     filterDropdown: "filterDropdown",
      //   },
      //   sorter: true,
      // },
      {
        title: "Loan Status",
        dataIndex: "status",
        key: "status",
        filterKey: "status_contains",
        filters: loanStatusList,
        // slots: {
        //   filterIcon: "filterIcon",
        //   filterDropdown: "filterDropdown",
        // },
        // sorter: true,
      },
      {
        title: "Interest Rate (%)",
        dataIndex: "interest_rate",
        key: "interest_rate",
        filterKey: "interest_rate_contains",
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
        filterKey: "requested_amount_contains",
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
        //   filterKey: "payment_status_contains",
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
        // filterKey: "agrodealer_code_contains",
        // slots: {
        //   filterIcon: "filterIcon",
        //   filterDropdown: "filterDropdown",
        // },
        // sorter: true,
      },
      // {
      //   title: "Loan Product Code",
      //   dataIndex: "loan_product_code",
      //   key: "loan_product_code",
      //   filterKey: "loan_product_code_contains",
      //   slots: {
      //     filterIcon: "filterIcon",
      //     filterDropdown: "filterDropdown",
      //   },
      //   sorter: true,
      // },
      // {
      //   title: "Product Code",
      //   dataIndex: "product_code",
      //   key: "product_code",
      //   filterKey: "product_code_contains",
      //   slots: {
      //     filterIcon: "filterIcon",
      //     filterDropdown: "filterDropdown",
      //   },
      //   sorter: true,
      // },
      // {
      //   title: "Balance",
      //   dataIndex: "balance",
      //   key: "balance",
      //   filterKey: "balance_contains",
      //   slots: {
      //     filterIcon: "filterIcon",
      //     filterDropdown: "filterDropdown",
      //   },
      //   sorter: true,
      // },
      // {
      //   title: "Paid",
      //   dataIndex: "paid",
      //   key: "paid",
      //   filterKey: "paid_contains",
      //   slots: {
      //     filterIcon: "filterIcon",
      //     filterDropdown: "filterDropdown",
      //   },
      //   sorter: true,
      // },
      // {
      //   title: "Expected completion date.",
      //   dataIndex: "expected_completion_date",
      //   key: "expected_completion_date",
      //   filterKey: "expected_completion_date_contains",
      //   slots: {
      //     filterIcon: "filterIcon",
      //     filterDropdown: "filterDropdown",
      //   },
      //   sorter: true,
      // },
      // {
      //   title: "Applicant Code",
      //   dataIndex: "applicant_code",
      //   key: "applicant_code",
      //   filterKey: "applicant_code_contains",
      //   slots: {
      //     filterIcon: "filterIcon",
      //     filterDropdown: "filterDropdown",
      //   },
      //   sorter: true,
      // },
      // {
      //   title: "Principal Amount",
      //   dataIndex: "principal_amount",
      //   key: "principal_amount",
      //   filterKey: "principal_amount_contains",
      //   slots: {
      //     filterIcon: "filterIcon",
      //     filterDropdown: "filterDropdown",
      //   },
      //   sorter: true,
      // },
      // {
      //   title: "Total Amount",
      //   dataIndex: "total_amount",
      //   key: "total_amount",
      //   filterKey: "total_amount_contains",
      //   slots: {
      //     filterIcon: "filterIcon",
      //     filterDropdown: "filterDropdown",
      //   },
      //   sorter: true,
      // },
      // {
      //   title: "Action",
      //   key: "action",
      //   slots: { customRender: "action" },
      // },
    ]);

    // const { farmers, fetchFarmers } = useFarmers();

    onMounted(async () => {
      try {
        // await fetchFarmers();
      } catch (error) {
        console.error(error);
      }
    });

    return {
      loans,
      loanCount,
      loanStatusList,
      columns,
      loading,
      visible,
    };
  },
});
</script>
