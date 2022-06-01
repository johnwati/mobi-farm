<template>
  <a-spin :spinning="loading">
    <a-form
      v-if="!isEditing"
      layout="vertical"
      ref="farmersForm"
      :rules="rules"
      :model="formState"
    >
      <a-form-item label="Sales Agent Code" name="sale_agent_code">
        <a-input v-model:value="formState.sale_agent_code" type="text" />
      </a-form-item>

      <a-form-item label="ID Number" name="id_no">
        <a-input v-model:value="formState.id_no" type="text" />
      </a-form-item>

      <a-form-item label="Phone Number" name="phone_number">
        <a-input-number
          v-model:value="formState.phone_number"
          addon-before="+254"
          :parser="(value) => `+254${value}`"
        />
      </a-form-item>

      <a-form-item label="First Name" name="first_name">
        <a-input v-model:value="formState.first_name" type="text" />
      </a-form-item>

      <a-form-item label="Last Name" name="last_name">
        <a-input v-model:value="formState.last_name" type="text" />
      </a-form-item>

      <a-form-item label="Password" name="password">
        <a-input v-model:value="formState.password" type="password" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" @click.prevent="submit">
          {{ isEditing ? "Update" : "Create" }}
        </a-button>

        <a-button style="margin-left: 10px" @click="reset"> Cancel </a-button>
      </a-form-item>
    </a-form>
    <a-form
      v-else
      layout="vertical"
      ref="updateFarmersForm"
      :rules="updateRules"
      :model="updateFormState"
    >
      <a-form-item label="Photo" name="photo">
        <avatar-picker />
      </a-form-item>
      <a-form-item label="Name" name="full_names">
        <a-input v-model:value="updateFormState.full_names" type="text" />
      </a-form-item>

      <a-form-item label="ID Number" name="id_no">
        <a-input v-model:value="updateFormState.id_no" type="text" />
      </a-form-item>

      <a-form-item label="Phone Number" name="phone_number">
        <a-input v-model:value="updateFormState.phone_number" />
      </a-form-item>

      <a-form-item label="Sales Agent Code" name="sale_agent_code">
        <a-input v-model:value="updateFormState.sale_agent_code" type="text" />
      </a-form-item>

      <a-form-item label="County" name="county">
        <a-input v-model:value="updateFormState.county" type="text" />
      </a-form-item>

      <a-form-item label="Ward" name="ward">
        <a-input v-model:value="updateFormState.ward" type="text" />
      </a-form-item>

      <a-form-item label="Value Chain" name="value_chaim">
        <a-input v-model:value="updateFormState.value_chaim" type="text" />
      </a-form-item>

      <a-form-item label="Farm Size" name="farm_size">
        <a-input v-model:value="updateFormState.farm_size" type="text" />
      </a-form-item>

      <a-form-item label="Payment Method" name="payment_method">
        <a-input v-model:value="updateFormState.payment_method" type="text" />
      </a-form-item>

      <a-form-item label="Account Number" name="account_number">
        <a-input v-model:value="updateFormState.account_number" type="text" />
      </a-form-item>

      <a-form-item label="Account Name" name="account_name">
        <a-input v-model:value="updateFormState.account_name" type="text" />
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
import type { IFarmer, IFarmerRegistration } from "@/interfaces/farmers";
import { useFarmers } from "@/composables";
import { AvatarPicker } from "@/components/Forms";

// import { IStudentRequest } from "@/interfaces/Students";

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

  emits: ["close-drawer"],

  setup(props, { emit }) {
    const { farmer, fetchFarmer, createFarmer, updateFarmer } = useFarmers();

    // const farmerr = ref(farmer);
    const farmersForm = ref();
    const updateFarmersForm = ref();

    const loading = ref<boolean>(false);

    const formState = ref<IFarmerRegistration>({
      sale_agent_code: "",
      id_no: "",
      phone_number: "",
      first_name: "",
      last_name: "",
      password: "",
    });

    const updateFormState = ref<IFarmer>({
      id: 0,
      company_id: "",
      version: 0,
      created_on: "",
      created_by: "",
      last_modified_on: "",
      last_modified_by: "",
      farmer_code: "",
      sale_agent_code: "",
      id_no: "",
      county: "",
      ward: "",
      value_chaim: "",
      farm_size: "",
      photo: "",
      signature: "",
      additional_fields: "",
      phone_number: "",
      full_names: "",
      farmer_id: "",
      payment_method: "MPESA",
      account_number: "",
      account_name: "",
      status: "PENDING_REGISTRATION",
      new: false,
    });

    const rules = ref({
      sale_agent_code: [{ required: true }],
      id_no: [{ required: true }],
      phone_number: [{ required: true }],
      first_name: [{ required: true }],
      last_name: [{ required: true }],
      password: [{ required: true }],
    });

    const updateRules = ref({
      sale_agent_code: [{ required: true }],
      id_no: [{ required: true }],
      phone_number: [{ required: true }],
      full_names: [{ required: true }],
    });

    const submit = async () => {
      loading.value = true;
      try {
        if (props.isEditing) {
          await updateFarmersForm.value.validate();
          await updateFarmer(updateFormState.value);
          updateFarmersForm.value.resetFields();
        } else {
          await farmersForm.value.validate();
          await createFarmer(formState.value);
          farmersForm.value.resetFields();
        }
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
        emit("close-drawer");
      }
    };

    const reset = () => {
      try {
        if (props.isEditing) {
          updateFarmersForm.value.resetFields();
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
            // const guardiansIds = student.value.guardians.map((el) => el.id);

            // await fetchFarmer({ "school.id": schoolId.value });
            // await fetchGuardians({
            //   "children.school.id": schoolId.value,
            //   id_in: guardiansIds,
            // });

            // await fetchClassrooms({ "school.id": schoolId.value });
            // await fetchGuardians({
            //   "children.school.id": schoolId.value,
            //   id_in: guardiansIds,
            // });
            console.log(farmer.value, "watching");

            // updateFormState.value = { ...farmer, id: farmer.id };
            updateFormState.value = {
              id: farmer.value.id,
              company_id: farmer.value.company_id,
              version: farmer.value.version,
              created_on: farmer.value.created_on,
              created_by: farmer.value.created_by,
              last_modified_on: farmer.value.last_modified_on,
              last_modified_by: farmer.value.last_modified_by,
              farmer_code: farmer.value.farmer_code,
              sale_agent_code: farmer.value.sale_agent_code,
              id_no: farmer.value.id_no,
              county: farmer.value.county,
              ward: farmer.value.ward,
              value_chaim: farmer.value.value_chaim,
              farm_size: farmer.value.farm_size,
              photo: farmer.value.photo,
              signature: farmer.value.signature,
              additional_fields: farmer.value.additional_fields,
              phone_number: farmer.value.phone_number,
              full_names: farmer.value.full_names,
              farmer_id: farmer.value.farmer_id,
              payment_method: farmer.value.payment_method,
              account_number: farmer.value.account_number,
              account_name: farmer.value.account_name,
              status: farmer.value.status,
              new: farmer.value.new,
            };
            console.log(updateFormState, "state");
          } else {
            formState.value = {
              sale_agent_code: "",
              id_no: "",
              phone_number: "",
              first_name: "",
              last_name: "",
              password: "",
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
      updateFarmersForm,
      rules,
      updateRules,
      formState,
      updateFormState,
      loading,
      submit,
      reset,
    };
  },
});
</script>
