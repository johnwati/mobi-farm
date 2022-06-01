<template>
  <AuthenticationLayout>
    <template #content>
      <a-result
        status="500"
        title="500"
        sub-title="Sorry, the server is wrong."
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
  name: "InternalServerError",

  components: {
    AuthenticationLayout,
  },
});
</script>
