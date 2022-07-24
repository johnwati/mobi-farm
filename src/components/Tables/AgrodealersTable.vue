<template>
  <DataGrid
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
import { defineComponent, ref } from "vue";
import DataGrid from "@/components/DataGrid.vue";
import { AgroDealersForm } from "@/components/Forms";
import { useAdmin } from "@/composables";

export default defineComponent({
  name: "AgroDealersTable",

  components: {
    DataGrid,
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
    const columns = ref([
      {
        title: "Name",
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
        title: "Code",
        dataIndex: "code",
        key: "code",
        filterKey: "code_contains",
        // slots: {
        //   filterIcon: "filterIcon",
        //   filterDropdown: "filterDropdown",
        // },
        // sorter: true,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        filterKey: "email_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "Phone Number",
        dataIndex: "phone",
        key: "phone",
        filterKey: "phone_contains",
        // slots: {
        //   filterIcon: "filterIcon",
        //   filterDropdown: "filterDropdown",
        // },
        // sorter: true,
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        filterKey: "type_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "Tax Number",
        dataIndex: "tax_number",
        key: "tax_number",
        filterKey: "tax_number_contains",
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
        title: "Country",
        dataIndex: "country",
        key: "country",
        filterKey: "country_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "County",
        dataIndex: "county",
        key: "county",
        filterKey: "county_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "Currency",
        dataIndex: "currency",
        key: "currency",
        filterKey: "currency_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        filterKey: "address_contains",
        // slots: {
        //   filterIcon: "filterIcon",
        //   filterDropdown: "filterDropdown",
        // },
        // sorter: true,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        filterKey: "status_contains",
        // slots: {
        //   filterIcon: "filterIcon",
        //   filterDropdown: "filterDropdown",
        // },
        // sorter: true,
      },
      {
        title: "Action",
        key: "action",
        slots: { customRender: "action" },
      },
    ]);

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
