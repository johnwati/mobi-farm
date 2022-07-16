<template>
  <div class="full-width">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <a-typography-link href="/dashboard"> Dashboard </a-typography-link>
      </a-breadcrumb-item>

      <a-breadcrumb-item>Deposits</a-breadcrumb-item>
    </a-breadcrumb>

    <a-page-header title="Deposits" :ghost="false" class="list-page-header">
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
import DepositsTable from "@/components/Tables/DepositsTable.vue";
import { useDeposits } from "@/composables";
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "DepositsList",
  components: {
    DepositsTable,
  },
  setup() {
    const loading = ref<boolean>(false);

    const visible = ref<boolean>(false);

    const { deposits, depositsCount, fetchDeposits } = useDeposits();

    onMounted(async () => {
      try {
        await fetchDeposits();
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
