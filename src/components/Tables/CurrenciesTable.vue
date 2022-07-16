<template>
  <DataGrid
    :label="label"
    :total="total"
    :data-source="dataSource"
    :columns="columns"
    :loading="loading"
    :rowExpandable="false"
    @edit="editCurrency"
  />

  <a-drawer
    title="Currency Form"
    placement="right"
    :closable="false"
    :mask-closable="false"
    size="large"
    v-model:visible="formVisible"
    @after-visible-change="afterVisibleChange"
  >
    <currency-form
      ref="currencyForm"
      :is-editing="isEditing"
      @close-drawer="closeDrawer"
    />
  </a-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DataGrid from "@/components/DataGrid.vue";
import { CurrencyForm } from "@/components/Forms";
import { useAdmin } from "@/composables";

export default defineComponent({
  name: "CurrenciesTable",

  components: {
    DataGrid,
    CurrencyForm,
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
        title: "Symbol",
        dataIndex: "symbol",
        key: "symbol",
        filterKey: "symbol_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "Currency Name",
        dataIndex: "name",
        key: "name",
        filterKey: "name_contains",
        // slots: {
        //   filterIcon: "filterIcon",
        //   filterDropdown: "filterDropdown",
        // },
        // sorter: true,
      },
      {
        title: "Decimal places",
        dataIndex: "decimalPlaces",
        key: "decimalPlaces",
        filterKey: "decimalPlaces_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "Format",
        dataIndex: "format",
        key: "format",
        filterKey: "format_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "Active",
        dataIndex: "active",
        key: "active",
        filterKey: "active_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          customRender: "boolean",
        },
        // sorter: true,
      },
      {
        title: "Action",
        key: "action",
        slots: { customRender: "action" },
      },
    ]);

    const isEditing = ref<boolean>(false);

    const formVisible = ref<boolean>(false);

    const currencyForm = ref<InstanceType<typeof CurrencyForm>>();

    const { setCurrency } = useAdmin();

    const createCurrency = () => {
      formVisible.value = true;
      isEditing.value = false;
    };

    const editCurrency = async (data) => {
      await setCurrency(data);
      formVisible.value = true;
      isEditing.value = true;
    };

    const closeDrawer = () => {
      formVisible.value = false;
    };

    const afterVisibleChange = (status: boolean) => {
      if (!status) {
        currencyForm.value?.reset();
      }
    };
    return {
      columns,
      isEditing,
      formVisible,
      currencyForm,
      createCurrency,
      editCurrency,
      closeDrawer,
      afterVisibleChange,
    };
  },
});
</script>
