<template>
  <DataGrid
    :label="label"
    :total="total"
    :data-source="dataSource"
    :columns="columns"
    :loading="loading"
    :rowExpandable="false"
    @edit="editItem"
  />

  <a-drawer
    title="Items Form"
    placement="right"
    :closable="false"
    :mask-closable="false"
    size="large"
    v-model:visible="formVisible"
    @after-visible-change="afterVisibleChange"
  >
    <items-form
      ref="itemForm"
      :is-editing="isEditing"
      @close-drawer="closeDrawer"
    />
  </a-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// import { useFarmers } from "@/composables";
import DataGrid from "@/components/DataGrid.vue";
import { ItemsForm } from "@/components/Forms";
import { useAdmin } from "@/composables";

export default defineComponent({
  name: "ItemsTable",

  components: {
    DataGrid,
    ItemsForm,
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
        title: "Name",
        dataIndex: "item_name",
        key: "item_name",
        filterKey: "item_name_contains",
        // slots: {
        //   filterIcon: "filterIcon",
        //   filterDropdown: "filterDropdown",
        // },
        // sorter: true,
      },
      {
        title: "Code",
        dataIndex: "item_code",
        key: "item_code",
        filterKey: "item_code_contains",
        // slots: {
        //   filterIcon: "filterIcon",
        //   filterDropdown: "filterDropdown",
        // },
        // sorter: true,
      },
      {
        title: "Type",
        dataIndex: "item_type",
        key: "item_type",
        filterKey: "item_type_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "Item Unit",
        dataIndex: "item_unit",
        key: "item_unit",
        filterKey: "item_unit_contains",
        // slots: {
        //   filterIcon: "filterIcon",
        //   filterDropdown: "filterDropdown",
        // },
        // sorter: true,
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        filterKey: "description_contains",
        // slots: {
        //   filterIcon: "filterIcon",
        //   filterDropdown: "filterDropdown",
        // },
        // sorter: true,
      },
      {
        title: "Rate",
        dataIndex: "rate",
        key: "rate",
        filterKey: "rate_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "Cost Rate",
        dataIndex: "cost_rate",
        key: "cost_rate",
        filterKey: "cost_rate_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "Category",
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
        title: "Stock Category",
        dataIndex: "stock_category",
        key: "stock_category",
        filterKey: "stock_category_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "Stock rate/ Unit",
        dataIndex: "stock_rate_per_unit",
        key: "stock_rate_per_unit",
        filterKey: "stock_rate_per_unit_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "Unit",
        dataIndex: "unit",
        key: "unit",
        filterKey: "unit_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "UOM",
        dataIndex: "uom",
        key: "uom",
        filterKey: "uom_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // customRender: "currency",
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

    const { setItem } = useAdmin();
    const isEditing = ref<boolean>(false);

    const formVisible = ref<boolean>(false);

    const itemForm = ref<InstanceType<typeof ItemsForm>>();

    const createItem = () => {
      formVisible.value = true;
      isEditing.value = false;
    };

    const editItem = async (data) => {
      await setItem(data);
      formVisible.value = true;
      isEditing.value = true;
    };

    const closeDrawer = () => {
      formVisible.value = false;
    };

    const afterVisibleChange = (status: boolean) => {
      if (!status) {
        itemForm.value?.reset();
      }
    };
    return {
      columns,
      isEditing,
      formVisible,
      itemForm,
      createItem,
      editItem,
      closeDrawer,
      afterVisibleChange,
    };
  },
});
</script>
