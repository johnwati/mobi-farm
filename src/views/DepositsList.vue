<template>
  <div class="full-width">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <a-typography-link href="/dashboard"> Dashboard </a-typography-link>
      </a-breadcrumb-item>

      <a-breadcrumb-item>Deposits</a-breadcrumb-item>
    </a-breadcrumb>

    <a-page-header title="Deposits" :ghost="false" class="list-page-header">
      <!-- <template #extra>
        <a-button key="1" type="primary" @click="visible = true">
          <template #icon>
            <PlusOutlined />
          </template>

          Add Loan
        </a-button>
      </template> -->
    </a-page-header>

    <deposits-table
      label="deposits"
      :total="depositsCount"
      :data-source="deposits"
      :loading="loading"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import DepositsTable from "@/components/Tables/DepositsTable.vue";
import { useDeposits, useFarmers, useLoans } from "@/composables";
export default defineComponent({
  name: "DepositsList",
  components: {
    PlusOutlined,
    DepositsTable,
  },
  setup() {
    // const { loans, loanCount, loanStatusList } = useLoans();
    const loading = ref<boolean>(false);

    const visible = ref<boolean>(false);

    // const loansFilters = [...loanStatusList].map((i) => ({
    //   text: i.name,
    //   name: i.name,
    // }));

    const { farmerDeposits, farmerDepositCount } = useFarmers();
    const { deposits, depositsCount } = useDeposits();

    onMounted(async () => {
      try {
        // await fetchFarmers();
      } catch (error) {
        console.error(error);
      }
    });

    return {
      deposits,
      depositsCount,
      loading,
      visible,
    };
  },
});
</script>
