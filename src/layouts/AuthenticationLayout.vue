<template>
  <a-layout class="layout">
    <a-layout-content class="authentication-layout-content">
      <a-row
        :gutter="[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]"
        type="flex"
        justify="center"
        align="stretch"
        style="height: 100%; width: 100%"
      >
        <a-col
          :xs="0"
          :sm="0"
          :md="14"
          :lg="14"
          class="authentication-background"
        />

        <a-col :xs="24" :sm="24" :md="10" :lg="10" class="authentication-form">
          <div class="" style="max-width: 500px">
            <slot name="content" />
          </div>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AuthenticationLayout",
});
</script>

<style scoped>
.authentication-layout-content {
  height: 100vh;
  width: 100vw;
  text-align: "center";
}

.authentication-background {
  /* background: url(../images/background.jpg); */
  background: rgb(4, 76, 125);
  background: linear-gradient(
    355deg,
    rgba(4, 76, 125, 1) 0%,
    rgba(50, 135, 185, 1) 31%,
    rgba(0, 215, 209, 1) 100%
  );
  background-size: cover;
  background-position: right;
  background-repeat: no-repeat;
  height: 100%;
}

.authentication-form {
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-right: 55px; */
}
</style>
