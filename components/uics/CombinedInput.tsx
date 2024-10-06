import React, { FC } from "react";
import classNames from "classnames";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface CombinedInputProps {
  value: string | undefined;
  setValue: (value: string) => void;
  variant: "primary" | "secondary";
  text?: string;
  label?: string;
  icon?: LucideIcon;
  buttonIcon?: LucideIcon;
  inputClassName?: string;
  buttonClassName?: string;
  placeholder?: string;
  inputType?: string;
}

const CombinedInput: FC<CombinedInputProps> = ({
  value,
  setValue,
  variant,
  text = "",
  label,
  icon: Icon,
  buttonIcon: ButtonIcon,
  inputClassName = "",
  buttonClassName = "",
  placeholder = "",
  inputType = "text",
}) => {
  const isPrimary = variant === "primary";

  return (
    <div className="flex flex-col w-full">
      {label && <label className="text-[14px] font-bold mb-2">{label}</label>}
      <div>
        {isPrimary ? (
          <div className="flex items-center border-primary border-solid border-[1px] rounded-[5px]">
            <input
              type={inputType}
              placeholder={placeholder}
              value={value || ""}
              onChange={(e) => setValue(e.target.value)}
              className={classNames(
                "px-4 py-2 placeholder-black text-black rounded-l-[5px] w-[90%] focus:outline-none h-[54px] min-h-[54px]",
                inputClassName
              )}
            />
            <button
              className={classNames(
                "self-center rounded-r-[5px] border-l-[1.5px] border-primary border-solid min-h-[54px] flex justify-center items-center bg-white w-[55px]",
                buttonClassName
              )}
            >
              {Icon && (
                <motion.div whileTap={{ scale: 1.2 }}>
                  <Icon className="text-primary" />
                </motion.div>
              )}
            </button>
          </div>
        ) : (
          <div className="flex w-full bg-secondary-foreground border-[1px] border-solid rounded-[5px] border-secondary">
            <input
              type={inputType}
              value={value || ""}
              onChange={(e) => setValue(e.target.value)}
              className={classNames(
                "w-full flex rounded-l-[5px] p-2 outline-none bg-secondary-foreground justify-center items-center font-normal min-h-[8vh] border-solid",
                inputClassName
              )}
              placeholder={placeholder}
            />
            <button
              className={classNames(
                "self-center rounded-r-[5px] border-l-[1.5px] border-secondary border-solid min-h-[8vh] flex justify-center items-center bg-secondary-foreground w-[55px]",
                buttonClassName
              )}
            >
              {ButtonIcon && (
                <motion.div whileTap={{ scale: 1.2 }}>
                  <ButtonIcon className="text-secondary" />
                </motion.div>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CombinedInput;
