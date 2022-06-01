<script lang="ts">
import { defineComponent } from "vue";
import AdminLayout from "../layouts/AdminLayout.vue";

export default defineComponent({
  components: {
    AdminLayout,
  },
});
</script>

<template>
  <AdminLayout>
    <router-view />
  </AdminLayout>
</template>
