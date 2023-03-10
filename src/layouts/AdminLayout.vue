<template>
  <a-layout class="page">
    <a-layout-sider
      v-model:collapsed="collapsed"
      breakpoint="lg"
      collapsed-width="0"
      :trigger="null"
      collapsible
      class="sidebar"
      theme="light"
    >
      <div class="logo"></div>
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
        <a-typography-link href="/dashboard">
          <a-menu-item key="dashboard">
            <area-chart-outlined />
            <span>Dashboard</span>
          </a-menu-item>
        </a-typography-link>
        <a-typography-link
          v-if="hasPermission('farmer-management')"
          href="/farmers"
        >
          <a-menu-item key="FarmersList">
            <user-outlined />
            <span>Farmers</span>
          </a-menu-item>
        </a-typography-link>
        <a-typography-link
          v-if="hasPermission('loan-management')"
          href="/loans"
        >
          <a-menu-item key="LoansList">
            <transaction-outlined />
            <span>Loans</span>
          </a-menu-item>
        </a-typography-link>
        <a-typography-link
          v-if="hasPermission('deposit-management')"
          href="/deposits"
        >
          <a-menu-item key="DepositsList">
            <money-collect-outlined />
            <span>Deposits</span>
          </a-menu-item>
        </a-typography-link>
        <a-typography-link v-if="hasPermission('administration')" href="/admin">
          <a-menu-item key="AdminView">
            <setting-filled />
            <span>Admin</span>
          </a-menu-item>
        </a-typography-link>
        <a-typography-link href="/batch_management">
          <a-menu-item key="BatchManagement">
            <inbox-outlined />
            <span>Batch Import</span>
          </a-menu-item>
        </a-typography-link>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header" theme="light">
        <a-space direction="horizontal" align="center">
          <a-button type="text">
            <template #icon>
              <menu-outlined
                class="trigger"
                @click="() => (collapsed = !collapsed)"
              />
            </template>
          </a-button>

          <div v-if="collapsed" class="logo in-header"></div>
        </a-space>

        <a-button type="text" @click="logout">
          <template #icon><user-outlined /></template>
          <span class="userName">Logout</span>
        </a-button>
      </a-layout-header>
      <a-layout-content class="main-content">
        <div class="container">
          <slot></slot>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { useRoute } from "vue-router";

import useAuthentication from "@/composables/useAppAuthentication";

import {
  AreaChartOutlined,
  InboxOutlined,
  // MenuFoldOutlined,
  MenuOutlined,
  MoneyCollectOutlined,
  SettingFilled,
  TransactionOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  name: "AdminLayout",

  components: {
    UserOutlined,
    AreaChartOutlined,
    MoneyCollectOutlined,
    TransactionOutlined,
    SettingFilled,
    // MenuFoldOutlined,
    MenuOutlined,
    InboxOutlined,
  },

  setup() {
    const route = useRoute();
    // const router = useRouter();

    const { logout, hasPermission } = useAuthentication();

    const year = ref<number>(new Date().getFullYear());
    const collapsed = ref<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const selectedKeys = ref<string[]>([route.name]);

    return {
      selectedKeys,
      year,
      collapsed,
      logout,
      hasPermission,
    };
  },
});
</script>

<style lang="less" scoped>
.page {
  height: 100vh;
}
.logo {
  background-image: url("../assets/mobifarm-logo-white.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 70px;
  margin: 0 10px;

  &.in-header {
    background-image: url("../assets/mobifarm-logo.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 200px;
  }
}
.header {
  /* background: rgb(75, 73, 185); */
  /* background: rgba(4, 76, 125, 1); */
  // background: @primary-color;
  background: white;
  color: #000;
  padding: 0 32px;
  position: "fixed";
  top: 0;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}
.sidebar {
  overflow: auto;
  height: 100vh;
  position: "fixed";
  left: 0;
  top: 0;
  bottom: 0;
  // background: @primary-color;
  /* background-color: #791f1f; */
  background: rgb(6, 164, 176);
  background: linear-gradient(
    180deg,
    rgba(6, 164, 176, 1) 0%,
    rgba(4, 185, 190, 1) 67%,
    rgba(0, 215, 209, 1) 100%
  );

  .ant-menu {
    background: none;

    a.ant-typography,
    .ant-typography a {
      color: #ffffff;
      font-size: 15px;

      :hover {
        color: #f5f5f5;
      }
    }
  }
}
.main-content {
  padding: 24px 16px;
  /* padding: 24px; */
  /* background: #fafafa; */
  background-color: #f5f5f5;
  min-height: 280px;
  overflow: auto;
  // display: flex;
  // justify-content: center;
}
.userName {
  margin-left: 0.5rem;
  color: inherit;
  font-weight: 500;
}
.trigger {
  color: inherit;
  font-size: 20px;
}
</style>
