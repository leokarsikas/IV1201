import React from "react";
import "./DropDown.css";


interface DropdownProps {
  label?: string;
  borderColor?: string;
  color?: string;
  options: string[];
  onSelect: (selectedRole: string) => void;
  value?: string; // Add this prop to accept the current value from parent
}

const Dropdown: React.FC<DropdownProps> = ({
  label = "Välj roll",
  options,
  borderColor,
  color,
  onSelect,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onSelect) {
      onSelect(event.target.value);
    }
  };

  return (
    <div className="custom-select">
      <select style={{ borderColor: borderColor, color: color }} onChange={handleChange}>
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