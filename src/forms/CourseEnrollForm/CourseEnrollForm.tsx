import { useModal } from "../../components/contexts/modal/Modal.context";
import { useTranslation } from "next-i18next";
import React, { useReducer } from "react";
import { Enrollment } from "../../components/modals/Enrollment/Enrollment";
import { emailValidator, maxLengthValidator } from "../../utils/validation.utils";
import styles from "../ContactForm/ContactForm.module.css";
import { InputField, InputFieldVariant } from "../../components/general/InputField/InputField";
import { ButtonVariant, PrimaryButton } from "../../components/general/Button/Primary/PrimaryButton";
import {
  CourseEnrollFormFieldName,
  courseEnrollFormInitialState,
  courseEnrollFormReducer,
} from "./CourseEnrollForm.reducer";
import { FormFieldActionTypes } from "../../types/form.types";
import { useMutation } from "react-query";
import { enrollForCourse } from "../../services/course.services";
import { E164Number, isValidPhoneNumber } from "libphonenumber-js";
import { LoaderIcon } from "../../components/Loader/Loader";

export function CourseEnrollForm({ courseId }: { courseId: number }) {
  const { mutate, isLoading } = useMutation(enrollForCourse);
  const { provideModalSettings } = useModal();
  const { t: translation } = useTranslation("courses");
  const { t: commonTranslation } = useTranslation("common");

  const [enrollFormData, dispatch] = useReducer(courseEnrollFormReducer, courseEnrollFormInitialState);

  const isButtonActive = Object.values(enrollFormData).every((item) => item.value && !item.errorMessage);

  console.log({ enrollFormData });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataToSend = {
      name: enrollFormData.name.value,
      email: enrollFormData.email.value,
      region: enrollFormData.region.value,
      phone_number: enrollFormData.phone_number.value,
    };

    if (isButtonActive) {
      mutate(
        { ...dataToSend, id: courseId },
        {
          onSuccess: () => {
            dispatch({ type: FormFieldActionTypes.Reset });

            provideModalSettings({
              isShowing: true,
              content: <Enrollment />,
            });
          },
        }
      );
    }
  };

  const handleChange = (fieldName: CourseEnrollFormFieldName) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (fieldName === CourseEnrollFormFieldName.Email) {
      dispatch({
        fieldName,
        type: FormFieldActionTypes.Update,
        fieldData: { value, errorMessage: emailValidator(value) ? "" : String(commonTranslation("invalid-email")) },
      });
      return;
    }

    if ([CourseEnrollFormFieldName.Name, CourseEnrollFormFieldName.Region].includes(fieldName)) {
      dispatch({
        fieldName,
        type: FormFieldActionTypes.Update,
        fieldData: {
          value,
          errorMessage: maxLengthValidator(value, 64)
            ? ""
            : String(commonTranslation("string-max-length").replace("MAX", "64")),
        },
      });
      return;
    }

    dispatch({ type: FormFieldActionTypes.Update, fieldName, fieldData: { value } });
  };

  const handlePhoneNumber = (value: E164Number) => {
    dispatch({
      type: FormFieldActionTypes.Update,
      fieldName: CourseEnrollFormFieldName.PhoneNumber,
      fieldData: {
        value,
        errorMessage: !isValidPhoneNumber(value) ? String(commonTranslation("invalid-phone-number")) : "",
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formWrapper}>
      <p className={styles.formTitle}>{translation("course-enroll-form-title")}</p>

      <InputField
        value={enrollFormData.name.value}
        onChange={handleChange(CourseEnrollFormFieldName.Name)}
        placeholder={String(translation("course-enroll-form.name-placeholder"))}
        label={String(translation("course-enroll-form.name-label"))}
        type="text"
      />

      <InputField
        placeholder={String(translation("course-enroll-form.email-placeholder"))}
        label={String(translation("course-enroll-form.email-label"))}
        value={enrollFormData.email.value}
        errorMessage={enrollFormData.email.errorMessage}
        onChange={handleChange(CourseEnrollFormFieldName.Email)}
        type="text"
      />

      <InputField
        placeholder={String(translation("course-enroll-form.region-placeholder"))}
        label={String(translation("course-enroll-form.region-label"))}
        value={enrollFormData.region.value}
        errorMessage={enrollFormData.region.errorMessage}
        onChange={handleChange(CourseEnrollFormFieldName.Region)}
      />

      <InputField
        variant={InputFieldVariant.PhoneNumber}
        errorMessage={enrollFormData.phone_number.errorMessage}
        placeholder={String(translation("course-enroll-form.phone-number-placeholder"))}
        label={String(translation("course-enroll-form.phone-number-label"))}
        value={enrollFormData.phone_number.value}
        onChange={handlePhoneNumber}
      />

      <PrimaryButton
        variant={ButtonVariant.RegularOutline}
        className={styles.submit}
        active={isButtonActive}
        type="submit"
      >
        {translation("course-enroll-form.submit-button-text")} {isLoading && <LoaderIcon />}
      </PrimaryButton>
    </form>
  );
}
