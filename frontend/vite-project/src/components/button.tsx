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
  disabled?: boolean;
  border?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = 'button',
  onClick,
  fontWeight = "600",
  borderRadius = '5px',
  padding = '10px 20px',
  className = '',
  fontSize = "16px",
  disabled = false,
  border = "none",
}) => {  

  return (
    <button
      className={`custom-button ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
      style={{
        fontWeight,
        borderRadius,
        padding,
        border,
        cursor: 'pointer',
        fontSize,
     
      }}
    >
      {text}
    </button>
  );
};

export default Button;
