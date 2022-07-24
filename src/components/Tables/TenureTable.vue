<template>
  <DataGrid
    :label="label"
    :total="total"
    :data-source="dataSource"
    :columns="columns"
    :loading="loading"
    :rowExpandable="false"
    @edit="editTenure"
  />

  <a-drawer
    title="Tenure Form"
    placement="right"
    :closable="false"
    :mask-closable="false"
    size="large"
    v-model:visible="formVisible"
    @after-visible-change="afterVisibleChange"
  >
    <tenure-form
      ref="tenureForm"
      :is-editing="isEditing"
      @close-drawer="closeDrawer"
    />
  </a-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DataGrid from "@/components/DataGrid.vue";
import { TenureForm } from "@/components/Forms";
import { useAdmin } from "@/composables";

export default defineComponent({
  name: "TenureTable",

  components: {
    DataGrid,
    TenureForm,
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
        // customRender: "currency",
        // },
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
          // customRender: "percentage",
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
          // customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "Repayment Duration",
        dataIndex: "repayment_duration",
        key: "repayment_duration",
        filterKey: "repayment_duration_contains",
        slots: {
          //   filterIcon: "filterIcon",
          //   filterDropdown: "filterDropdown",
          // customRender: "currency",
        },
        // sorter: true,
      },
      {
        title: "Code",
        dataIndex: "code",
        key: "code",
        filterKey: "code_contains",
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
        slots: { customRender: "editAction" },
      },
    ]);

    const isEditing = ref<boolean>(false);

    const formVisible = ref<boolean>(false);

    const tenureForm = ref<InstanceType<typeof TenureForm>>();

    const { setTenure } = useAdmin();

    const createTenure = () => {
      formVisible.value = true;
      isEditing.value = false;
    };

    const editTenure = async (data) => {
      await setTenure(data);
      formVisible.value = true;
      isEditing.value = true;
    };

    const closeDrawer = () => {
      formVisible.value = false;
    };

    const afterVisibleChange = (status: boolean) => {
      if (!status) {
        tenureForm.value?.reset();
        emit("load-data");
      }
    };
    return {
      columns,
      isEditing,
      formVisible,
      tenureForm,
      createTenure,
      editTenure,
      closeDrawer,
      afterVisibleChange,
    };
  },
});
</script>
