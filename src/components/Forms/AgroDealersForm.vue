<template>
  <a-spin :spinning="loading">
    <a-form
      layout="vertical"
      ref="farmerLimitsForm"
      :rules="rules"
      :model="formState"
    >
      <a-form-item label="Type" name="type">
        <a-input v-model:value="formState.type" type="text" />
      </a-form-item>

      <a-form-item label="Name" name="name">
        <a-input v-model:value="formState.name" type="text" />
      </a-form-item>

      <a-form-item label="Legal Name" name="legal_name">
        <a-input v-model:value="formState.legal_name" type="text" />
      </a-form-item>

      <a-form-item label="Tax Number" name="tax_number">
        <a-input v-model:value="formState.tax_number" type="text" />
      </a-form-item>

      <a-form-item label="Email" name="email">
        <a-input v-model:value="formState.email" type="text" />
      </a-form-item>

      <a-form-item label="Phone Number" name="phone">
        <a-input v-model:value="formState.phone" type="text" />
      </a-form-item>

      <a-form-item label="Website" name="website">
        <a-input v-model:value="formState.website" type="text" />
      </a-form-item>

      <a-form-item label="Payment Terms" name="payment_terms_id">
        <a-input v-model:value="formState.payment_terms_id" type="text" />
      </a-form-item>

      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12">
          <a-form-item label="Account Name" name="accountName">
            <a-input v-model:value="formState.bank.account_name" type="text" />
          </a-form-item>
        </a-col>

        <a-col class="gutter-row" :span="12">
          <a-form-item label="Account Number" name="accountNumber">
            <a-input
              v-model:value="formState.bank.account_number"
              type="text"
            />
          </a-form-item>
        </a-col>

        <a-col class="gutter-row" :span="12">
          <a-form-item label="Bank Name" name="bankName">
            <a-input v-model:value="formState.bank.bank_name" type="text" />
          </a-form-item>
        </a-col>

        <a-col class="gutter-row" :span="12">
          <a-form-item label="Bank Branch" name="bankBranch">
            <a-input v-model:value="formState.bank.bank_branch" type="text" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item label="Swift Number" name="swiftNumber">
        <a-input v-model:value="formState.bank.swift_number" type="text" />
      </a-form-item>

      <a-form-item label="Country" name="country">
        <a-input v-model:value="formState.country" type="text" />
      </a-form-item>

      <a-form-item label="Address" name="address">
        <a-input v-model:value="formState.address" type="text" />
      </a-form-item>

      <a-form-item label="Notes" name="notes">
        <a-input v-model:value="formState.notes" type="text" />
      </a-form-item>

      <a-form-item label="Account Code" name="account_code">
        <a-input v-model:value="formState.account_code" type="text" />
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
import useConfigs from "@/composables/useConfigs";
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  name: "AgroDealersForm",

  props: {
    isEditing: {
      type: Boolean,
      required: true,
    },
  },

  emits: ["close-drawer"],

  setup(props, { emit }) {
    const { updateAgroDealer, createAgroDealer, loanProducts, agroDealer } =
      useAdmin();

    const { agrodealerCurrencies, fetchAgrodealerMeta } = useConfigs();

    const farmerLimitsForm = ref();

    const loading = ref<boolean>(false);

    const formState = ref({
      type: "",
      name: "",
      legal_name: "",
      tax_number: "",
      website: "",
      payment_terms_id: 0,
      bank: {
        account_name: "",
        account_number: "",
        bank_name: "",
        bank_branch: "",
        swift_number: "",
      },
      active: true,
      country: "",
      address: "",
      email: "",
      phone: "",
      status: "",
      notes: "",
      account_code: "",
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
          await updateAgroDealer({
            id: agroDealer.value.id,
            data: formState.value,
          });
        } else {
          await createAgroDealer(formState.value);
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
        await fetchAgrodealerMeta();
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
            console.log("chnnging");
            formState.value = {
              type: agroDealer.value.agrodealer_type,
              name: agroDealer.value.agrodealer_name,
              legal_name: agroDealer.value.legal_name,
              tax_number: agroDealer.value.tax_number,
              website: agroDealer.value.website,
              payment_terms_id: agroDealer.value.payment_terms?.id,
              bank: {
                account_name: agroDealer.value.bank_account?.account_name,
                account_number: agroDealer.value.bank_account?.account_number,
                bank_name: agroDealer.value.bank_account?.bank_name,
                bank_branch: agroDealer.value.bank_account?.bank_branch,
                swift_number: agroDealer.value.bank_account?.swift_number,
              },
              active: agroDealer.value.active,
              country: agroDealer.value.country,
              address: agroDealer.value.address,
              email: agroDealer.value.email,
              phone: agroDealer.value.phone_number,
              status: agroDealer.value.status,
              notes: agroDealer.value.notes,
              account_code: agroDealer.value.account.account_code,
            };
          } else {
            formState.value = {
              type: "",
              name: "",
              legal_name: "",
              tax_number: "",
              website: "",
              payment_terms_id: 0,
              bank: {
                account_name: "",
                account_number: "",
                bank_name: "",
                bank_branch: "",
                swift_number: "",
              },
              active: true,
              country: "",
              address: "",
              email: "",
              phone: "",
              status: "",
              notes: "",
              account_code: "",
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
      loanProducts,
      agrodealerCurrencies,
      submit,
      reset,
    };
  },
});
</script>
