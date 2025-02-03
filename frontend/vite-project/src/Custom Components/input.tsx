import React from 'react';
import './input.css';

interface InputProps {
  label: string;
  name: string;
  value: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label,name, value, type,onChange }) => {
  return (
    <div className="input-group">
      <label className="user-label">{label}</label>
      <input
        type={type}
        name = {name}
        value={value}
        onChange={onChange}
        className="input"
      />
    </div>
  );
};

export default Input;
