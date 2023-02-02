import React from "react";
import styles from "./InputField.module.css";
import PhoneInput from "react-phone-number-input/input";

export const enum InputFieldVariant {
  Regular = "Regular",
  PhoneNumber = "PhoneNumber",
  TextArea = "TextArea",
}

interface InputFieldProps {
  onChange: (e: any) => void;
  placeholder?: string;
  value: string;
  variant?: InputFieldVariant;
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  errorMessage?: string;
}

export function InputField({
  onChange,
  variant = InputFieldVariant.Regular,
  errorMessage,
  value,
  placeholder,
  label,
  type = "text",
}: InputFieldProps) {
  return (
    <div className={styles.inputFieldWrapper}>
      {label && <span className={styles.label}>{label}</span>}
      {errorMessage && <span className={styles.errorText}>{errorMessage}</span>}

      {(() => {
        switch (variant) {
          case InputFieldVariant.TextArea:
            return (
              <textarea className={styles.inputField} value={value} onChange={onChange} placeholder={placeholder} />
            );
          case InputFieldVariant.Regular:
            return (
              <input
                className={styles.inputField}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
              />
            );
          case InputFieldVariant.PhoneNumber:
            return (
              <PhoneInput value={value} placeholder={placeholder} className={styles.inputField} onChange={onChange} />
            );
        }
      })()}
    </div>
  );
}
