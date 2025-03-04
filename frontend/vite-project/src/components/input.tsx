import React from 'react';
import './input.css'; 

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
}

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
        style={{
          borderRadius,
          padding,
          width,
          color
        }}
      />
    </div>
  );
};

export default Input;
