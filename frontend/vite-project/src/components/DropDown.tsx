import React from "react";
import "./DropDown.css";
import { useTranslation } from 'react-i18next';

interface DropdownProps {
  label?: string;
  borderColor?: string;
  color?: string;
  options: string[];
  onSelect: (selectedRole: string) => void;
  value?: string;
}
const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  borderColor,
  color,
  onSelect,
  value = "",
}) => {
  const { t } = useTranslation();
  label = label ?? t("choose-role");
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onSelect) {
      onSelect(event.target.value);
    }
  };

  return (
    <div className="custom-select">
      <select value={value} style={{ borderColor: borderColor, color: color }} onChange={handleChange}>
        <option value="">{label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;