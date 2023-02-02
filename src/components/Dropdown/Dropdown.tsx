import useOutsideClick from "../../hooks/useOutsideClick";
import { useRef, useState } from "react";
import styles from "src/components/Dropdown/Dropdown.module.css";
import { ButtonVariant, PrimaryButton } from "../general/Button/Primary/PrimaryButton";
import { ArrowIconDown } from "../../icons/Arrow.icon";

export interface DropdownType {
  id: number;
  content: string | JSX.Element;
  nameId: string;
}

interface DropdownProps {
  items: DropdownType[];
  defaultNameId?: string;
  handleChange: (item: DropdownType) => void;
}

const getItemById = (id: number, items: DropdownType[]): DropdownType =>
  items.find((item) => item.id === id) ?? items[0];

const getItemByNameId = (items: DropdownType[], nameId?: string): DropdownType =>
  items.find((item) => item.nameId === nameId) ?? items[0];

export function Dropdown({ items, defaultNameId, handleChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(getItemByNameId(items, defaultNameId) ?? items[0]);
  const dropdownRef = useRef(null);

  const handleDropdown = (id: number) => () => {
    const selectedItem = getItemById(id, items);
    setIsOpen(false);
    setSelectedItem(selectedItem);
    handleChange(selectedItem);
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div className={styles.dropdownWrapper} ref={dropdownRef}>
      <PrimaryButton variant={ButtonVariant.TextPrimary} handleClick={toggleDropdown} type="button">
        <div className={styles.buttonWrapper}>
          {selectedItem.content}
          <div style={{ marginLeft: "15.17px" }}>
            <ArrowIconDown />
          </div>
        </div>
      </PrimaryButton>

      {isOpen && (
        <div className={styles.dropdownListWrapper}>
          {items.map((item) => {
            if (item.id === selectedItem.id) return null;

            return (
              <PrimaryButton
                key={item.id}
                variant={ButtonVariant.TextPrimary}
                handleClick={handleDropdown(item.id)}
                type="button"
              >
                {item.content}
              </PrimaryButton>
            );
          })}
        </div>
      )}
    </div>
  );
}
