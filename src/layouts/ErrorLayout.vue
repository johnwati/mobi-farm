<template>
  <a-layout class="layout">
    <a-layout-content class="error-layout-content">
      <a-row
        :gutter="[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]"
        type="flex"
        justify="center"
        align="middle"
        style="height: 100%; width: 100%"
      >
        <a-col :xs="24" :sm="24" :md="8" :lg="8">
          <slot name="content" />
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ErrorLayout",

  setup() {
    const year = ref<number>(new Date().getFullYear());

    return {
      year,
    };
  },
});
</script>

<style scoped>
.error-layout-content {
  height: 100vh;
  width: 100vw;
  text-align: "center";
}
</style>
