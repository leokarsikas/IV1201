import React from "react";
import "./CustomDateInput.css";

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
