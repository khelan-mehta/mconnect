import React, { FC, useState } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";
import { LucideIcon } from "lucide-react";

interface DateInputProps {
  value: Date | undefined;
  setValue: (value: Date) => void;
  label?: string;
  icon?: LucideIcon;
  inputClassName?: string;
  buttonClassName?: string;
  variant: "primary" | "secondary";
}

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
};

const DateInput: FC<DateInputProps> = ({
  value,
  setValue,
  label,
  icon: Icon,
  inputClassName = "",
  buttonClassName = "",
  variant,
}) => {
  const [inputValue, setInputValue] = useState(value ? formatDate(value) : "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const parsedDate = new Date(e.target.value);
    if (!isNaN(parsedDate.getTime())) {
      setValue(parsedDate);
    }
  };

  const isPrimary = variant === "primary";

  return (
    <div className="flex flex-col mb-4 w-[300px]">
      {label && <label className="text-[14px] font-bold mb-2">{label}</label>}
      <div className="flex items-center border-solid border-[1px] rounded-[5px]">
        <input
          type="text"
          placeholder={value?.toDateString() || "Select Date"}
          value={inputValue}
          onChange={handleInputChange}
          className={classNames(
            "p-2 placeholder-black px-4 rounded-l-[5px] w-[98%] focus:outline-none h-[54px]",
            inputClassName,
            isPrimary
              ? "border-primary text-black"
              : "bg-[#ecedfa] text-black border-solid border-[1px] border-secondary"
          )}
        />
        <button
          className={classNames(
            "self-center rounded-r-[5px] border-l-[1.5px] border-solid h-[54px] flex justify-center items-center w-[55px]",
            buttonClassName,
            isPrimary
              ? "border-primary bg-white"
              : "border-secondary  border-solid border-[1px] text-secondary bg-[#ecedfa]"
          )}
        >
          {Icon && (
            <motion.div whileTap={{ scale: 1.2 }}>
              <Icon className={isPrimary ? "text-primary" : "text-secondary"} />
            </motion.div>
          )}
        </button>
      </div>
    </div>
  );
};

export default DateInput;
