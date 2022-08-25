<template>
  <NewDataGrid
    :label="label"
    :total="total"
    :data-source="dataSource"
    :columns="columns"
    :loading="loading"
    :rowExpandable="false"
    @edit="editCurrency"
    @handle-table-change="handleTableChange"
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
import { CurrencyForm } from "@/components/Forms";
import NewDataGrid from "@/components/NewDataGrid.vue";
import { useAdmin } from "@/composables";
import { computed } from "@vue/reactivity";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CurrenciesTable",

  components: {
    NewDataGrid,
    CurrencyForm,
  },

  emits: ["load-data"],

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

  setup(props, { emit }) {
    const filteredInfo = ref();
    const sortedInfo = ref();

    const columns = computed(() => {
      const filtered = filteredInfo.value || {};
      const sorted = sortedInfo.value || {};

      return [
        {
          title: "Symbol",
          dataIndex: "symbol",
          key: "symbol",
          filterKey: "symbol",
          filteredValue: filtered.symbol,
          onFilter: (value: string, record) =>
            `${record.symbol}`.toLowerCase().includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
        },
        {
          title: "Currency Name",
          dataIndex: "name",
          key: "name",
          filterKey: "name",
          filteredValue: filtered.name,
          onFilter: (value: string, record) =>
            `${record.name}`.toLowerCase().includes(value.toLowerCase()),
          // onFilter: (value: string, record) => console.log(record),
          // sorter: (a, b) => a.name.length - b.name.length,
          // sortOrder: sorted.columnKey === "name" && sorted.order,
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
          // customFilterDropdown: true,
        },
        {
          title: "Decimal places",
          dataIndex: "decimalPlaces",
          key: "decimalPlaces",
        },
        {
          title: "Format",
          dataIndex: "format",
          key: "format",
          filterKey: "format",
          filteredValue: filtered.format,
          onFilter: (value: string, record) =>
            `${record.format}`.toLowerCase().includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
        },
        {
          title: "Active",
          dataIndex: "active",
          key: "active",
          filterKey: "active",
          filteredValue: filtered.active,
          filters: [
            { text: "Yes", value: true },
            { text: "No", value: false },
          ],
          onFilter: (value, record) => record.active === value,
          slots: {
            customRender: "boolean",
          },
        },
        {
          title: "Action",
          key: "action",
          slots: { customRender: "editAction" },
        },
      ];
    });

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

    const handleTableChange = ({ filteredInfo, sortedInfo }) => {
      filteredInfo.value = filteredInfo;
      sortedInfo.value = sortedInfo;
    };

    const afterVisibleChange = (status: boolean) => {
      if (!status) {
        currencyForm.value?.reset();
        emit("load-data");
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
      handleTableChange,
    };
  },
});
</script>
