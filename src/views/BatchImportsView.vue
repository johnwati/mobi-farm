<template>
  <div class="full-width">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <a-typography-link href="/dashboard"> Dashboard </a-typography-link>
      </a-breadcrumb-item>

      <a-breadcrumb-item>Batch Imports</a-breadcrumb-item>
    </a-breadcrumb>

    <a-page-header
      title="Batch Imports"
      :ghost="false"
      class="list-page-header"
    >
    </a-page-header>
    <a-row :gutter="36">
      <a-col :span="9">
        <a-form
          layout="vertical"
          ref="farmerLimitsForm"
          :rules="rules"
          :model="formState"
        >
          <a-form-item label="Import Template" name="template_type">
            <a-select
              v-model:value="formState.template_type"
              :options="dataTypes"
            >
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click.prevent="submit">
              Generate Template
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="15">
        <a-form
          layout="vertical"
          ref="farmerLimitsForm"
          :rules="rules"
          :model="formState"
        >
          <a-form-item label="Select file type" name="fileType">
            <a-select v-model:value="formState.fileType" :options="dataTypes">
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-upload-dragger
              v-model:fileList="fileList"
              name="file"
              :customRequest="uploadRequest"
              :multiple="true"
              @change="handleChange"
              style="height: 350px"
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
              :disabled="fileList.length > 1 || formState.fileType === ''"
              type="primary"
            >
              Upload
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
import { computed, defineComponent, onMounted, ref } from "vue";

import { useBatchActions } from "@/composables";
import type { SelectProps } from "ant-design-vue/lib/vc-select";
export default defineComponent({
  name: "BatchImportsView",
  components: {
    InboxOutlined,
  },
  setup() {
    const loading = ref<boolean>(false);

    const visible = ref<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fileList = ref<any[]>([]);

    const formState = ref({
      template_type: "",
      fileType: "",
    });

    const rules = ref({
      template_type: [{ required: true }],
    });

    const { fetchBatchImportTemplate, batchImportData } = useBatchActions();

    const dataTypes = computed((): SelectProps["options"] => [
      {
        label: "FarmerLimits",
        value: "FarmerLimits",
      },
      {
        label: "Farmers",
        value: "Farmers",
      },
      {
        label: "Agrodealers",
        value: "Agrodealers",
      },
      {
        label: "Products",
        value: "Products",
      },
      {
        label: "PriceBookItems",
        value: "PriceBookItems",
      },
    ]);

    const handleChange = (info: UploadChangeParam) => {
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    };

    const uploadRequest = ({ file, onSuccess }) => {
      console.log(file);
      setTimeout(() => {
        onSuccess("ok");
      }, 0);
    };

    const getFile = async (file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    };

    const uploadFiles = async () => {
      console.log(fileList.value);

      Promise.all(
        fileList.value.map((file) => getFile(file.originFileObj))
      ).then(async (data) => {
        console.log(data, "item");
        await batchImportData({
          fileType: formState.value.fileType,
          file: data,
        });
      });
    };

    const submit = async () => {
      console.log(formState.value.template_type);
      loading.value = true;
      await fetchBatchImportTemplate(formState.value.template_type).then(() => {
        loading.value = false;
      });
    };

    onMounted(async () => {
      try {
        // await fetchDeposits();
      } catch (error) {
        console.error(error);
      }
    });

    return {
      loading,
      visible,
      formState,
      rules,
      dataTypes,
      fileList,
      uploadRequest,
      uploadFiles,
      handleChange,
      submit,
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
