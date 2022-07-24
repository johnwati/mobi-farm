<template>
  <a-spin :spinning="loading">
    <a-form
      layout="vertical"
      ref="tenureForm"
      :rules="rules"
      :model="formState"
    >
      <a-form-item label="Name" name="fee name">
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item label="Minimum Amount" name="min amount">
        <a-input-number v-model:value="formState.min_amount" />
      </a-form-item>

      <a-form-item label="Maximum Amount" name="min amount">
        <a-input-number v-model:value="formState.max_amount" />
      </a-form-item>

      <a-form-item label="Repayment Duration" name="min amount">
        <a-input-number v-model:value="formState.repayment_duration" />
      </a-form-item>

      <a-form-item v-if="isEditing" label="Active" name="active">
        <a-switch v-model:value="formState.active" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" @click.prevent="submit">
          {{ isEditing ? "Update" : "Create" }}
        </a-button>

        <a-button style="margin-left: 10px" @click="reset"> Cancel </a-button>
      </a-form-item>
    </a-form>
  </a-spin>
</template>
<script lang="ts">
import { useAdmin } from "@/composables";
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  name: "TenureForm",

  props: {
    isEditing: {
      type: Boolean,
      required: true,
    },
  },

  emits: ["close-drawer"],

  setup(props, { emit }) {
    const { tenure, createTenure, updateTenure } = useAdmin();

    const tenureForm = ref();

    const loading = ref<boolean>(false);

    const formState = ref({
      name: "",
      min_amount: null,
      max_amount: null,
      repayment_duration: null,
      active: true,
    });

    const rules = ref({
      name: [{ required: true }],
    });

    const submit = async () => {
      loading.value = true;
      try {
        await tenureForm.value.validate();

        if (props.isEditing) {
          await updateTenure({
            id: tenure.value.id,
            data: formState.value,
          });
        } else {
          await createTenure(formState.value);
        }
        tenureForm.value.resetFields();
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
        emit("close-drawer");
      }
    };

    const reset = () => {
      try {
        tenureForm.value.resetFields();
        emit("close-drawer");
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(async () => {
      loading.value = true;
      try {
        // console.log(loan);
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    });

    watch(
      () => props.isEditing,
      async (currentValue) => {
        loading.value = true;
        try {
          if (currentValue) {
            formState.value = {
              name: tenure.value.name,
              min_amount: tenure.value.min_amount,
              max_amount: tenure.value.max_amount,
              repayment_duration: tenure.value.repayment_duration,
              active: tenure.value.active,
            };
          } else {
            formState.value = {
              name: "",
              min_amount: null,
              max_amount: null,
              repayment_duration: null,
              active: true,
            };
          }
        } catch (error) {
          console.error(error);
        } finally {
          loading.value = false;
        }
      },
      { immediate: true, deep: true }
    );

    return {
      tenureForm,
      rules,
      formState,
      loading,
      submit,
      reset,
    };
  },
});
</script>
