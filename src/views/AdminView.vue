<template>
  <div class="full-width">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <a-typography-link href="/dashboard"> Dashboard </a-typography-link>
      </a-breadcrumb-item>

      <a-breadcrumb-item>{{ farmer.full_names }}</a-breadcrumb-item>
    </a-breadcrumb>

    <a-tabs v-model:activeKey="activeKey" class="tabs" type="card">
      <a-tab-pane key="1" tab="Loan Limits" class="tab_body">
        <a-page-header
          title="Farmer Limits"
          :ghost="false"
          class="list-page-header"
        >
          <template #extra>
            <a-button type="primary" @click="visible = true">
              <template #icon>
                <PlusOutlined />
              </template>

              Add Limit
            </a-button>
            <a-button type="primary" @click="visible = true">
              <template #icon>
                <PlusOutlined />
              </template>

              Batch Upload Limits
            </a-button>
          </template>
        </a-page-header>

        <farmer-limits-table
          label="deposits"
          :total="farmerLimitsCount"
          :data-source="farmerLimits"
          :loading="loading"
          @edit="editFarmerLimits"
          @remove="removeFarmerLimits"
        />
      </a-tab-pane>
      <a-tab-pane key="2" tab="Loan Products">
        <a-page-header
          title="Loan Products"
          :ghost="false"
          class="list-page-header"
        >
          <template #extra>
            <a-button key="1" type="primary" @click="visible = true">
              <template #icon>
                <PlusOutlined />
              </template>

              Add Products
            </a-button>
          </template>
        </a-page-header>
        <!-- <DataGrid
          label="farmer"
          :total="loanCount"
          :data-source="farmerLoans"
          :columns="columns"
          :loading="loading"
          :rowExpandable="true"
          rowKey="code"
        /> -->
      </a-tab-pane>
      <a-tab-pane key="3" tab="AgroDealers">
        <a-page-header
          title="Agro-Dealers"
          :ghost="false"
          class="list-page-header"
        >
          <template #extra>
            <a-button key="1" type="primary" @click="visible = true">
              <template #icon>
                <PlusOutlined />
              </template>

              Add Agro-Dealers
            </a-button>
          </template>
        </a-page-header>
        <!-- <deposits-table
          label="deposits"
          :total="farmerDepositCount"
          :data-source="farmerDeposits"
          :loading="loading"
        /> -->
      </a-tab-pane>
      <a-tab-pane key="4" tab="Items">
        <a-page-header title="Items" :ghost="false" class="list-page-header">
          <template #extra>
            <a-button key="1" type="primary" @click="visible = true">
              <template #icon>
                <PlusOutlined />
              </template>

              Add Items
            </a-button>
          </template>
        </a-page-header>
        <!-- <payments-table
          label="payments"
          :total="farmerPaymentsCount"
          :data-source="farmerLoanPayments"
          :loading="loading"
        /> -->
      </a-tab-pane>
      <a-tab-pane key="5" tab="Currency Setup">
        <a-page-header
          title="Currency Setup"
          :ghost="false"
          class="list-page-header"
        >
          <template #extra>
            <a-button key="1" type="primary" @click="visible = true">
              <template #icon>
                <PlusOutlined />
              </template>

              Add Currency
            </a-button>
          </template>
        </a-page-header>
        <!-- <payments-table
          label="payments"
          :total="farmerPaymentsCount"
          :data-source="farmerLoanPayments"
          :loading="loading"
        /> -->
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
      <currency-form
        ref="currencyForm"
        :is-editing="true"
        @close-drawer="closeDrawer"
      />
    </a-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { PlusOutlined, UserOutlined, EditFilled } from "@ant-design/icons-vue";
import { CurrencyForm } from "@/components/Forms";
import FarmerLimitsTable from "@/components/Tables/FarmerLimitsTable.vue";
import { useAdmin, useFarmers, useLoans } from "@/composables";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "AdminView",
  components: {
    PlusOutlined,
    UserOutlined,
    EditFilled,
    CurrencyForm,
    FarmerLimitsTable,
  },
  setup() {
    const { loans, farmerLoans, loanCount, loanStatusList } = useLoans();
    const { farmerLimits, farmerLimitsCount } = useAdmin();
    const loading = ref<boolean>(false);

    const activeKey = ref("1");
    const route = useRoute();

    const formVisible = ref<boolean>(false);

    const currencyForm = ref<InstanceType<typeof CurrencyForm>>();

    const {
      farmer,
      farmerAccountBalance,
      fetchFarmer,
      farmerDeposits,
      farmerDepositCount,
      farmerLoanPayments,
      farmerPaymentsCount,
    } = useFarmers();

    onMounted(async () => {
      try {
        // await fetchFarmer(route.params.farmerId);
      } catch (error) {
        console.error(error);
      }
    });

    const afterVisibleChange = (status: boolean) => {
      if (!status) {
        currencyForm.value?.reset();
      }
    };

    const closeDrawer = () => {
      formVisible.value = false;
    };

    const editFarmerLimits = () => {
      // formVisible.value = false;
    };

    const removeFarmerLimits = () => {
      // formVisible.value = false;
    };

    return {
      loans,
      farmerLoans,
      loanCount,
      loanStatusList,
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
      editFarmerLimits,
      removeFarmerLimits,
      afterVisibleChange,
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
