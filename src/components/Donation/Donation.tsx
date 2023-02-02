import { PrimaryButton } from "../general/Button/Primary/PrimaryButton";

import { useTranslation } from "next-i18next";

const params: { [key: string]: string } = {
  cmd: process.env.NEXT_PUBLIC_PAYPAL_CMD ?? "",
  bn: process.env.NEXT_PUBLIC_PAYPAL_BN ?? "",
  business: process.env.NEXT_PUBLIC_PAYPAL_BUSINESS ?? "",
  return: process.env.NEXT_PUBLIC_PAYPAL_RETURN ?? "",
  item_number: process.env.NEXT_PUBLIC_PAYPAL_ITEM_NUMBER ?? "",
  rm: process.env.NEXT_PUBLIC_PAYPAL_RM ?? "",
  currency_code: process.env.NEXT_PUBLIC_PAYPAL_CURRENCY_CODE ?? "",
};

export function Donation() {
  const { t: translation } = useTranslation("common");

  const handleDonation = () => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = process.env.NEXT_PUBLIC_PAYPAL_URL ?? "";
    form.target = "_blank";
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const hiddenField = document.createElement("input");
        hiddenField.type = "hidden";
        hiddenField.name = key;
        hiddenField.value = params[key];
        form.appendChild(hiddenField);
      }
    }
    document.body.appendChild(form);
    form.submit();
  };

  return <PrimaryButton handleClick={handleDonation}>{translation("donation-button-title")}</PrimaryButton>;
}
