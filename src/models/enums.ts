export enum Gender {
  Male = "Male",
  Female = "Female",
}

export enum TreatmentLocation {
  OR = "OR",
  Bedside = "Bedside",
  ICU_CCU = "ICU_CCU",
  ER = "ER",
  Multi_Tx_Room = "Multi_Tx_Room",
}

export enum CompletionStatus {
  InProgress = "InProgress",
  Completed = "Completed",
  Abandoned = "Abandoned",
}

export enum ActionType {
  Create = "Create",
  Update = "Update",
  Delete = "Delete",
  View = "View",
  Login = "Login",
  Logout = "Logout",
}

export enum UserRole {
  Nurse = "Nurse",
  Admin = "Admin",
}

export enum HBsAgStatus {
  Positive = "Positive",
  Negative = "Negative",
  Unknown = "Unknown",
}

export enum SourceType {
  Hospital = "Hospital",
  DavitaPatientPortal = "DavitaPatientPortal",
  NonDavitaSource = "NonDavitaSource",
}
