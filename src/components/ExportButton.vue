<template>
  <a-dropdown>
    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-menu-item key="PDF"> PDF </a-menu-item>
        <a-menu-item key="XLSX"> XLSX </a-menu-item>
        <a-menu-item key="XLS"> XLS </a-menu-item>
        <a-menu-item key="HTML"> HTML </a-menu-item>
        <a-menu-item key="CSV"> CSV </a-menu-item>
        <a-menu-item key="XML"> XML </a-menu-item>
      </a-menu>
    </template>
    <a-button type="primary"> Download Report </a-button>
  </a-dropdown>
</template>

<script lang="ts">
import { useBatchActions } from "@/composables";
import type { MenuProps } from "ant-design-vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ReportExportButton",

  props: {
    reportType: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { downloadReport } = useBatchActions();

    const handleMenuClick: MenuProps["onClick"] = async (e) => {
      console.log("click", e);
      await downloadReport({
        reportName: props.reportType,
        format: e.key,
      });
    };

    return {
      handleMenuClick,
    };
  },
});
</script>
