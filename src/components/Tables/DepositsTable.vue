<template>
  <DataGrid
    :label="label"
    :total="total"
    :data-source="dataSource"
    :columns="columns"
    :loading="loading"
    :rowExpandable="false"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

import DataGrid from "../DataGrid.vue";

export default defineComponent({
  name: "DepositsTable",

  components: {
    DataGrid,
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

    const columns = ref(
      route.name === "DepositsList"
        ? [
            {
              title: "Transaction Code",
              dataIndex: "transaction_code",
              key: "transaction_code",
              filterKey: "transaction_code_contains",
              // slots: {
              //   filterIcon: "filterIcon",
              //   filterDropdown: "filterDropdown",
              // },
              // sorter: true,
            },
            {
              title: "Farmer Name",
              dataIndex: ["farmer", "full_names"],
              key: ["farmer", "full_names"],
              filterKey: "farmer_names_contains",
              // slots: {
              //   filterIcon: "filterIcon",
              //   filterDropdown: "filterDropdown",
              // },
              // sorter: true,
            },
            {
              title: "Amount",
              dataIndex: "debit",
              key: "debit",
              filterKey: "debit_contains",
              slots: {
                //   filterIcon: "filterIcon",
                //   filterDropdown: "filterDropdown",
                customRender: "currency",
              },
              // sorter: true,
            },
            {
              title: "Account Type",
              dataIndex: "account_type",
              key: "account_type",
              filterKey: "account_type_contains",
              // slots: {
              //   filterIcon: "filterIcon",
              //   filterDropdown: "filterDropdown",
              // customRender: "currency",
              // },
              // sorter: true,
            },
            {
              title: "Time",
              dataIndex: "created_on",
              key: "created_on",
              filterKey: "created_on_contains",
              slots: {
                //   filterIcon: "filterIcon",
                //   filterDropdown: "filterDropdown",
                customRender: "dateTime",
              },
              // sorter: true,
            },
          ]
        : [
            {
              title: "Transaction Code",
              dataIndex: "transaction_code",
              key: "transaction_code",
              filterKey: "transaction_code_contains",
              // slots: {
              //   filterIcon: "filterIcon",
              //   filterDropdown: "filterDropdown",
              // },
              // sorter: true,
            },
            {
              title: "Amount",
              dataIndex: "debit",
              key: "debit",
              filterKey: "debit_contains",
              slots: {
                //   filterIcon: "filterIcon",
                //   filterDropdown: "filterDropdown",
                customRender: "currency",
              },
              // sorter: true,
            },
            {
              title: "Time",
              dataIndex: "created_on",
              key: "created_on",
              filterKey: "created_on_contains",
              slots: {
                //   filterIcon: "filterIcon",
                //   filterDropdown: "filterDropdown",
                customRender: "dateTime",
              },
              // sorter: true,
            },
          ]
    );

    return {
      columns,
    };
  },
});
</script>
