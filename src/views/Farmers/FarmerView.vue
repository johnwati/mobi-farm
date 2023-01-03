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
        <a-skeleton v-if="loading" avatar :paragraph="{ rows: 8 }" />
        <a-row
          v-else
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
                        lg: 100,
                        xl: 100,
                        xxl: 100,
                      }"
                    >
                      <template #icon>
                        <UserOutlined />
                      </template>
                    </a-avatar>
                  </a-col>
                  <a-col style="padding: 0 10px">
                    <a-typography-title :level="4">
                      {{ farmer.full_names }}
                    </a-typography-title>
                    <a-space direction="vertical">
                      <a-typography-text type="secondary">
                        {{ farmer.phone_number }}
                      </a-typography-text>
                      <a-badge v-if="farmer.email_verified" text="verified">
                        <a-typography-text type="secondary">
                          {{ farmer.email }}
                        </a-typography-text>
                      </a-badge>
                      <a-typography-text v-else type="secondary">
                        {{ farmer.email }}
                      </a-typography-text>
                    </a-space>
                  </a-col>
                  <a-col v-if="farmer.new" style="padding: 0px">
                    <a-tag color="#87d068">NEW</a-tag>
                  </a-col>
                  <a-col v-if="farmer.status" style="padding: 0px">
                    <a-tag color="#ff6700">{{ farmer.status }}</a-tag>
                  </a-col>
                </a-row>
                <a-col
                  v-if="hasPermission('farmer-management')"
                  style="padding: 10px"
                >
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
                      title="Wallet Balance"
                      :precision="2"
                      prefix="KShs. "
                      :value-style="{ fontWeight: 'bold' }"
                      :value="farmer.emoney?.current_balance"
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
                <a-col :span="8">
                  <a-card>
                    <a-statistic
                      title="Number of Loans"
                      :precision="0"
                      :value-style="{ fontWeight: 'bold' }"
                      :value="farmerLoansCount || 0"
                    />
                  </a-card>
                </a-col>
              </a-row>
              <a-col :span="16">
                <a-row
                  type="flex"
                  align="top"
                  :gutter="[24, 10]"
                  style="width: 100%; margin: 0 0 20px"
                >
                  <a-col :span="24">
                    <a-typography-title :level="4">
                      Farmer Details
                    </a-typography-title>
                  </a-col>
                  <a-col :span="12">
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
                      <!-- <template #title>
                        <a-typography-title :level="4">
                          Farmer Details
                        </a-typography-title>
                      </template> -->
                      <a-descriptions-item label="Farmer Code">
                        {{ farmer.farmer_code || "-" }}
                      </a-descriptions-item>
                      <a-descriptions-item label="ID Number">
                        {{ farmer.id_no || "-" }}
                      </a-descriptions-item>
                      <a-descriptions-item label="Gender">
                        {{ farmer.gender || "-" }}
                      </a-descriptions-item>
                      <a-descriptions-item label="Marital Status">
                        {{ farmer.marital_status || "-" }}
                      </a-descriptions-item>
                      <a-descriptions-item label="Next of Kin">
                        {{ farmer.next_of_kin_email || "-" }}
                      </a-descriptions-item>
                      <a-descriptions-item label="Next of Kin Email">
                        {{ farmer.next_of_kin_email || "-" }}
                      </a-descriptions-item>
                      <a-descriptions-item label="Sales Agent Code">
                        {{ farmer.sale_agent_code || "-" }}
                      </a-descriptions-item>
                      <a-descriptions-item label="Other source of income">
                        {{ farmer.other_source_od_income || "-" }}
                      </a-descriptions-item>
                    </a-descriptions>
                  </a-col>
                  <a-col :span="12">
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
                      <a-descriptions-item label="Farm Size">
                        {{ farmer.farm_size || "-" }}
                      </a-descriptions-item>
                      <a-descriptions-item label="Region">
                        {{ farmer.region || "-" }}
                      </a-descriptions-item>
                      <a-descriptions-item label="County">
                        {{ farmer.county || "-" }}
                      </a-descriptions-item>
                      <a-descriptions-item label="Ward">
                        {{ farmer.ward || "-" }}
                      </a-descriptions-item>
                      <a-descriptions-item label="Soil Types">
                        {{ farmer.soil_types || "-" }}
                      </a-descriptions-item>
                      <a-descriptions-item label="Value Chain">
                        {{ farmer.value_chaim || "-" }}
                      </a-descriptions-item>
                    </a-descriptions>
                  </a-col>
                </a-row>
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
                      {{ farmer.payment_method || "-" }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Account Number">
                      {{ farmer.account_number || "-" }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Account Name">
                      {{ farmer.account_name || "-" }}
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
                    alignItems: 'center',
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
                  <a-descriptions-item label="Email">
                    <template v-if="farmer.email_verified">
                      <check-outlined style="color: green" />
                    </template>
                    <template v-else>
                      <close-outlined style="color: red" />
                    </template>
                  </a-descriptions-item>
                  <a-descriptions-item label="CRB">
                    <template v-if="farmer.crb_validation">
                      <check-outlined style="color: green" />
                    </template>
                    <template v-else>
                      <close-outlined style="color: red" />
                    </template>
                  </a-descriptions-item>
                  <a-descriptions-item label="Phone Number">
                    <template v-if="farmer.phone_number_validation">
                      <check-outlined style="color: green" />
                    </template>
                    <template v-else>
                      <close-outlined style="color: red" />
                    </template>
                  </a-descriptions-item>
                  <a-descriptions-item label="Phone No. Ownership">
                    <template v-if="farmer.phone_number_ownership_validation">
                      <check-outlined style="color: green" />
                    </template>
                    <template v-else>
                      <close-outlined style="color: red" />
                    </template>
                  </a-descriptions-item>
                  <a-descriptions-item label="IPRS">
                    <template v-if="farmer.iprs_validation">
                      <check-outlined style="color: green" />
                    </template>
                    <template v-else>
                      <close-outlined style="color: red" />
                    </template>
                  </a-descriptions-item>
                  <a-descriptions-item label="IMSI">
                    <template v-if="farmer.imsi_validation">
                      <check-outlined style="color: green" />
                    </template>
                    <template v-else>
                      <close-outlined style="color: red" />
                    </template>
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
        <NewDataGrid
          label="farmer"
          :total="farmerLoansCount"
          :data-source="farmerLoans"
          :columns="columns"
          :loading="loading"
          :rowExpandable="true"
          rowKey="code"
        />
      </a-tab-pane>
      <a-tab-pane key="3" tab="Loan Limits">
        <farmer-limits-table
          ref="limitsTable"
          label="loan limits"
          :total="farmerLimitsCount"
          :data-source="farmerLimits"
          :loading="loading"
          @load-data="fetchLimits"
        />
      </a-tab-pane>
      <a-tab-pane key="4" tab="Wallet Transactions">
        <deposits-table
          label="deposits"
          :total="farmerDepositCount"
          :data-source="farmerDeposits"
          :loading="loading"
        />
      </a-tab-pane>
      <!-- <a-tab-pane key="5" tab="Payments">
        <payments-table
          label="payments"
          :total="farmerPaymentsCount"
          :data-source="farmerLoanPayments"
          :loading="loading"
        />
      </a-tab-pane> -->
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
        @submitted="fetchLimits"
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
import NewDataGrid from "@/components/NewDataGrid.vue";
import { FarmerLimitForm, FarmersForm } from "@/components/Forms";
import DepositsTable from "@/components/Tables/DepositsTable.vue";
import FarmerLimitsTable from "@/components/Tables/FarmerLimitsTable.vue";
import { useAppAuthentication, useFarmers, useLoans } from "@/composables";
import {
  EditFilled,
  UserOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "FarmerView",
  components: {
    NewDataGrid,
    UserOutlined,
    EditFilled,
    FarmersForm,
    DepositsTable,
    FarmerLimitForm,
    FarmerLimitsTable,
    CheckOutlined,
    CloseOutlined,
  },
  setup() {
    const { loans, loanCount, loanStatusList } = useLoans();

    const { hasPermission } = useAppAuthentication();

    const {
      farmer,
      farmerAccountBalance,
      farmerLoans,
      farmerLoansCount,
      farmerDeposits,
      farmerDepositCount,
      farmerLoanPayments,
      farmerPaymentsCount,
      farmerLimits,
      farmerLimitsCount,
      fetchFarmer,
      fetchLoanPayments,
      fetchDeposits,
      fetchFarmerLoans,
      fetchFarmerLoanLimits,
    } = useFarmers();

    const loading = ref<boolean>(false);

    const activeKey = ref("1");
    const route = useRoute();

    const formVisible = ref<boolean>(false);

    const formType = ref<string>("farmerDetails");

    const farmersForm = ref<InstanceType<typeof FarmersForm>>();

    const filteredInfo = ref();
    const sortedInfo = ref();

    const columns = computed(() => {
      const filtered = filteredInfo.value || {};
      const sorted = sortedInfo.value || {};

      return [
        {
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
        },
        {
          title: "Code",
          dataIndex: "code",
          key: "code",
          filterKey: "code",
          filteredValue: filtered.code,
          onFilter: (value: string, record) =>
            `${record.code}`.toLowerCase().includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
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
          // slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // },
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
      loading.value = true;
      try {
        const data = await fetchFarmer(
          parseInt(route.params.farmerId as string)
        );
        await fetchDeposits(data.id as number);
        await fetchLoanPayments(data.id as number);
        await fetchFarmerLoanLimits(data.id as number);
        await fetchFarmerLoans(data.farmer_code as string);
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
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

    const fetchLimits = async () => {
      loading.value = true;
      try {
        await fetchFarmerLoanLimits(parseInt(route.params.farmerId as string));
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    };

    return {
      fetchLimits,
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
      farmerLimits,
      farmerLimitsCount,
      fetchFarmerLoanLimits,
      afterVisibleChange,
      openEditForm,
      closeDrawer,
      hasPermission,
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
