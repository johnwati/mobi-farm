<template>
  <NewDataGrid
    :label="label"
    :total="total"
    :data-source="dataSource"
    :columns="columns"
    :loading="loading"
    :rowExpandable="false"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

import NewDataGrid from "../NewDataGrid.vue";

export default defineComponent({
  name: "DepositsTable",

  components: {
    NewDataGrid,
  },

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

  setup() {
    const route = useRoute();

    const filteredInfo = ref();
    const sortedInfo = ref();

    const columns = computed(() => {
      const filtered = filteredInfo.value || {};
      const sorted = sortedInfo.value || {};

      const farmerColumns = [
        {
          title: "Transaction Code",
          dataIndex: "transaction_id",
          key: "transaction_id",
          filterKey: "transaction_id",
          filteredValue: filtered.transaction_id,
          onFilter: (value: string, record) =>
            record.transaction_id.toLowerCase().includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
          // sorter: true,
        },
        {
          title: "Debit",
          dataIndex: "debit",
          key: "debit",
          filterKey: "debit",
          slots: {
            //   filterIcon: "filterIcon",
            //   filterDropdown: "filterDropdown",
            customRender: "currency",
          },
          sorter: true,
        },
        {
          title: "Credit",
          dataIndex: "credit",
          key: "credit",
          filterKey: "credit",
          sorter: (a, b) => a.credit.length - b.credit.length,
          sortOrder: sorted.columnKey === "credit" && sorted.order,
          slots: {
            //   filterIcon: "filterIcon",
            //   filterDropdown: "filterDropdown",
            customRender: "currency",
          },
        },
        {
          title: "Note",
          dataIndex: "note",
          key: "note",
          filterKey: "note",
        },
        {
          title: "Time",
          dataIndex: "created_on",
          key: "created_on",
          filterKey: "created_on",
          slots: {
            //   filterIcon: "filterIcon",
            //   filterDropdown: "filterDropdown",
            customRender: "dateTime",
          },
          // sorter: true,
        },
      ];

      if (route.name === "DepositsList") {
        farmerColumns.splice(1, 0, {
          title: "Farmer Name",
          dataIndex: "farmer_names",
          key: "farmer_names",
          filterKey: "farmer_names",
          // slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // },
          // sorter: true,
        });
        return farmerColumns;
      } else {
        return farmerColumns;
      }
    });

    return {
      columns,
    };
  },
});
</script>
