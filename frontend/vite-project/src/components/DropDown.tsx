import React from "react";
import "./DropDown.css";

/**
 * Interface for the properties of the Dropdown component.
 *
 * @interface DropdownProps
 * @property {string} label - The label for the dropdown when no option is selected (default: "Välj roll").
 * @property {string} borderColor - The border color of the dropdown.
 * @property {string} color - The text color of the dropdown.
 * @property {string[]} options - The list of selectable options in the dropdown.
 * @property {Function} onSelect - Function to handle when an option is selected.
 * @property {string} value - The currently selected value (default: empty string).
 */

interface DropdownProps {
  label?: string;
  borderColor?: string;
  color?: string;
  options: string[];
  onSelect: (selectedRole: string) => void;
  value?: string;
}

/**
 * Dropdown Component
 *
 * A customizable dropdown component that allows users to select an option from a list.
 *
 * @component
 * @param {DropdownProps} props - The properties passed to the component.
 * @returns The rendered dropdown component.
 */

const Dropdown: React.FC<DropdownProps> = ({
  label = "Välj roll",
  options,
  borderColor,
  color,
  onSelect,
  value = "",
}) => {
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