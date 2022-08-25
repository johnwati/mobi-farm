<template>
  <NewDataGrid
    :label="label"
    :total="total"
    :data-source="dataSource"
    :columns="columns"
    :loading="loading"
    :rowExpandable="false"
    @edit="editDealer"
  />

  <a-drawer
    title="AgroDealers"
    placement="right"
    :closable="false"
    :mask-closable="false"
    size="large"
    :destroyOnClose="true"
    v-model:visible="formVisible"
    @after-visible-change="afterVisibleChange"
  >
    <agro-dealers-form
      ref="agrodealersForm"
      :is-editing="isEditing"
      @close-drawer="closeDrawer"
    />
  </a-drawer>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import NewDataGrid from "@/components/NewDataGrid.vue";
import { AgroDealersForm } from "@/components/Forms";
import { useAdmin } from "@/composables";

export default defineComponent({
  name: "AgroDealersTable",

  components: {
    NewDataGrid,
    AgroDealersForm,
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
          title: "Name",
          dataIndex: "name",
          key: "name",
          filterKey: "name",
          filteredValue: filtered.name,
          onFilter: (value: string, record) =>
            `${record.name}`.toLowerCase().includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
          // sorter: true,
        },
        {
          title: "Code",
          dataIndex: "code",
          key: "code",
          filterKey: "code",
          filteredValue: filtered.code,
          onFilter: (value: string, record) =>
            `${record.code}`.toLowerCase().includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
          // sorter: true,
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          filterKey: "email",
          filteredValue: filtered.email,
          onFilter: (value: string, record) =>
            `${record.email}`.toLowerCase().includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
            // customRender: "currency",
          },
          // sorter: true,
        },
        {
          title: "Phone Number",
          dataIndex: "phone",
          key: "phone",
          filterKey: "phone",
          filteredValue: filtered.phone,
          onFilter: (value: string, record) =>
            `${record.phone}`.toLowerCase().includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
          // sorter: true,
        },
        {
          title: "Type",
          dataIndex: "type",
          key: "type",
          filterKey: "type",
          filteredValue: filtered.type,
          onFilter: (value: string, record) =>
            `${record.type}`.toLowerCase().includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
            // customRender: "currency",
          },
          // sorter: true,
        },
        {
          title: "Tax Number",
          dataIndex: "tax_number",
          key: "tax_number",
          filterKey: "tax_number",
          filteredValue: filtered.tax_number,
          onFilter: (value: string, record) =>
            `${record.tax_number}`.toLowerCase().includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
            // customRender: "currency",
          },
          // sorter: true,
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
          title: "Country",
          dataIndex: "country",
          key: "country",
          filterKey: "country",
          filteredValue: filtered.country,
          onFilter: (value: string, record) =>
            `${record.country}`.toLowerCase().includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
        },
        {
          title: "County",
          dataIndex: "county",
          key: "county",
          filterKey: "county",
          filteredValue: filtered.county,
          onFilter: (value: string, record) =>
            `${record.county}`.toLowerCase().includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
        },
        {
          title: "Currency",
          dataIndex: "currency",
          key: "currency",
          filterKey: "currency",
          filteredValue: filtered.currency,
          onFilter: (value: string, record) =>
            `${record.currency}`.toLowerCase().includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
        },
        {
          title: "Address",
          dataIndex: "address",
          key: "address",
          filterKey: "address",
          filteredValue: filtered.address,
          onFilter: (value: string, record) =>
            `${record.address}`.toLowerCase().includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          filterKey: "status",
          filteredValue: filtered.status,
          filters: [
            { text: "ACTIVE", value: "ACTIVE" },
            { text: "INACTIVE", value: "INACTIVE" },
          ],
          onFilter: (value: string, record) =>
            `${record.status}`.toLowerCase().includes(value.toLowerCase()),
        },
        {
          title: "Action",
          key: "action",
          slots: { customRender: "action" },
        },
      ];
    });

    const isEditing = ref<boolean>(false);

    const { fetchAgroDealer } = useAdmin();

    const formVisible = ref<boolean>(false);

    const agrodealersForm = ref<InstanceType<typeof AgroDealersForm>>();

    const createDealer = () => {
      isEditing.value = false;
      formVisible.value = true;
    };

    const editDealer = async (data) => {
      await fetchAgroDealer(data.id);
      formVisible.value = true;
      //TODO -- set dealer to state
      isEditing.value = true;
    };

    const closeDrawer = () => {
      formVisible.value = false;
      isEditing.value = false;
    };

    const afterVisibleChange = (status: boolean) => {
      if (!status) {
        agrodealersForm.value?.reset();
        emit("load-data");
      }
    };

    return {
      columns,
      formVisible,
      agrodealersForm,
      isEditing,
      editDealer,
      createDealer,
      closeDrawer,
      afterVisibleChange,
    };
  },
});
</script>
