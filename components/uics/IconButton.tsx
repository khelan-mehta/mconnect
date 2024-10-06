import React from "react";

interface IconButtonProps {
  icon?: React.ElementType;
  text: string;
  onClick?: () => void; // Optional onClick handler
  variant?: string; // Optional variant for background color
  width?: string; // Optional width
  height?: string; // Optional height
  disabled?: boolean; // Optional disabled state
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  text,
  onClick,
  variant = "primary",
  width = "",
  height,
  disabled = false,
}) => {
  return (
    <button
      className={`flex h-[54px] min-h-[54px] justify-center shadow-xl items-center px-5 w-full py-3 rounded-sm ${
        disabled ? `bg-accent  cursor-not-allowed` : `bg-${variant}`
      }`}
      onClick={onClick}
      style={{ width, height }}
      disabled={disabled}
    >
      <div className="flex items-center justify-center w-full">
        {Icon && <Icon className="text-white" />}
        <div className="text-white shadow-custom font-semibold self-center text-right ml-[9.17px] text-sm leading-[normal] capitalize">
          {text}
        </div>
      </div>
    </button>
  );
};

export default IconButton;
