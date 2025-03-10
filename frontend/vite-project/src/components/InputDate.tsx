import React from "react";
import "./CustomDateInput.css";

/**
 * Interface for the properties of the CustomDateInput component.
 *
 * @interface CustomDateInputProps
 * @property {string} placeholder - The placeholder text for the input field.
 * @property {string} name - The name attribute of the input field.
 * @property {string | Date} value - The selected date, either as a string (formatted) or a Date object.
 * @property {Function} onChange - The function to handle input change events.
 * @property {boolean} required - Whether the field is required (default is false).
 * @property {string} min - The minimum allowed date (YYYY-MM-DD format).
 * @property {string} max- The maximum allowed date (YYYY-MM-DD format).
 * @property {string} borderColor - The border color of the input field.
 */

interface CustomDateInputProps {
  placeholder: string;  
  name: string;
  value: string | Date;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: string;
  max?: string;
  borderColor?: string;
}

/**
 * CustomDateInput Component
 *
 * A reusable date input field that allows users to select a date within an optional range.
 * The component ensures correct formatting of date values and provides additional styling options.
 *
 * @component
 * @param {CustomDateInputProps} props - The properties passed to the component.
 * @returns The rendered date input field.
 */

const CustomDateInput: React.FC<CustomDateInputProps> = ({
  placeholder,
  name,
  value,
  onChange,
  required = false,
  min,
  max,
  borderColor,
}) => {
  return (
    <div className="date-input-container">
      <input
        placeholder={placeholder}
        type="date"
        name={name}
        value={typeof value === "string" ? value : value.toISOString().split("T")[0]}
        onChange={onChange}
        required={required}
        min={min}
        max={max}
        className="custom-date-input"
        style={{ borderColor }} 
      />
    </div>
  );
};

export default CustomDateInput;
