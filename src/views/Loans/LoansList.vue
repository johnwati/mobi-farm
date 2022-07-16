<template>
  <div>
    <a-breadcrumb>
      <a-breadcrumb-item>
        <a-typography-link href="/dashboard"> Dashboard </a-typography-link>
      </a-breadcrumb-item>

      <a-breadcrumb-item>Loans</a-breadcrumb-item>
    </a-breadcrumb>

    <a-page-header title="Loans" :ghost="false" class="list-page-header">
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
  </div>
</template>

<script lang="ts">
import { useLoans } from "@/composables";
import { defineComponent, onMounted, ref } from "vue";
import DataGrid from "../../components/DataGrid.vue";
export default defineComponent({
  name: "LoansList",
  components: {
    DataGrid,
  },
  setup() {
    const { loans, loanCount, loanStatusList, fetchLoans } = useLoans();
    const loading = ref<boolean>(false);

    const visible = ref<boolean>(false);

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
    ]);

    // const { farmers, fetchFarmers } = useFarmers();

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
