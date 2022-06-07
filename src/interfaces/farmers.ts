export interface IFarmer {
  id: number;
  company_id: string;
  version: number;
  created_on: string;
  created_by: string;
  last_modified_on: string;
  last_modified_by: string;
  farmer_code: string;
  sale_agent_code: string;
  id_no: string;
  county: string;
  ward: string;
  value_chaim: string;
  farm_size: string;
  photo: string;
  signature: string;
  additional_fields: string;
  phone_number: string;
  full_names: string;
  farmer_id: string;
  payment_method: string;
  // payment_method: "MPESA" | "CASH" | "BANK";
  account_number: string;
  account_name: string;
  status: string;
  // | "PENDING_REGISTRATION"
  // | "REGISTERED"
  // | "ACTIVE"
  // | "PENDING"
  // | "DEACTIVATED"
  // | "DORMANT";
  new: boolean;
}

// columns added
export interface IFarmerDGResponse extends IFarmer {
  activation_stage: string;
  // | "PENDING_REGISTRATION"
  // | "SELF_REGISTRATION"
  // | "BRANCH_ACCOUNT"
  // | "CONVETIONAL_ACCOUNT";
  deposit_limit?: number;
  loan_limit?: number;
  email_validation?: number;
  crb_validation?: number;
  phone_number_validation?: number;
  phone_number_ownership_validation?: number;
  iprs_validation?: number;
  imsi_validation?: number;
  nip?: number;
  login_attempts?: number;
}

export interface IFarmerRegistration {
  sale_agent_code: string;
  id_no: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  password: string;
}
