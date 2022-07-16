<template>
  <DataGrid
    :label="label"
    :total="total"
    :data-source="dataSource"
    :columns="columns"
    :loading="loading"
    :rowExpandable="false"
    @edit="editLimit"
    @remove="removeLimit"
  />

  <a-drawer
    title="Farmer Limits"
    placement="right"
    :closable="false"
    :mask-closable="false"
    size="large"
    v-model:visible="formVisible"
    @after-visible-change="afterVisibleChange"
  >
    <farmer-limits-form
      ref="farmerLimitsForm"
      :is-editing="isEditing"
      @close-drawer="closeDrawer"
      @submitted="onSubmit"
    />
  </a-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DataGrid from "@/components/DataGrid.vue";
import { FarmerLimitsForm } from "@/components/Forms";
import { useAdmin } from "@/composables";

export default defineComponent({
  name: "FarmerLimitsTable",

  components: {
    DataGrid,
    FarmerLimitsForm,
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
    const { setFarmerLimit, deleteFarmerLimits, fetchFarmerLimits } =
      useAdmin();

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
      {
        title: "Action",
        key: "action",
        slots: { customRender: "action" },
      },
    ]);

    const formVisible = ref<boolean>(false);

    const isEditing = ref<boolean>(false);

    const farmerLimitsForm = ref<InstanceType<typeof FarmerLimitsForm>>();

    const createLimit = () => {
      isEditing.value = false;
      formVisible.value = true;
    };

    const editLimit = async (limit) => {
      await setFarmerLimit(limit);
      isEditing.value = true;
      formVisible.value = true;
      console.log(limit, "editing");
    };

    const removeLimit = async (limit) => {
      await deleteFarmerLimits(limit.id);
    };

    const closeDrawer = () => {
      formVisible.value = false;
      isEditing.value = false;
      farmerLimitsForm.value?.reset();
    };

    const onSubmit = async () => {
      await fetchFarmerLimits();
    };

    const afterVisibleChange = async (status: boolean) => {
      if (!status) {
        farmerLimitsForm.value?.reset();
        isEditing.value = false;
        await setFarmerLimit({});
      }
    };
    return {
      columns,
      isEditing,
      formVisible,
      createLimit,
      onSubmit,
      closeDrawer,
      afterVisibleChange,
      editLimit,
      removeLimit,
    };
  },
});
</script>
