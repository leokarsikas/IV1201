import React from 'react';

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void; 
  fontWeight?: string;
  borderRadius?: string; 
  padding?: string;
  className?: string;
  fontSize?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = 'button',
  onClick,
  fontWeight = "600",
  borderRadius = '5px',
  padding = '10px 20px',
  className = '',
  fontSize = "16px"
}) => {
  return (
    <button
      className={`custom-button ${className}`}
      onClick={onClick}
      type={type}
      style={{
        fontWeight,
        borderRadius,
        padding,
        border: 'none',
        cursor: 'pointer',
        fontSize,
      }}
    >
      {text}
    </button>
  );
};

export default Button;
