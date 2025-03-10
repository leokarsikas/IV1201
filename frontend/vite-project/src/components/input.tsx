import React from 'react';
import './input.css'; 

/**
 * Interface for the properties of the Input component.
 *
 * @interface InputProps
 * @property {string} name - The name attribute for the input field.
 * @property {any} value - The current value of the input field.
 * @property {string} type - The type of input (e.g., text, number, password).
 * @property {Function} onChange - Function to handle changes in the input field.
 * @property {string} placeholder - The placeholder text for the input field.
 * @property {string} borderRadius - The border radius of the input field (default is '99px').
 * @property {string} padding - The padding inside the input field (default is '10px').
 * @property {string} width - The width of the input field.
 * @property {string} color - The text color of the input field (default is 'black').
 * @property {string} step - The step value for number inputs.
 * @property {string} className - Additional CSS class for styling.
 * @property {string | number} min - The minimum value for number inputs.
 * @property {string} borderColor - The border color of the input field.
 */

interface InputProps {
  name: string;
  value: any;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  borderRadius?: string; 
  padding?: string; 
  width?: string;
  color?: string;
  step?: string;
  className?: string;
  min?: string | number;
  borderColor: string;
}

/**
 * Input Component
 *
 * A reusable input field component that supports multiple input types and customization options.
 *
 * @component
 * @param {InputProps} props - The properties passed to the component.
 * @returns The rendered input field.
 */

const Input: React.FC<InputProps> = ({
  name,
  value,
  type,
  step,
  className = '',
  onChange,
  placeholder = '', 
  borderRadius = '99px', 
  padding = '10px',
  width = "",
  color = "black",
  min,
  borderColor,
}) => {
  return (
    <div className={className != '' ?`${className}` : "input-group"}>
      <input
        type={type}
        name={name}
        step={step}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min = {min}
        style={{
          borderRadius,
          borderColor,
          padding,
          width,
          color
        }}
      />
    </div>
  );
};

export default Input;
