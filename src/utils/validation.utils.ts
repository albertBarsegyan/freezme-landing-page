import { RegexConstants } from "../constants/regex.constants";

export const emailValidator = (value: string) => {
  return Boolean(value.match(RegexConstants.Email) && value.length <= 256);
};

export const maxLengthValidator = (value: string, maxLength: number) => {
  return value.length <= maxLength;
};
