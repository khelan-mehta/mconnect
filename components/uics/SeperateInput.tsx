import React, { FC } from "react";
import classNames from "classnames"; // Ensure you have this package installed
import { LucideIcon } from "lucide-react"; // Adjust the import based on your icon usage
import { motion } from "framer-motion"; // Ensure you have this package installed

interface SeparateInputProps {
  value: string | undefined;
  setValue: (value: string) => void;
  variant: "primary" | "secondary";
  datePicker?: Date;
  text?: string;
  label?: string; // Add label option
  icon?: LucideIcon; // Icon component for primary variant
  buttonIcon?: LucideIcon; // Icon component for secondary variant
  inputClassName?: string; // Custom class name for input
  buttonClassName?: string; // Custom class name for button
  placeholder?: string; // Placeholder text for input
  inputType?: string; // Type for input element
}

const SeparateInput: FC<SeparateInputProps> = ({
  value,
  setValue,
  variant,
  datePicker = false,
  text = "",
  label, // Add label prop
  inputClassName = "",
  buttonClassName = "",
  placeholder = "",
  inputType = "text",
}) => {
  const isPrimary = variant === "primary";

  return (
    <div className="flex flex-col mb-4 w-full">
      {label && <label className="text-[14px] font-bold mb-2">{label}</label>}
      <div className="">
        {isPrimary ? (
          <div className="flex items-center border-primary border-solid border-[1px] rounded-[5px]">
            <input
              type={inputType}
              placeholder={placeholder}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={classNames(
                "p-2  placeholder-primary rounded-[5px] focus:outline-none h-[54px] min-h-[54px]",
                inputClassName
              )}
            />
          </div>
        ) : (
          <div className="flex w-full bg-secondary-foreground border-[1px] border-solid rounded-[5px] border-secondary">
            <input
              type={inputType}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={classNames(
                "w-full flex rounded-[5px] p-2 outline-none focus:outline bg-secondary-foreground justify-center items-center font-normal h-[8vh] border-solid",

                inputClassName
              )}
              placeholder={placeholder}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SeparateInput;
