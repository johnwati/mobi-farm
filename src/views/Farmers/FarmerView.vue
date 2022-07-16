<template>
  <div class="full-width">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <a-typography-link href="/dashboard"> Dashboard </a-typography-link>
      </a-breadcrumb-item>

      <a-breadcrumb-item>
        {{ farmer.fname + " " + farmer.lname }}
      </a-breadcrumb-item>
    </a-breadcrumb>

    <a-tabs v-model:activeKey="activeKey" class="tabs" type="card">
      <a-tab-pane key="1" tab="Profile" class="tab_body">
        <a-row
          type="flex"
          :gutter="[0, 12]"
          justify="flex-start"
          align="stretch"
          style="width: 100%; padding-top: 10px"
        >
          <a-col :span="24">
            <a-card style="width: 100%" :bodyStyle="{ padding: '15px' }">
              <a-row
                type="flex"
                justify="space-between"
                align="stretch"
                style="width: 100%"
              >
                <a-row type="flex" justify="flex-start">
                  <a-col>
                    <a-avatar
                      :src="farmer.image"
                      :size="{
                        xs: 24,
                        sm: 32,
                        md: 40,
                        lg: 64,
                        xl: 80,
                        xxl: 100,
                      }"
                    >
                      <template #icon>
                        <UserOutlined />
                      </template>
                    </a-avatar>
                  </a-col>
                  <a-col style="padding: 10px">
                    <a-typography-title :level="4">
                      {{ farmer.fname + " " + farmer.lname }}
                    </a-typography-title>
                    <a-typography-text type="secondary">{{
                      farmer.phone_number
                    }}</a-typography-text>
                  </a-col>
                  <a-col v-if="farmer.new" style="padding: 10px">
                    <a-tag color="#87d068">NEW</a-tag>
                  </a-col>
                </a-row>
                <a-col style="padding: 10px">
                  <a-button
                    style="margin: 5px"
                    type="primary"
                    @click="() => openEditForm('farmerDetails')"
                  >
                    <template #icon>
                      <EditFilled />
                    </template>

                    Edit Farmer
                  </a-button>
                  <a-button
                    style="margin: 5px"
                    type="primary"
                    @click="() => openEditForm('farmerLimits')"
                  >
                    <template #icon>
                      <EditFilled />
                    </template>

                    Create Limits
                  </a-button>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
          <a-col :span="24">
            <a-row
              type="flex"
              :gutter="[24, 12]"
              justify="flex-start"
              align="stretch"
              style="
                width: 100%;
                height: 100%;
                padding: 25px;
                margin: 0;
                background-color: white;
              "
            >
              <a-row
                type="flex"
                :gutter="24"
                style="width: 100%; margin: 0 0 20px"
                class="farmer-statistics-container"
              >
                <a-col :span="8">
                  <a-card>
                    <a-statistic
                      title="Deposit Balance"
                      :precision="2"
                      prefix="KShs. "
                      :value-style="{ fontWeight: 'bold' }"
                      :value="farmer.loan_limit"
                    />
                  </a-card>
                </a-col>
                <a-col :span="8">
                  <a-card>
                    <a-statistic
                      title="Loan Limit"
                      :precision="2"
                      prefix="KShs. "
                      :value-style="{ fontWeight: 'bold' }"
                      :value="farmer.loan_limit || 0"
                    />
                  </a-card>
                </a-col>
                <a-col :span="8">
                  <a-card>
                    <a-statistic
                      title="Deposit Limit"
                      :precision="2"
                      prefix="KShs. "
                      :value-style="{ fontWeight: 'bold' }"
                      :value="farmer.deposit_limit || 0"
                    />
                  </a-card>
                </a-col>
              </a-row>
              <a-col :span="16">
                <a-descriptions
                  :column="2"
                  :contentStyle="{
                    alignText: 'right',
                    fontWeight: 'normal',
                    color: '#36454F',
                  }"
                  :labelStyle="{
                    fontWeight: 'bold',
                  }"
                >
                  <template #title>
                    <a-typography-title :level="4">
                      Farmer Details
                    </a-typography-title>
                  </template>
                  <a-descriptions-item label="Farmer Code">
                    {{ farmer.farmer_code }}
                  </a-descriptions-item>
                  <a-descriptions-item label="Status">
                    {{ farmer.status }}
                  </a-descriptions-item>
                  <a-descriptions-item label="Value Chain">
                    {{ farmer.value_chaim }}
                  </a-descriptions-item>
                  <a-descriptions-item label="Farm Size">
                    {{ farmer.farm_size }}
                  </a-descriptions-item>
                  <a-descriptions-item label="County">
                    {{ farmer.county }}
                  </a-descriptions-item>
                  <a-descriptions-item label="Ward">
                    {{ farmer.ward }}
                  </a-descriptions-item>
                </a-descriptions>
              </a-col>
              <a-col :span="8">
                <a-card class="financials_tab">
                  <a-descriptions
                    :column="1"
                    :contentStyle="{
                      textAlign: 'right',
                      fontWeight: 'normal',
                      color: '#36454F',
                    }"
                    :labelStyle="{
                      fontWeight: 'bold',
                      fontSize: 14,
                    }"
                  >
                    <template #title>
                      <a-typography-title :level="4">
                        Financial Details
                      </a-typography-title>
                    </template>
                    <a-descriptions-item label="Payment Method">
                      {{ farmer.payment_method }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Account Number">
                      {{ farmer.account_number }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Account Name">
                      {{ farmer.account_name }}
                    </a-descriptions-item>
                  </a-descriptions>
                </a-card>
              </a-col>
              <a-divider />
              <a-col :span="24">
                <a-descriptions
                  :column="3"
                  :contentStyle="{
                    alignText: 'right',
                    fontWeight: 'normal',
                    color: '#36454F',
                  }"
                  :labelStyle="{
                    fontWeight: 'bold',
                  }"
                >
                  <template #title>
                    <a-typography-title :level="4">
                      Validation
                    </a-typography-title>
                  </template>
                  <a-descriptions-item label="Email Validation">
                    {{ farmer.email_validation }}
                  </a-descriptions-item>
                  <a-descriptions-item label="CRB Validation">
                    {{ farmer.crb_validation }}
                  </a-descriptions-item>
                  <a-descriptions-item label="Phone Number Validation">
                    {{ farmer.phone_number_validation }}
                  </a-descriptions-item>
                  <a-descriptions-item label="Phone No. Ownership Validation">
                    {{ farmer.phone_number_ownership_validation }}
                  </a-descriptions-item>
                  <a-descriptions-item label="IPRS Validation">
                    {{ farmer.iprs_validation }}
                  </a-descriptions-item>
                  <a-descriptions-item label="IMSI Validation">
                    {{ farmer.imsi_validation }}
                  </a-descriptions-item>
                </a-descriptions>
              </a-col>
            </a-row>
          </a-col>
          <!-- <a-row
          type="flex"
          justify="flex-start"
          align="stretch"
          style="width: 65%; padding-top: 25px"
        > -->

          <!-- </a-row> -->
        </a-row>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Loans" force-render>
        <DataGrid
          label="farmer"
          :total="farmerLoansCount"
          :data-source="farmerLoans"
          :columns="columns"
          :loading="loading"
          :rowExpandable="true"
          rowKey="code"
        />
      </a-tab-pane>
      <a-tab-pane key="3" tab="Deposits">
        <deposits-table
          label="deposits"
          :total="farmerDepositCount"
          :data-source="farmerDeposits"
          :loading="loading"
        />
      </a-tab-pane>
      <a-tab-pane key="4" tab="Payments">
        <payments-table
          label="payments"
          :total="farmerPaymentsCount"
          :data-source="farmerLoanPayments"
          :loading="loading"
        />
      </a-tab-pane>
    </a-tabs>

    <a-drawer
      title="Farmer's Form"
      placement="right"
      :closable="false"
      :mask-closable="false"
      size="large"
      v-model:visible="formVisible"
      @after-visible-change="afterVisibleChange"
    >
      <farmers-form
        v-if="formType === 'farmerDetails'"
        ref="farmersForm"
        :is-editing="true"
        @close-drawer="closeDrawer"
      />
      <farmer-limit-form
        v-else-if="formType === 'farmerLimits'"
        ref="farmersForm"
        :is-editing="false"
        @close-drawer="closeDrawer"
      />
    </a-drawer>

    <!-- <a-drawer
      title="Farmer's Limits"
      placement="right"
      :closable="false"
      :mask-closable="false"
      size="large"
      v-model:visible="limitsFormVisible"
      @after-visible-change="afterVisibleChange"
    >
      <farmers-form
        ref="farmersForm"
        :is-editing="true"
        @close-drawer="closeDrawer"
      />
    </a-drawer> -->
  </div>
</template>

<script lang="ts">
import DataGrid from "@/components/DataGrid.vue";
import { FarmerLimitForm, FarmersForm } from "@/components/Forms";
import DepositsTable from "@/components/Tables/DepositsTable.vue";
import PaymentsTable from "@/components/Tables/PaymentsTable.vue";
import { useFarmers, useLoans } from "@/composables";
import { EditFilled, UserOutlined } from "@ant-design/icons-vue";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "FarmerView",
  components: {
    DataGrid,
    UserOutlined,
    EditFilled,
    FarmersForm,
    DepositsTable,
    PaymentsTable,
    FarmerLimitForm,
  },
  setup() {
    const { loans, loanCount, loanStatusList } = useLoans();
    const loading = ref<boolean>(false);

    const activeKey = ref("1");
    const route = useRoute();

    const formVisible = ref<boolean>(false);

    const formType = ref<string>("farmerDetails");

    const farmersForm = ref<InstanceType<typeof FarmersForm>>();

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
        // slots: {
        //   filterIcon: "filterIcon",
        //   filterDropdown: "filterDropdown",
        // },
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

    const {
      farmer,
      farmerAccountBalance,
      fetchFarmer,
      fetchLoanPayments,
      fetchDeposits,
      farmerLoans,
      farmerLoansCount,
      farmerDeposits,
      farmerDepositCount,
      farmerLoanPayments,
      farmerPaymentsCount,
      fetchFarmerLoans,
    } = useFarmers();

    onMounted(async () => {
      try {
        const data = await fetchFarmer(
          parseInt(route.params.farmerId as string)
        );
        console.log("mounting", farmer);
        await fetchDeposits(data.farmer_code);
        await fetchLoanPayments(data.farmer_code);
        await fetchFarmerLoans(data.farmer_code);
      } catch (error) {
        console.error(error);
      }
    });

    const afterVisibleChange = (status: boolean) => {
      if (!status) {
        farmersForm.value?.reset();
      }
    };

    const closeDrawer = () => {
      formVisible.value = false;
    };

    const openEditForm = (type: string) => {
      formVisible.value = true;
      formType.value = type;
    };

    return {
      formType,
      loans,
      farmerLoans,
      farmerLoansCount,
      loanCount,
      loanStatusList,
      columns,
      loading,
      formVisible,
      activeKey,
      farmer,
      farmerDeposits,
      farmerDepositCount,
      farmerLoanPayments,
      farmerPaymentsCount,
      farmerAccountBalance,
      afterVisibleChange,
      openEditForm,
      closeDrawer,
    };
  },
});
</script>

<style scoped>
.tabs {
  /* padding: 0px 10px; */
  margin-top: 10px;
  /* background-color: rgb(250, 250, 250); */
}
.tab_body {
  flex: 1;
  /* padding: 0 20px; */
  /* over */
  /* background-color: rgb(250, 250, 250); */
}
.financials_tab {
  background-color: rgba(84, 186, 253, 0.3);
}

.farmer-statistics-container .ant-card {
  /* background-color: #f9f9f9; */
  background-color: #f9f9f9;
  border-radius: 15px;
  border: none;
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px; */
  box-shadow: rgba(75, 50, 50, 0.1) 0px 2px 4px 0px;
}
</style>
