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
        <a-button
          v-if="hasPermission('farmer-management')"
          key="1"
          type="primary"
          @click="visible = true"
        >
          <template #icon>
            <PlusOutlined />
          </template>

          Add Farmer
        </a-button>
        <report-export-button reportType="Farmers" />
      </template>
    </a-page-header>

    <NewDataGrid
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
import { computed, defineComponent, onMounted, ref } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import NewDataGrid from "@/components/NewDataGrid.vue";
import { FarmersForm } from "@/components/Forms";
import { useAppAuthentication, useFarmers } from "@/composables";
import type { IFarmerDGResponse } from "@/interfaces/farmers";
import ReportExportButton from "@/components/ExportButton.vue";
export default defineComponent({
  name: "FarmersList",
  components: {
    NewDataGrid,
    PlusOutlined,
    FarmersForm,
    ReportExportButton,
  },
  setup() {
    const { hasPermission } = useAppAuthentication();

    const loading = ref<boolean>(false);

    const visible = ref<boolean>(false);

    const isEditing = ref<boolean>(false);

    const farmersForm = ref<InstanceType<typeof FarmersForm>>();

    const filteredInfo = ref();
    const sortedInfo = ref();

    const columns = computed(() => {
      const filtered = filteredInfo.value || {};
      const sorted = sortedInfo.value || {};

      return [
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
          filterKey: "full_names",
          filteredValue: filtered.full_names,
          onFilter: (value, record) =>
            `${record.fname} ${record.lname}`
              .toLowerCase()
              .includes(value.toLowerCase()),
          // sorter: (a, b) => a.full_names - b.full_names,
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
            customRender: "name",
          },
          // sorter: true,
          // width: 200,
        },
        {
          title: "Farmer Code",
          dataIndex: "farmer_code",
          key: "farmer_code",
          filterKey: "farmer_code",
          filteredValue: filtered.farmer_code,
          onFilter: (value, record) =>
            `${record.farmer_code}`.toLowerCase().includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
          // sorter: true,
        },
        {
          title: "ID No.",
          dataIndex: "id_no",
          key: "id_no",
          filterKey: "id_no",
          filteredValue: filtered.id_no,
          onFilter: (value: string, record) =>
            `${record.id_no}`.toLowerCase().includes(value.toLowerCase()),
          // onFilter: (value: string, record) => console.log(record),
          // sorter: (a, b) => a.name.length - b.name.length,
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
          // sorter: true,
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
          // sorter: true,
        },
        {
          title: "Ward",
          dataIndex: "ward",
          key: "ward",
          filterKey: "ward",
          filteredValue: filtered.ward,
          onFilter: (value: string, record) =>
            `${record.ward}`.toLowerCase().includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
          // sorter: true,
        },
        {
          title: "Phone No.",
          dataIndex: "phone_number",
          key: "phone_number",
          filterKey: "phone_number",
          filteredValue: filtered.phone_number,
          onFilter: (value: string, record) =>
            `${record.phone_number}`
              .toLowerCase()
              .includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
          // sorter: true,
        },
        {
          title: "CRB Validation",
          dataIndex: "crb_validation",
          key: "crb_validation",
          // filterKey: "crb_validation",
          slots: {
            // filterIcon: "filterIcon",
            // filterDropdown: "filterDropdown",
            customRender: "boolean",
          },
          // sorter: true,
        },
        {
          title: "IPRS Validation",
          dataIndex: "iprs_validation",
          key: "iprs_validation",
          // filterKey: "iprs_validation",
          slots: {
            // filterIcon: "filterIcon",
            // filterDropdown: "filterDropdown",
            customRender: "boolean",
          },
          // sorter: true,
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          // filterKey: "status",
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
          filterKey: "activation_stage",
          filteredValue: filtered.activation_stage,
          onFilter: (value: string, record) =>
            `${record.activation_stage}`
              .toLowerCase()
              .includes(value.toLowerCase()),
          slots: {
            filterIcon: "filterIcon",
            filterDropdown: "filterDropdown",
          },
          // sorter: true,
        },
        {
          title: "Action",
          key: "action",
          slots: {
            customRender: hasPermission("farmer-management") ? "action" : null,
          },
        },
      ];
    });

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

    const handleTableChange = ({ filteredInfo, sortedInfo }) => {
      filteredInfo.value = filteredInfo;
      sortedInfo.value = sortedInfo;
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
      hasPermission,
      handleTableChange,
    };
  },
});
</script>
