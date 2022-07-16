<template>
  <div class="full-width">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <a-typography-link href="/dashboard"> Dashboard </a-typography-link>
      </a-breadcrumb-item>

      <a-breadcrumb-item>Administration</a-breadcrumb-item>
    </a-breadcrumb>

    <a-tabs v-model:activeKey="activeKey" class="tabs" type="card">
      <a-tab-pane key="1" tab="Loan Limits" class="tab_body">
        <a-page-header
          title="Farmer Limits"
          :ghost="false"
          class="list-page-header"
        >
          <template #extra>
            <a-button type="primary" @click="openForm('limit', false)">
              <template #icon>
                <PlusOutlined />
              </template>

              Add Limit
            </a-button>
            <a-button type="primary" @click="openForm('upload', false)">
              <template #icon>
                <PlusOutlined />
              </template>

              Batch Upload Limits
            </a-button>
          </template>
        </a-page-header>

        <farmer-limits-table
          ref="limitsTable"
          label="loan limits"
          :total="farmerLimitsCount"
          :data-source="farmerLimits"
          :loading="loading"
        />
      </a-tab-pane>
      <a-tab-pane key="2" tab="Loan Products">
        <a-page-header
          title="Loan Products"
          :ghost="false"
          class="list-page-header"
        >
          <template #extra>
            <a-button
              key="1"
              type="primary"
              @click="openForm('products', false)"
            >
              <template #icon>
                <PlusOutlined />
              </template>

              Add Products
            </a-button>
          </template>
        </a-page-header>

        <loan-products-table
          ref="productsTable"
          label="Loan Products"
          :total="loanProductsCount"
          :data-source="loanProducts"
          :loading="loading"
        />
      </a-tab-pane>
      <a-tab-pane key="3" tab="AgroDealers">
        <a-page-header
          title="Agro-Dealers"
          :ghost="false"
          class="list-page-header"
        >
          <template #extra>
            <a-button
              key="1"
              type="primary"
              @click="openForm('agrodealers', false)"
            >
              <template #icon>
                <PlusOutlined />
              </template>

              Add Agro-Dealers
            </a-button>
          </template>
        </a-page-header>
        <agro-dealers-table
          ref="agrodealersTable"
          label="deposits"
          :total="agroDealersCount"
          :data-source="agroDealers"
          :loading="loading"
        />
      </a-tab-pane>
      <a-tab-pane key="4" tab="Items">
        <a-page-header title="Items" :ghost="false" class="list-page-header">
          <template #extra>
            <a-button key="1" type="primary" @click="openForm('items', false)">
              <template #icon>
                <PlusOutlined />
              </template>

              Add Items
            </a-button>
          </template>
        </a-page-header>
        <items-table
          ref="itemsTable"
          label="items"
          :total="itemsCount"
          :data-source="items"
          :loading="loading"
        />
      </a-tab-pane>
      <a-tab-pane key="5" tab="Currency Setup">
        <a-page-header
          title="Currency Setup"
          :ghost="false"
          class="list-page-header"
        >
          <template #extra>
            <a-button
              key="1"
              type="primary"
              @click="openForm('currency', false)"
            >
              <template #icon>
                <PlusOutlined />
              </template>

              Add Currency
            </a-button>
          </template>
        </a-page-header>
        <currencies-table
          ref="currencyTable"
          label="currencies"
          :total="currenciesCount"
          :data-source="currencies"
          :loading="loading"
        />
      </a-tab-pane>
    </a-tabs>

    <a-drawer
      title="Batch Import"
      placement="right"
      :closable="false"
      :mask-closable="false"
      size="large"
      v-model:visible="formVisible"
      @after-visible-change="afterVisibleChange"
    >
      <import-farmer-limits
        ref="limitsForm"
        :is-editing="true"
        @close-drawer="closeDrawer"
      />
    </a-drawer>
  </div>
</template>

<script lang="ts">
import { ImportFarmerLimits } from "@/components/Forms";
import {
  AgroDealersTable,
  CurrenciesTable,
  FarmerLimitsTable,
  ItemsTable,
  LoanProductsTable,
} from "@/components/Tables";
import { useAdmin, useFarmers, useLoans } from "@/composables";
import { PlusOutlined } from "@ant-design/icons-vue";
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "AdminView",
  components: {
    PlusOutlined,
    FarmerLimitsTable,
    LoanProductsTable,
    AgroDealersTable,
    ItemsTable,
    CurrenciesTable,
    ImportFarmerLimits,
  },
  setup() {
    const { loans, loanCount, loanStatusList } = useLoans();
    const {
      farmerLimits,
      farmerLimitsCount,
      loanProducts,
      loanProductsCount,
      agroDealers,
      agroDealersCount,
      items,
      itemsCount,
      currencies,
      currenciesCount,
      fetchFarmerLimits,
      fetchLoanProducts,
      fetchAgroDealers,
      fetchItems,
      fetchCurrencies,
    } = useAdmin();
    const loading = ref<boolean>(false);

    const activeKey = ref("1");

    const formVisible = ref<boolean>(false);

    const currencyTable = ref<InstanceType<typeof CurrenciesTable>>();
    const limitsTable = ref<InstanceType<typeof FarmerLimitsTable>>();
    const agrodealersTable = ref<InstanceType<typeof AgroDealersTable>>();
    const productsTable = ref<InstanceType<typeof LoanProductsTable>>();
    const itemsTable = ref<InstanceType<typeof ItemsTable>>();
    const limitsForm = ref<InstanceType<typeof ImportFarmerLimits>>();

    const openForm = (form, editing) => {
      console.log(editing);
      if (form == "limit") {
        limitsTable.value.createLimit();
      } else if (form == "upload") {
        importFarmerLimits();
      } else if (form == "agrodealers") {
        agrodealersTable.value.createDealer();
      } else if (form == "products") {
        productsTable.value.createProduct();
      } else if (form == "items") {
        itemsTable.value.createItem();
      } else if (form == "currency") {
        currencyTable.value.createCurrency();
      }
    };

    const {
      farmer,
      farmerAccountBalance,
      farmerDeposits,
      farmerDepositCount,
      farmerLoanPayments,
      farmerPaymentsCount,
    } = useFarmers();

    onMounted(async () => {
      try {
        await fetchFarmerLimits();
        await fetchLoanProducts();
        await fetchAgroDealers();
        await fetchItems();
        await fetchCurrencies();
      } catch (error) {
        console.error(error);
      }
    });

    const afterVisibleChange = (status: boolean) => {
      if (!status) {
        // limitsForm.value?.reset();
      }
    };

    const closeDrawer = () => {
      formVisible.value = false;
    };

    const importFarmerLimits = () => {
      formVisible.value = true;
    };

    return {
      loans,
      loanCount,
      loanStatusList,
      loading,
      formVisible,
      activeKey,
      currencyTable,
      limitsTable,
      agrodealersTable,
      productsTable,
      itemsTable,
      limitsForm,
      farmer,
      farmerDeposits,
      farmerDepositCount,
      farmerLoanPayments,
      farmerPaymentsCount,
      farmerAccountBalance,
      farmerLimits,
      farmerLimitsCount,
      loanProducts,
      loanProductsCount,
      agroDealers,
      agroDealersCount,
      items,
      itemsCount,
      currencies,
      currenciesCount,
      openForm,
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
