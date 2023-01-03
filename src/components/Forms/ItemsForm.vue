<template>
  <a-spin :spinning="loading">
    <a-form
      layout="vertical"
      ref="farmerLimitsForm"
      :rules="rules"
      :model="formState"
    >
      <a-form-item label="Type" name="itemType">
        <a-select
          ref="statusSelect"
          v-model:value="formState.itemType"
          style="width: 200px"
        >
          <a-select-option
            v-for="(item, ind) in itemTypes"
            :value="item"
            :key="ind"
          >
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Name" name="itemName">
        <a-input v-model:value="formState.itemName" type="text" />
      </a-form-item>

      <a-form-item label="Rate" name="rate">
        <a-input v-model:value="formState.rate" type="text" />
      </a-form-item>

      <a-form-item label="Unit" name="itemUnit">
        <a-input v-model:value="formState.itemUnit" type="text" />
      </a-form-item>

      <a-form-item label="Description" name="description">
        <a-input v-model:value="formState.description" type="text" />
      </a-form-item>

      <a-form-item label="Cost rate" name="costRate">
        <a-input v-model:value="formState.costRate" type="text" />
      </a-form-item>

      <a-form-item label="Stock Category" name="stockCategory">
        <a-input v-model:value="formState.stockCategory" type="text" />
      </a-form-item>

      <a-form-item label="Stock rate per Unit" name="stockRatePerUnit">
        <a-input v-model:value="formState.stockRatePerUnit" type="text" />
      </a-form-item>

      <a-form-item label="UOM" name="uom">
        <a-select
          ref="statusSelect"
          v-model:value="formState.uom"
          style="width: 200px"
        >
          <a-select-option
            v-for="(item, ind) in itemUom"
            :value="item"
            :key="ind"
          >
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Category" name="category">
        <a-select
          ref="statusSelect"
          v-model:value="formState.category"
          style="width: 200px"
        >
          <a-select-option
            v-for="(item, ind) in itemCategories"
            :value="item"
            :key="ind"
          >
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Unit" name="unit">
        <a-input v-model:value="formState.unit" type="text" />
      </a-form-item>

      <!-- <a-form-item label="Loan Product" name="loan_product_code">
        <a-select
          v-model:value="formState.loan_product_code"
          :options="loanProductOptions"
        />
      </a-form-item> -->

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
import useConfigs from "@/composables/useConfigs";
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  name: "ItemsForm",

  props: {
    isEditing: {
      type: Boolean,
      required: true,
    },
  },

  emits: ["close-drawer"],

  setup(props, { emit }) {
    const { updateItem, createItem, item } = useAdmin();

    const { fetchItemCategories, itemCategories, itemUom } = useConfigs();

    const farmerLimitsForm = ref();

    const loading = ref<boolean>(false);

    const itemTypes = ref<string[]>(["Inventory", "Service"]);

    const formState = ref({
      itemId: 0,
      itemType: "",
      itemName: "",
      itemCode: "",
      rate: 0,
      itemUnit: "",
      description: "",
      costRate: 0,
      stockCategory: "",
      stockRatePerUnit: 0,
      uom: "",
      category: "",
      unit: "",
      active: true,
    });

    const rules = ref({
      min_amount: [{ required: true }],
      max_amount: [{ required: true }],
    });

    const submit = async () => {
      loading.value = true;
      try {
        await farmerLimitsForm.value.validate();
        if (props.isEditing) {
          await updateItem({
            id: formState.value.itemId,
            data: formState.value,
          });
        } else {
          await createItem(formState.value);
        }
        await farmerLimitsForm.value.resetFields();
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
        emit("close-drawer");
      }
    };

    const reset = () => {
      try {
        farmerLimitsForm.value.resetFields();
        emit("close-drawer");
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(async () => {
      loading.value = true;
      try {
        await fetchItemCategories();
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
              itemId: item.value.item_id,
              itemType: item.value.item_type,
              itemName: item.value.item_name,
              itemCode: item.value.item_code,
              rate: item.value.rate,
              itemUnit: item.value.item_unit,
              description: item.value.description,
              costRate: item.value.costRate,
              stockCategory: item.value.stock_category,
              stockRatePerUnit: item.value.stock_rate_per_unit,
              uom: item.value.uom,
              category: item.value.category,
              unit: item.value.unit,
              active: item.value.active,
            };
          } else {
            formState.value = {
              itemId: 0,
              itemType: "",
              itemName: "",
              itemCode: "",
              rate: 0,
              itemUnit: "",
              description: "",
              costRate: 0,
              stockCategory: "",
              stockRatePerUnit: 0,
              uom: "",
              category: "",
              unit: "",
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

    // watch(
    //   () => formState.value.status,
    //   async () => {
    //     loading.value = true;
    //     try {
    //       if (formState.value.status === loan.value.status) {
    //         formState.value.comments = loan.value.reason;
    //       } else {
    //         formState.value.comments = "";
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     } finally {
    //       loading.value = false;
    //     }
    //   },
    //   { immediate: false, deep: true }
    // );

    return {
      farmerLimitsForm,
      rules,
      formState,
      loading,
      itemCategories,
      itemUom,
      itemTypes,
      submit,
      reset,
    };
  },
});
</script>
