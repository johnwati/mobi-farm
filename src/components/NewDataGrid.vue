<template>
  <a-table
    :columns="columns"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="loading"
    :row-key="rowKey"
    :rowExpandable="() => rowExpandable"
    :showExpandColumn="rowExpandable"
    table-layout="auto"
    children-column-name="child"
    :scroll="{ x: true }"
    size="small"
    @change="handleTableChange"
    :custom-row="
      (record) => ({
        onDblclick: () => {
          $emit('render-row-data', record);
        },
      })
    "
  >
    <template #filterIcon="{ column: { filterKey } }">
      <SearchOutlined
        :style="{ color: selectedKeys[filterKey] ? '#f86700' : undefined }"
      />
    </template>

    <template #expandedRowRender="{ record, index }">
      <div :key="index">
        <a-row
          type="flex"
          :gutter="[12, 12]"
          justify="flex-start"
          align="stretch"
          style="
            width: 100%;
            height: 100%;
            padding: 25px;
            background-color: #fafafa;
          "
        >
          <a-col :span="24">
            <a-page-header
              title="Loan Details"
              :ghost="true"
              style="padding: 24px 24px 24px 0"
            >
              <template #extra>
                <a-button
                  v-if="hasPermission('loan-management')"
                  @click="editLoanStatus(record)"
                  type="primary"
                  class="success_button"
                >
                  Change Status
                </a-button>
              </template>
            </a-page-header>
            <a-descriptions
              :column="3"
              :contentStyle="{
                alignText: 'right',
                fontWeight: 'normal',
                color: '#36454F',
              }"
              :labelStyle="{
                fontWeight: 'bold',
              }"
            >
              <a-descriptions-item label="Loan Code">
                {{ record.code }}
              </a-descriptions-item>
              <a-descriptions-item label="Agrodealer Code">
                {{ record.agrodealer_code }}
              </a-descriptions-item>
              <a-descriptions-item label="Product Name">
                {{ record.product_name }}
              </a-descriptions-item>
              <a-descriptions-item label="Product Code">
                {{ record.loan_product_code }}
              </a-descriptions-item>
              <a-descriptions-item label="Status">
                {{ record.status }}
              </a-descriptions-item>
              <template v-if="record.status !== 'PENDING'">
                <a-descriptions-item label="Payment Status">
                  {{ record.payment_status }}
                </a-descriptions-item>
                <a-descriptions-item label="Amount Paid">
                  {{ record.paid }}
                </a-descriptions-item>
                <a-descriptions-item label="Balance">
                  {{ record.balance }}
                </a-descriptions-item>
                <a-descriptions-item label="Expected Completion Date">
                  {{ record.expected_completion_date }}
                </a-descriptions-item>
              </template>
            </a-descriptions>
            <a-descriptions
              :column="1"
              :contentStyle="{
                alignText: 'right',
                fontWeight: 'normal',
                color: '#36454F',
              }"
              :labelStyle="{
                fontWeight: 'bold',
              }"
            >
              <a-descriptions-item label="Reason">
                {{ record.reason }}
              </a-descriptions-item>
            </a-descriptions>
            <a-divider />
            <a-row
              type="flex"
              :gutter="[24, 6]"
              justify="flex-start"
              align="stretch"
              style="width: 100%; height: 100%; background-color: white"
            >
              <a-col :span="8">
                <a-card style="background-color: whitesmoke">
                  <a-descriptions
                    :column="1"
                    :contentStyle="{
                      alignText: 'right',
                      fontWeight: 'normal',
                      color: '#36454F',
                    }"
                    :labelStyle="{
                      fontWeight: 'bold',
                    }"
                  >
                    <a-descriptions-item label="Requested Amount">
                      KShs. {{ record.requested_amount }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Interest Rate">
                      {{ record.interest_rate }}%
                    </a-descriptions-item>
                    <a-descriptions-item label="Interest">
                      KShs. {{ record.interest }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Fees">
                      KShs. {{ record.fees }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Principal Amount">
                      KShs. {{ record.principal_amount }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Total Amount">
                      KShs. {{ record.total_amount }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Installments">
                      KShs. {{ record.installments }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Installment Amount">
                      KShs. {{ record.installment_amount }}
                    </a-descriptions-item>
                  </a-descriptions>
                </a-card>
              </a-col>
              <a-col :span="16">
                <a-row style="padding: 24px">
                  <a-col :span="12">
                    <a-descriptions
                      :column="1"
                      :contentStyle="{
                        alignText: 'right',
                        fontWeight: 'normal',
                        color: '#36454F',
                      }"
                      :labelStyle="{
                        fontWeight: 'bold',
                      }"
                    >
                      <a-descriptions-item label="Applicant Name">
                        {{ record.applicant_name }}
                      </a-descriptions-item>
                      <a-descriptions-item label="Applicant Phone">
                        {{ record.applicant_phone }}
                      </a-descriptions-item>
                      <a-descriptions-item label="Applicant Email">
                        {{ record.applicant_email }}
                      </a-descriptions-item>
                      <a-descriptions-item label="Applicant Address">
                        {{ record.applicant_address }}
                      </a-descriptions-item>
                      <a-descriptions-item label="Applicant Code">
                        {{ record.applicant_code }}
                      </a-descriptions-item>
                    </a-descriptions>
                  </a-col>
                  <a-col :span="12">
                    <a-descriptions
                      :column="1"
                      :contentStyle="{
                        alignText: 'right',
                        fontWeight: 'normal',
                        color: '#36454F',
                      }"
                      :labelStyle="{
                        fontWeight: 'bold',
                      }"
                    >
                      <a-descriptions-item label="Receiver Acc. Name">
                        {{ record.receiver_account_name }}
                      </a-descriptions-item>
                      <a-descriptions-item label="Receiver Acc. Number">
                        {{ record.receiver_account_number }}
                      </a-descriptions-item>
                      <a-descriptions-item label="Receiver Bank">
                        {{ record.receiver_bank_name }}
                      </a-descriptions-item>
                    </a-descriptions>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <a-drawer
          title="Change Loan Status"
          placement="right"
          :closable="false"
          :mask-closable="false"
          size="large"
          v-model:visible="loanStatusVisible"
          @after-visible-change="afterLoanStatusVisibleChange"
        >
          <loan-status-form
            ref="loanStatusForm"
            :is-editing="isEditingLoanStatus"
            @close-drawer="closeLoanStatusDrawer"
          />
        </a-drawer>
      </div>
    </template>

    <!-- <template
      #customFilterDropdown="{
        column: { title, filterKey, onFilter, dataIndex },
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }"
    >
      <div style="padding: 8px">
        <a-input
          ref="searchInput"
          :placeholder="`Search ${title}`"
          :value="selectedKeys[filterKey]"
          @change="
            (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
          @pressEnter="handleSearch(selectedKeys, confirm, dataIndex)"
        />
        <a-button
          type="primary"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          <template #icon><SearchOutlined /></template>
          Search
        </a-button>
        <a-button size="small" style="width: 90px" @click="clearFilters">
          Reset
        </a-button>
      </div>

    </template> -->
    <!-- @input="(e) => onFilter(e.target.value, dataSource)" -->

    <template
      #filterDropdown="{
        column,
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }"
    >
      <div style="padding: 8px">
        <a-input
          ref="searchInput"
          :placeholder="`Search ${column.title}`"
          style="width: 188px; margin-bottom: 8px; display: block"
          :value="selectedKeys[column.filterKey]"
          @change="
            (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
          @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          <template #icon><SearchOutlined /></template>
          Search
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="handleReset(clearFilters)"
        >
          Reset
        </a-button>
      </div>
    </template>

    <template #bodyCell="{ text, column }">
      <span v-if="searchText && searchedColumn === column.dataIndex">
        <template
          v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark
            v-if="fragment.toLowerCase() === searchText.toLowerCase()"
            :key="i"
            class="highlight"
          >
            {{ fragment }}
          </mark>
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
    </template>

    <template #applicantName="{ record }">
      <a-typography-link :href="`/farmer/${record.farmer_id}`">
        {{ record.applicant_name }}
      </a-typography-link>
    </template>

    <template #name="{ record }">
      <a-typography-link :href="`/farmer/${record.id}`">
        <span style="width: 300px">
          {{ record.fname }} {{ record.lname }}
          <!-- {{ record.full_names }} -->
        </span>
      </a-typography-link>
    </template>

    <template #photo="{ text }">
      <a-avatar v-if="text" :src="text">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      <a-avatar v-else>
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
    </template>

    <template #fullName="{ text }">
      {{ text }}
    </template>

    <template #time="{ text }">
      {{ text }}
    </template>

    <template #currency="{ text }">
      <template v-if="text"> KShs. {{ text }} </template>
    </template>

    <template #percentage="{ text }">
      <template v-if="text"> {{ text }}% </template>
    </template>

    <template #boolean="{ text }"> {{ text ? "Yes" : "No" }} </template>

    <template #dateTime="{ text }">
      {{ new Date(text).toDateString() }}
      {{ new Date(text).toLocaleTimeString() }}
    </template>

    <template #action="{ record }">
      <span class="actions-cell">
        <a-button type="link" @click="$emit('edit', record)">
          <EditOutlined />
        </a-button>

        <a-popconfirm
          title="Are you sure delete?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="$emit('remove', record)"
        >
          <a-button type="link">
            <DeleteOutlined />
          </a-button>
        </a-popconfirm>
      </span>
    </template>

    <template #editAction="{ record }">
      <span class="actions-cell">
        <a-button type="link" @click="$emit('edit', record)">
          <EditOutlined />
        </a-button>
      </span>
    </template>

    <template #approveRecord="{ record }">
      <span class="actions-cell">
        <a-button type="link" @click="$emit('approve', record)">
          Approve
        </a-button>
      </span>
    </template>
  </a-table>
  <!-- <easy-data-table :headers="columns" :items="dataSource" /> -->
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from "vue";
import { LoanStatusForm } from "@/components/Forms";
import { useAppAuthentication, useLoans } from "@/composables";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import type { TableProps } from "ant-design-vue";

export default defineComponent({
  name: "NewDataGrid",

  components: {
    DeleteOutlined,
    EditOutlined,
    SearchOutlined,
    UserOutlined,
    LoanStatusForm,
  },

  props: {
    columns: {
      type: Array,
      required: true,
    },

    rowKey: {
      type: String || Number,
      required: false,
      default: "id",
    },

    dataSource: {
      type: Array,
      required: true,
    },

    label: {
      type: String,
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

    rowExpandable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  emits: [
    "handle-table-change",
    "edit",
    "remove",
    "handle-search",
    "render-row-data",
    "approve",
  ],

  setup(props, { emit }) {
    const { loanStatusList, setLoan } = useLoans();
    const route = useRoute();

    const { hasPermission } = useAppAuthentication();

    const current = ref<number>(1);

    const pageSize = ref<number>(50);

    const pagination = computed(() => ({
      total: props.total,
      current: current.value,
      pageSize: pageSize.value,
      showSizeChanger: true,
      pageSizeOptions: ["10", "25", "50", "100", "500", "1000", "2000"],
    }));

    const selectedKeys = ref<Record<string, string>>({});

    const visible = ref<boolean>(false);

    const selectedRecord = ref<number | null>(null);

    const loanStatusValue = ref<string>();

    const visiblePopConfirm = ref<boolean>(false);

    const messageLoading = ref<boolean>(false);

    const isEditingLoanStatus = ref<boolean>(false);

    const loanStatusVisible = ref<boolean>(false);

    const state = reactive({
      searchText: "",
      searchedColumn: "",
    });

    const editLoanStatus = async (loanItem) => {
      setLoan(loanItem);
      isEditingLoanStatus.value = true;
      loanStatusVisible.value = true;
    };

    const filteredInfo = ref();
    const sortedInfo = ref();
    // const editRecord = ref();

    // const messageRequest = ref<IMessageRequest>({
    //   message: "",
    //   messageBody: "",
    //   phones: [],
    // });

    const openMessageDrawer = (record) => {
      console.log(record);
      // editRecord.value = record;
      visible.value = true;
    };

    const handleTableChange: TableProps["onChange"] = (
      pagination,
      filters,
      sorter
    ) => {
      filteredInfo.value = filters;
      sortedInfo.value = sorter;
      emit("handle-table-change", {
        filteredInfo,
        sortedInfo,
      });
    };

    const afterVisibleChange = (status: boolean) => {
      if (!status) {
        visible.value = false;
        // messageRequest.value = {
        //   message: "",
        //   messageBody: "",
        //   phones: [],
        // };
      }
    };

    const handleStatusMenuClick = (menu) => {
      console.log(menu);
      visiblePopConfirm.value = false;
      isEditingLoanStatus.value = false;
    };

    // const handleSearch = (searchValue: string, key: string) => {
    //   selectedKeys.value = { ...selectedKeys.value, [`${key}`]: searchValue };
    //   Object.keys(selectedKeys.value).forEach((el) => {
    //     if (selectedKeys.value[el] === "") {
    //       delete selectedKeys.value[el];
    //     }
    //   });
    //   emit("handle-search", selectedKeys.value);
    // };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      state.searchText = selectedKeys[0];
      state.searchedColumn = dataIndex;
    };

    const handleReset = (clearFilters) => {
      clearFilters({ confirm: true });
      state.searchText = "";
    };

    // const loanStatusForm = ref<InstanceType<typeof LoanStatusForm>>();

    const closeLoanStatusDrawer = () => {
      loanStatusVisible.value = false;
      isEditingLoanStatus.value = false;
    };

    const afterLoanStatusVisibleChange = (status: boolean) => {
      if (!status) {
        isEditingLoanStatus.value = false;
        // loanStatusForm.value?.reset();
      }
    };

    return {
      pagination,
      visible,
      isEditingLoanStatus,
      visiblePopConfirm,
      route,
      selectedRecord,
      messageLoading,
      selectedKeys,
      loanStatusValue,
      loanStatusList,
      loanStatusVisible,
      afterLoanStatusVisibleChange,
      closeLoanStatusDrawer,
      editLoanStatus,
      handleSearch,
      handleReset,
      handleTableChange,
      afterVisibleChange,
      openMessageDrawer,
      handleStatusMenuClick,
      hasPermission,
      ...toRefs(state),
    };
  },
});
</script>

<style scoped>
.actions-cell {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
