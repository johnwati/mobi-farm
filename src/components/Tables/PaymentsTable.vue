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

<script>
import { defineComponent, ref } from "vue";
// import { useFarmers } from "@/composables";
import DataGrid from "@/components/DataGrid.vue";

export default defineComponent({
  name: "PaymentsTable",

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
    const columns = ref([
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
    ]);

    return {
      columns,
    };
  },
});
</script>
