import { Dropdown, DropdownType } from "../Dropdown/Dropdown";
import { useRouter } from "next/router";
import React from "react";
import { ArmeniaIcon, EnglandIcon, RussiaIcon } from "../../icons/Flags.icon";

const LanguageItemRenderer = ({ Icon, text }: { Icon: () => JSX.Element; text: string }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Icon />
      <span style={{ marginLeft: "8px" }}>{text}</span>
    </div>
  );
};

export const LocaleDropdownList: DropdownType[] = [
  {
    id: 0,
    content: <LanguageItemRenderer Icon={EnglandIcon} text={"Eng"} />,
    nameId: "en_us",
  },
  {
    id: 1,
    content: <LanguageItemRenderer Icon={RussiaIcon} text={"Ru"} />,
    nameId: "ru",
  },
  {
    id: 2,
    content: <LanguageItemRenderer Icon={ArmeniaIcon} text={"Arm"} />,
    nameId: "hy",
  },
];

export function LanguageSelector() {
  const router = useRouter();

  const { pathname, query, asPath, locale } = router;

  const handleChangeLocale = (dropdownItem: DropdownType) => {
    router.push({ pathname, query }, asPath, { locale: dropdownItem.nameId });
  };

  return <Dropdown defaultNameId={locale} items={LocaleDropdownList} handleChange={handleChangeLocale} />;
}
