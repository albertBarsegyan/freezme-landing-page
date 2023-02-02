import React, { useReducer } from "react";
import { ButtonVariant, PrimaryButton } from "../../components/general/Button/Primary/PrimaryButton";
import { useTranslation } from "next-i18next";
import { InputField, InputFieldVariant } from "../../components/general/InputField/InputField";
import styles from "./ContactForm.module.css";
import { useModal } from "../../components/contexts/modal/Modal.context";
import { Contacted } from "../../components/modals/Enrollment/Enrollment";
import { ContactFormFieldName, contactFormReducer, initialFormData } from "./ContactForm.reducer";
import { emailValidator, maxLengthValidator } from "../../utils/validation.utils";
import { FormFieldActionTypes } from "../../types/form.types";
import { useMutation } from "react-query";
import { sendContactMessage } from "../../services/contact.services";
import { LoaderIcon } from "../../components/Loader/Loader";

export function ContactForm() {
  const { provideModalSettings } = useModal();
  const { t: translation } = useTranslation("contact");
  const { t: commonTranslation } = useTranslation("common");
  const [contactFormData, dispatch] = useReducer(contactFormReducer, initialFormData);
  const { mutate, isLoading } = useMutation(sendContactMessage);

  const isButtonActive = Object.values(contactFormData).every(
    (fieldData) => fieldData.value && !fieldData.errorMessage
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: contactFormData.name.value,
      email: contactFormData.email.value,
      message: contactFormData.message.value,
    };

    if (isButtonActive && !isLoading) {
      mutate(data, {
        onSuccess: () => {
          dispatch({ type: FormFieldActionTypes.Reset });
          provideModalSettings({
            isShowing: true,
            content: <Contacted />,
          });
        },
      });
    }
  };

  const handleChange = (fieldName: ContactFormFieldName) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (fieldName === ContactFormFieldName.Email) {
      dispatch({
        fieldName,
        type: FormFieldActionTypes.Update,
        fieldData: { value, errorMessage: emailValidator(value) ? "" : String(commonTranslation("invalid-email")) },
      });
      return;
    }

    if (fieldName === ContactFormFieldName.Name) {
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

  return (
    <form onSubmit={handleSubmit} className={styles.formWrapper}>
      <p className={styles.formTitle}>{translation("contact-form-title")}</p>

      <InputField
        value={contactFormData.name.value}
        errorMessage={contactFormData.name.errorMessage}
        onChange={handleChange(ContactFormFieldName.Name)}
        placeholder={String(translation("contact-form-fields.name-placeholder"))}
        label={String(translation("contact-form-fields.name-label"))}
        type="text"
      />

      <InputField
        placeholder={String(translation("contact-form-fields.email-placeholder"))}
        label={String(translation("contact-form-fields.email-label"))}
        value={contactFormData.email.value}
        errorMessage={contactFormData.email.errorMessage}
        onChange={handleChange(ContactFormFieldName.Email)}
        type="text"
      />

      <InputField
        variant={InputFieldVariant.TextArea}
        placeholder={String(translation("contact-form-fields.message-placeholder"))}
        label={String(translation("contact-form-fields.message-label"))}
        value={contactFormData.message.value}
        onChange={handleChange(ContactFormFieldName.Message)}
      />

      <PrimaryButton
        variant={ButtonVariant.RegularOutline}
        className={styles.submit}
        active={isButtonActive}
        type="submit"
      >
        {translation("contact-form-fields.submit-button-text")} {isLoading && <LoaderIcon />}
      </PrimaryButton>
    </form>
  );
}
