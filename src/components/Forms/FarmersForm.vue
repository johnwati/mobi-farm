<template>
  <a-spin :spinning="loading">
    <a-form
      layout="vertical"
      ref="farmersForm"
      :rules="rules"
      :model="formState"
    >
      <a-form-item label="Photo" name="photo">
        <avatar-picker />
      </a-form-item>
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12">
          <a-form-item label="First Name" name="first_name">
            <a-input v-model:value="formState.first_name" type="text" />
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-item label="Last Name" name="last_name">
            <a-input v-model:value="formState.last_name" type="text" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item label="ID Number" name="id_no">
        <a-input v-model:value="formState.id_number" />
      </a-form-item>

      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12">
          <a-form-item label="Phone Number" name="phone_number">
            <a-input
              v-model:value="formState.phone_number"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-item label="Email Address" name="email">
            <a-input v-model:value="formState.email" type="text" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12">
          <a-form-item label="Gender" name="gender">
            <a-input v-model:value="formState.gender" type="text" />
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-item label="Occupation" name="occupation">
            <a-input v-model:value="formState.occupation" type="text" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item label="Sales Agent Code" name="sale_agent_code">
        <a-input v-model:value="formState.sale_agent_code" type="text" />
      </a-form-item>

      <a-form-item label="Region" name="region">
        <a-input v-model:value="formState.region" type="text" />
      </a-form-item>

      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12">
          <a-form-item label="County" name="county">
            <a-input v-model:value="formState.county" type="text" />
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-item label="Ward" name="ward">
            <a-input v-model:value="formState.ward" type="text" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item label="Value Chain" name="value_chaim">
        <a-input v-model:value="formState.value_chain" type="text" />
      </a-form-item>

      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12">
          <a-form-item label="Farm Size" name="farm_size">
            <a-input v-model:value="formState.farm_size" type="text" />
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-item label="Farm Coordinates" name="farm_coordinates">
            <a-input v-model:value="formState.farm_coordinates" type="text" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item label="Soil Types" name="soil_types">
        <a-input v-model:value="formState.soil_types" type="text" />
      </a-form-item>

      <a-form-item label="Modules Trained" name="modules_trained">
        <a-input v-model:value="formState.modules_trained" type="text" />
      </a-form-item>

      <a-form-item label="Actual Plant Date" name="actual_plant_date">
        <a-input v-model:value="formState.actual_plant_date" type="text" />
      </a-form-item>

      <a-form-item label="Collaterals" name="collaterals">
        <a-input v-model:value="formState.collaterals" type="text" />
      </a-form-item>

      <a-form-item
        label="Collateral Net Book value"
        name="collateral_net_book_value"
      >
        <a-input
          v-model:value="formState.collateral_net_book_value"
          type="text"
        />
      </a-form-item>

      <a-form-item label="Next of Kin" name="next_of_kin_msisdn">
        <a-input v-model:value="formState.next_of_kin_msisdn" type="text" />
      </a-form-item>

      <a-form-item label="Next of Kin Email" name="next_of_kin_email">
        <a-input v-model:value="formState.next_of_kin_email" type="text" />
      </a-form-item>

      <a-form-item label="Marital Status" name="marital_status">
        <a-input v-model:value="formState.marital_status" type="text" />
      </a-form-item>

      <a-form-item label="Other source of income" name="other_source_od_income">
        <a-input v-model:value="formState.other_source_od_income" type="text" />
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
import { defineComponent, onMounted, ref, watch } from "vue";
import { useFarmers } from "@/composables";
import { AvatarPicker } from "@/components/Forms";

export default defineComponent({
  name: "FarmersForm",

  components: {
    AvatarPicker,
  },

  props: {
    isEditing: {
      type: Boolean,
      required: true,
    },
  },

  emits: ["close-drawer", "submitted"],

  setup(props, { emit }) {
    const { farmer, createFarmer, updateFarmer } = useFarmers();

    const farmersForm = ref();

    const loading = ref<boolean>(false);

    const formState = ref({
      first_name: "",
      last_name: "",
      sale_agent_code: "",
      id_number: "",
      phone_number: "",
      email: "",
      gender: "Male",
      occupation: "",
      region: "",
      county: "",
      ward: "",
      value_chain: "",
      farm_size: "",
      farm_coordinates: "",
      soil_types: "",
      modules_trained: "",
      actual_plant_date: "",
      collaterals: "",
      collateral_net_book_value: "",
      next_of_kin_msisdn: "",
      next_of_kin_email: "",
      marital_status: "",
      other_source_od_income: "",
    });

    const rules = ref({
      sale_agent_code: [{ required: false }],
      id_number: [{ required: true }],
      phone_number: [{ required: true }],
      first_name: [{ required: true }],
      last_name: [{ required: true }],
    });

    const submit = async () => {
      loading.value = true;
      try {
        await farmersForm.value.validate();
        if (props.isEditing) {
          await updateFarmer({
            id: farmer.value.id,
            data: formState.value,
          });
        } else {
          await createFarmer(formState.value);
        }
        farmersForm.value.resetFields();
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
        emit("close-drawer");
        emit("submitted");
      }
    };

    const reset = () => {
      try {
        if (props.isEditing) {
          farmersForm.value.resetFields();
        } else {
          farmersForm.value.resetFields();
        }
        emit("close-drawer");
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(async () => {
      loading.value = true;
      try {
        // await fetchClassrooms({ "school.id": schoolId.value });
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
            console.log(farmer.value, "watching");
            formState.value = {
              first_name: farmer.value.fname,
              last_name: farmer.value.lname,
              sale_agent_code: farmer.value.sale_agent_code,
              id_number: farmer.value.id_no,
              phone_number: farmer.value.phone,
              email: farmer.value.email,
              gender: farmer.value.gender,
              occupation: farmer.value.occupation,
              region: farmer.value.region,
              county: farmer.value.county,
              ward: farmer.value.ward,
              value_chain: farmer.value.value_chaim,
              farm_size: farmer.value.farm_size,
              farm_coordinates: farmer.value.farmer_coordinates,
              soil_types: farmer.value.soil_types,
              modules_trained: farmer.value.modules_trained,
              actual_plant_date: farmer.value.actual_plant_date,
              collaterals: farmer.value.collaterals,
              collateral_net_book_value: farmer.value.collateral_net_book_value,
              next_of_kin_msisdn: farmer.value.next_of_kin_msisdn,
              next_of_kin_email: farmer.value.next_of_kin_email,
              marital_status: farmer.value.marital_status,
              other_source_od_income: farmer.value.other_source_od_income,
            };
            console.log(formState, "state");
          } else {
            formState.value = {
              first_name: "",
              last_name: "",
              sale_agent_code: "",
              id_number: "",
              phone_number: "",
              email: "",
              gender: "Male",
              occupation: "",
              region: "",
              county: "",
              ward: "",
              value_chain: "",
              farm_size: "",
              farm_coordinates: "",
              soil_types: "",
              modules_trained: "",
              actual_plant_date: "",
              collaterals: "",
              collateral_net_book_value: "",
              next_of_kin_msisdn: "",
              next_of_kin_email: "",
              marital_status: "",
              other_source_od_income: "",
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
      farmersForm,
      rules,
      formState,
      loading,
      submit,
      reset,
    };
  },
});
</script>
