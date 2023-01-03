<template>
  <div class="full-width">
    <a-row :gutter="[0, 36]">
      <a-col :span="24">
        <a-row justify="space-between">
          <a-col>
            <a-typography-title :level="4">
              Import Farmer Limits
            </a-typography-title>
          </a-col>
          <a-col>
            <a-button type="primary" @click.prevent="downloadTemplate">
              Generate Template
            </a-button>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="24">
        <a-form layout="vertical" ref="farmerLimitsForm">
          <a-form-item>
            <a-upload-dragger
              v-model:fileList="fileList"
              name="file"
              :customRequest="uploadRequest"
              :multiple="true"
              @change="handleChange"
              style="height: 400px"
            >
              <a-space align="center" class="centered" direction="vertical">
                <p class="ant-upload-drag-icon">
                  <inbox-outlined></inbox-outlined>
                </p>
                <p class="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
              </a-space>
            </a-upload-dragger>
          </a-form-item>
          <a-form-item>
            <a-button
              @click="uploadFiles"
              :disabled="fileList.length < 1"
              type="primary"
            >
              Upload
            </a-button>
            <a-button @click="$emit('close-drawer')" style="margin-left: 10px">
              Cancel
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { InboxOutlined } from "@ant-design/icons-vue";
import type { UploadChangeParam } from "ant-design-vue";
import { message } from "ant-design-vue";
import { defineComponent, ref } from "vue";

import { useBatchActions } from "@/composables";

// const fs = require("fs");

export default defineComponent({
  name: "ImportFarmerLimits",
  components: {
    InboxOutlined,
  },

  emits: ["close-drawer"],

  setup() {
    const loading = ref<boolean>(false);

    const visible = ref<boolean>(false);

    const fileList = ref([]);

    const { fetchBatchImportTemplate, batchImportData } = useBatchActions();

    const handleChange = (info: UploadChangeParam) => {
      const status = info.file.status;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    };

    const uploadRequest = ({ file, onSuccess }) => {
      // console.log(file);
      setTimeout(() => {
        onSuccess("ok");
      }, 0);
    };

    const uploadFiles = async () => {
      try {
        await fileList.value.forEach((file) => {
          const filedata = new FormData();
          filedata.append("file", file.originFileObj);

          batchImportData({
            fileType: "FarmerLimits",
            file: filedata,
          });
        });
      } catch (err) {
        console.error(err);
        message.error(err.data.message);
      }
    };

    const downloadTemplate = async () => {
      loading.value = true;
      await fetchBatchImportTemplate("FarmerLimits").then(() => {
        loading.value = false;
      });
    };

    return {
      loading,
      visible,
      fileList,
      uploadRequest,
      uploadFiles,
      handleChange,
      downloadTemplate,
    };
  },
});
</script>

<style scoped>
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
