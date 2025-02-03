import React, { useEffect, useState } from 'react';
import './input.css';

interface InputProps {
    label: string;
}

const Input: React.FC<InputProps> = ({label}) => {

  return (
    <div className="input-group">
    <label className="user-label">{label}</label>
    <input type="text" name="text" className="input"></input>
  </div>
  );
}

export default Input;