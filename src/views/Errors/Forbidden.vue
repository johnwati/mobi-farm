<template>
  <AuthenticationLayout>
    <template #content>
      <a-result
        status="403"
        title="403"
        sub-title="Sorry, you are not authorized to access this page."
      >
        <template #extra>
          <a-button type="primary" @click="$router.push('/home')">
            Back Home
          </a-button>
        </template>
      </a-result>
    </template>
  </AuthenticationLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { AuthenticationLayout } from "@/layouts";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Unauthorized",

  components: {
    AuthenticationLayout,
  },
});
</script>
