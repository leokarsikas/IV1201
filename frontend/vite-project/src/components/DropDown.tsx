import React from "react";
import "./DropDown.css";
interface DropdownsProps {
  options: string[];
  onSelect: (selectedRole: string) => void;
  value?: string; // Add this prop to accept the current value from parent
}

function RoleDropdown({
  options,
  onSelect,
  value = "",
}: DropdownsProps) {
  // Use the passed value prop to control the dropdown state
  // This ensures the dropdown shows the correct value after page reload

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.target.value);
  };

  return (
    <select
      value={value} // Use the value directly from props instead of local state
      onChange={handleChange}
      className="custom-select"
    >
      <option value="" disabled>
        Välj roll
      </option>
      {options.map((role) => (
        <option key={role} value={role}>
          {role}
        </option>
      ))}
    </select>
  );
}

export default RoleDropdown;