<template>
  <div class="full-width">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <a-typography-link href="/dashboard"> Dashboard </a-typography-link>
      </a-breadcrumb-item>

      <a-breadcrumb-item>Farmers</a-breadcrumb-item>
    </a-breadcrumb>

    <a-page-header title="Farmers" :ghost="false" class="list-page-header">
      <template #extra>
        <a-button key="1" type="primary" @click="visible = true">
          <template #icon>
            <PlusOutlined />
          </template>

          Add Farmer
        </a-button>
      </template>
    </a-page-header>

    <DataGrid
      label="farmers"
      :total="farmerCount"
      :data-source="farmers"
      :columns="columns"
      :loading="loading"
      @edit="editFarmer"
      @remove="removeFarmer"
      @handle-search="handleSearch"
      :rowExpandable="false"
    />

    <a-drawer
      title="Farmer's Form"
      placement="right"
      :closable="false"
      :mask-closable="false"
      size="large"
      v-model:visible="visible"
      @after-visible-change="afterVisibleChange"
    >
      <farmers-form
        ref="farmersForm"
        :is-editing="isEditing"
        @close-drawer="closeDrawer"
        @submitted="onSubmit"
      />
    </a-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import DataGrid from "@/components/DataGrid.vue";
import { FarmersForm } from "@/components/Forms";
import { useFarmers } from "@/composables";
import type { IFarmerDGResponse } from "@/interfaces/farmers";
export default defineComponent({
  name: "FarmersList",
  components: {
    DataGrid,
    PlusOutlined,
    FarmersForm,
  },
  setup() {
    const loading = ref<boolean>(false);

    const visible = ref<boolean>(false);

    const isEditing = ref<boolean>(false);

    const farmersForm = ref<InstanceType<typeof FarmersForm>>();

    const columns = ref([
      {
        // title: "Photo",
        dataIndex: "photo",
        key: "photo",
        slots: {
          customRender: "photo",
        },
      },
      {
        title: "Name",
        dataIndex: "full_names",
        key: "full_names",
        // filterKey: "name_contains",
        slots: {
          // filterIcon: "filterIcon",
          // filterDropdown: "filterDropdown",
          customRender: "name",
        },
        // sorter: true,
        // width: 200,
      },
      {
        title: "Farmer Code",
        dataIndex: "farmer_code",
        key: "farmer_code",
        // filterKey: "farmer_code_contains",
        // slots: {
        // filterIcon: "filterIcon",
        // filterDropdown: "filterDropdown",
        // },
        // sorter: true,
      },
      {
        title: "ID No.",
        dataIndex: "id_no",
        key: "id_no",
        // filterKey: "id_no_contains",
        // slots: {
        // filterIcon: "filterIcon",
        // filterDropdown: "filterDropdown",
        // },
        // sorter: true,
      },
      {
        title: "County",
        dataIndex: "county",
        key: "county",
        // filterKey: "county_contains",
        // slots: {
        // filterIcon: "filterIcon",
        // filterDropdown: "filterDropdown",
        // },
        // sorter: true,
      },
      {
        title: "Ward",
        dataIndex: "ward",
        key: "ward",
        // filterKey: "ward_contains",
        // slots: {
        // filterIcon: "filterIcon",
        // filterDropdown: "filterDropdown",
        // },
        // sorter: true,
      },
      {
        title: "Phone No.",
        dataIndex: "phone_number",
        key: "phone_number",
        // filterKey: "phone_number_contains",
        // slots: {
        // filterIcon: "filterIcon",
        // filterDropdown: "filterDropdown",
        // },
        // sorter: true,
      },
      {
        title: "CRB Validation",
        dataIndex: "crb_validation",
        key: "crb_validation",
        // filterKey: "crb_validation_contains",
        // slots: {
        // filterIcon: "filterIcon",
        // filterDropdown: "filterDropdown",
        // },
        // sorter: true,
      },
      {
        title: "IPRS Validation",
        dataIndex: "iprs_validation",
        key: "iprs_validation",
        // filterKey: "iprs_validation_contains",
        // slots: {
        // filterIcon: "filterIcon",
        // filterDropdown: "filterDropdown",
        // },
        // sorter: true,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        // filterKey: "status_contains",
        // slots: {
        // filterIcon: "filterIcon",
        // filterDropdown: "filterDropdown",
        // },
        // sorter: true,
      },
      {
        title: "Activation Stage",
        dataIndex: "activation_stage",
        key: "activation_stage",
        // filterKey: "activation_stage_contains",
        // slots: {
        // filterIcon: "filterIcon",
        // filterDropdown: "filterDropdown",
        // },
        // sorter: true,
      },
      {
        title: "Action",
        key: "action",
        slots: { customRender: "action" },
      },
    ]);

    const { farmers, farmerCount, fetchFarmers, setFarmer, deleteFarmer } =
      useFarmers();

    onMounted(async () => {
      loading.value = true;
      try {
        await fetchFarmers();
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    });

    const closeDrawer = async () => {
      visible.value = false;
      isEditing.value = false;
    };

    const onSubmit = async () => {
      loading.value = true;
      try {
        await fetchFarmers();
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    };

    const afterVisibleChange = (status: boolean) => {
      if (!status) {
        isEditing.value = false;
        farmersForm.value?.reset();
      }
    };

    const editFarmer = (farmer: IFarmerDGResponse) => {
      setFarmer(farmer);
      console.log(farmer.id, "editing");
      isEditing.value = true;
      visible.value = true;
    };

    const removeFarmer = async (farmer) => {
      try {
        loading.value = true;
        await deleteFarmer(farmer.id);
        console.log("deleting farmer");
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    };

    const handleSearch = async (selectedKeys: Record<string, string>) => {
      loading.value = true;
      try {
        if (selectedKeys) {
          // await fetchAssignmentsCount({
          //   'school.id': schoolId.value,
          //   ...selectedKeys,
          // });
          // const queryParams = {};
          // await fetchFarmers(queryParams);
        }
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    };

    return {
      farmers,
      columns,
      loading,
      visible,
      farmersForm,
      isEditing,
      farmerCount,
      onSubmit,
      closeDrawer,
      afterVisibleChange,
      editFarmer,
      handleSearch,
      removeFarmer,
    };
  },
});
</script>
