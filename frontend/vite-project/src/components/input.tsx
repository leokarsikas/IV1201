import React from 'react';
import './input.css'; 

interface InputProps {
  name: string;
  value: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  borderRadius?: string; 
  padding?: string; 
  width?: string;
  color?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  value,
  type,
  onChange,
  placeholder = '', 
  borderRadius = '99px', 
  padding = '10px',
  width = "300px",
  color = "black",
}) => {
  return (
    <div className="input-group">
      <input
        type={type}
        name={name}
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
