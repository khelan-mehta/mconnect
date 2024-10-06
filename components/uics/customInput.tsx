import React from "react";
import { IconType } from "react-icons"; // If using react-icons or similar

interface InputProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isActive: boolean;
  icon?: IconType; // Use IconType for react-icons
}

const InputField: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  isActive,
  icon: Icon,
}) => {
  return (
    <div className="my-1">
      {label && (
        <label className="flex text-black text-[14px] font-bold mb-2">
          {label}
        </label>
      )}
      <div
        className={`flex items-center px-3 py-2 border rounded-[5px] ${
          isActive ? "border-primary" : "border-secondary-foreground"
        }`}
      >
        {Icon && (
          <div className="p-2">
            <Icon className="text-green-500" />
          </div>
        )}
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 h-[44px] min-h-[44px] outline-none border-none bg-transparent text-black placeholder-gray-500"
        />
      </div>
    </div>
  );
};

export default InputField;
