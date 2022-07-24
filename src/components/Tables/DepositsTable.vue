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
              dataIndex: "transaction_id",
              key: "transaction_id",
              filterKey: "transaction_id_contains",
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
              title: "Debit",
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
              title: "Credit",
              dataIndex: "credit",
              key: "credit",
              filterKey: "credit_contains",
              slots: {
                //   filterIcon: "filterIcon",
                //   filterDropdown: "filterDropdown",
                customRender: "currency",
              },
              // sorter: true,
            },
            {
              title: "Note",
              dataIndex: "note",
              key: "note",
              filterKey: "note_contains",
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
              dataIndex: "transaction_id",
              key: "transaction_id",
              filterKey: "transaction_id_contains",
              // slots: {
              //   filterIcon: "filterIcon",
              //   filterDropdown: "filterDropdown",
              // },
              // sorter: true,
            },
            {
              title: "Debit",
              dataIndex: "debit",
              key: "debit",
              filterKey: "debit_contains",
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
              filterKey: "credit_contains",
              slots: {
                //   filterIcon: "filterIcon",
                //   filterDropdown: "filterDropdown",
                customRender: "currency",
              },
              sorter: true,
            },
            {
              title: "Note",
              dataIndex: "note",
              key: "note",
              filterKey: "note_contains",
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
