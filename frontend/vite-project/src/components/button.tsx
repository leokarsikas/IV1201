import React from 'react';

/**
 * Interface defining the properties for the Button component.
 *
 * @interface ButtonProps
 * @property {string} text - The text to be displayed on the button.
 * @property {"button" | "submit" | "reset"} type - The button type.
 * @property {void} onClick - Optional click event handler.
 * @property {string} fontWeight - The font weight of the button text.
 * @property {string} borderRadius - The border-radius of the button.
 * @property {string} padding - The padding inside the button.
 * @property {string} className - Additional CSS classes for styling.
 * @property {string} fontSize - The font size of the button text.
 * @property {boolean} disabled - Whether the button is disabled.
 * @property {string} border - The border style of the button.
 */

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

/**
 * Button Component
 *
 * A reusable button component with customizable styles and behavior.
 *
 * @component
 * @param {ButtonProps} props - The properties passed to the component.
 * @returns The rendered button element.
 */

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
      className={`${className}`}
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
