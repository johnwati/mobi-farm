<script setup lang="ts">
// import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <router-view />
</template>

<style>
@import "@/assets/base.css";

* {
  box-sizing: border-box;
}

.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.pointer {
  cursor: pointer;
}

.list-page-header {
  margin: 12px 0;
}

.success_button {
  background-color: #22bb33;
  border: none;
}

.warning_button {
  background-color: darkorange;
  border: none;
}
</style>
