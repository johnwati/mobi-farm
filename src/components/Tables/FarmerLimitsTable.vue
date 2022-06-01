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
  name: "FarmerLimitsTable",

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
        title: "Farmer",
        dataIndex: "farmer_name",
        key: "farmer_name",
        filterKey: "farmer_name_contains",
        // slots: {
        //   filterIcon: "filterIcon",
        //   filterDropdown: "filterDropdown",
        // },
        // sorter: true,
      },
      {
        title: "Loan Product",
        dataIndex: "loan_product_name",
        key: "loan_product_name",
        filterKey: "loan_product_name_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "Loan Product Code",
        dataIndex: "loan_product_code",
        key: "loan_product_code",
        filterKey: "loan_product_code_contains",
        // slots: {
        //   filterIcon: "filterIcon",
        //   filterDropdown: "filterDropdown",
        // },
        // sorter: true,
      },
      {
        title: "Loan Category",
        dataIndex: "category",
        key: "category",
        filterKey: "category_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "Min Amount",
        dataIndex: "min_amount",
        key: "min_amount",
        filterKey: "min_amount_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "Max Amount",
        dataIndex: "max_amount",
        key: "max_amount",
        filterKey: "max_amount_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "Loan Min Amount",
        dataIndex: "loan_min_amount",
        key: "loan_min_amount",
        filterKey: "loan_min_amount_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "Loan Max Amount",
        dataIndex: "loan_max_amount",
        key: "loan_max_amount",
        filterKey: "loan_max_amount_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          customRender: "currency",
        },
        // sorter: true,
      },
      // // {
      // //   title: "Loan Status",
      // //   dataIndex: "status",
      // //   key: "status",
      // //   filterKey: "status_contains",
      // //   filters: loanStatusList,
      //   // slots: {
      //   //   filterIcon: "filterIcon",
      //   //   filterDropdown: "filterDropdown",
      //   // },
      //   // sorter: true,
      // },
      // {
      //   title: "Interest Rate (%)",
      //   dataIndex: "interest_rate",
      //   key: "interest_rate",
      //   filterKey: "interest_rate_contains",
      //   // slots: {
      //   //   filterIcon: "filterIcon",
      //   //   filterDropdown: "filterDropdown",
      //   // },
      //   // sorter: true,
      // },
      // {
      //   title: "Requested Amount",
      //   dataIndex: "requested_amount",
      //   key: "requested_amount",
      //   filterKey: "requested_amount_contains",
      //   // slots: {
      //   //   filterIcon: "filterIcon",
      //   //   filterDropdown: "filterDropdown",
      //   // },
      //   // sorter: true,
      // },
      // {
      //   title: "Loan Payment Status",
      //   dataIndex: "payment_status",
      //   key: "payment_status",
      //   //   filterKey: "payment_status_contains",
      //   //   slots: {
      //   //     filterIcon: "filterIcon",
      //   //     filterDropdown: "filterDropdown",
      //   //   },
      //   //   sorter: true,
      // },
      // {
      //   title: "Agrodealer Code",
      //   dataIndex: "agrodealer_code",
      //   key: "agrodealer_code",
      //   // filterKey: "agrodealer_code_contains",
      //   // slots: {
      //   //   filterIcon: "filterIcon",
      //   //   filterDropdown: "filterDropdown",
      //   // },
      //   // sorter: true,
      // },
      {
        title: "Action",
        key: "action",
        slots: { customRender: "action" },
      },
    ]);

    return {
      columns,
    };
  },
});
</script>
