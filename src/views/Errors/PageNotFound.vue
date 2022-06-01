<template>
  <AuthenticationLayout>
    <template #content>
      <a-result
        status="404"
        title="404"
        sub-title="Sorry, the page you visited does not exist."
      >
        <template #extra>
          <a-button type="primary" @click="$router.push('/dashboard')">
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
  name: "PageNotFound",

  components: {
    AuthenticationLayout,
  },
});
</script>
