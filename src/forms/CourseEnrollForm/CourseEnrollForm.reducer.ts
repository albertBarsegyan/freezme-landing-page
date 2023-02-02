import { FieldState, FormFieldActionTypes } from "../../types/form.types";

export interface CourseEnrollFormState {
  name: FieldState;
  email: FieldState;
  region: FieldState;
  phone_number: FieldState;
}

export type CourseEnrollRequestData = Record<keyof CourseEnrollFormState, string>;

export const enum CourseEnrollFormFieldName {
  Name = "Name",
  Email = "Email",
  Region = "Region",
  PhoneNumber = "PhoneNumber",
}

export const setInitialData = () => {
  return { value: "", errorMessage: "" };
};

export const courseEnrollFormInitialState: CourseEnrollFormState = {
  name: setInitialData(),
  email: setInitialData(),
  region: setInitialData(),
  phone_number: setInitialData(),
};

export interface ContactFormAction {
  type: FormFieldActionTypes;
  fieldName?: CourseEnrollFormFieldName;
  fieldData?: {
    value?: string;
    errorMessage?: string;
  };
}

export function courseEnrollFormReducer(
  state: CourseEnrollFormState,
  action: ContactFormAction
): CourseEnrollFormState {
  switch (action.type) {
    case FormFieldActionTypes.Update:
      switch (action.fieldName) {
        case CourseEnrollFormFieldName.Name:
          return {
            ...state,
            name: { ...state.name, ...action.fieldData },
          };
        case CourseEnrollFormFieldName.Email:
          return {
            ...state,
            email: { ...state.email, ...action.fieldData },
          };
        case CourseEnrollFormFieldName.Region:
          return {
            ...state,
            region: { ...state.region, ...action.fieldData },
          };
        case CourseEnrollFormFieldName.PhoneNumber:
          return {
            ...state,
            phone_number: { ...state.phone_number, ...action.fieldData },
          };

        default:
          return {
            ...state,
            name: { ...state.name, ...action.fieldData },
          };
      }

    case FormFieldActionTypes.Reset:
      return courseEnrollFormInitialState;
    default:
      return courseEnrollFormInitialState;
  }
}
