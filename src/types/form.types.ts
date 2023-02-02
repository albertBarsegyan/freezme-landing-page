export interface FieldState {
  value: string;
  errorMessage: string;
}

export const enum FormFieldActionTypes {
  Update = "Update",
  Reset = "Reset",
}
