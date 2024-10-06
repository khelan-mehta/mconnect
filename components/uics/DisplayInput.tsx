import React from "react";

interface DisplayInputProps {
  text: string;
  classNames?: string;
  value: string | number;
  isTextArea?: boolean;
}

const DisplayInput: React.FC<DisplayInputProps> = ({
  text,
  classNames = "",
  value,
  isTextArea = false,
}) => {
  return (
    <div className={classNames}>
      <p className="text-[14px] font-bold mt-4">{text}</p>
      {isTextArea ? (
        <div className="px-5 min-h-[150px] py-3 max-h-[150px] bg-[#ecedfa] border-solid border-[1px] border-secondary-foreground text-[14px] rounded-md">
          {value ? value : `No ${text} Provided`}
        </div>
      ) : (
        <div className="px-5 h-[2.5rem] bg-[#ecedfa] border-solid border-[1px] border-secondary-foreground text-[14px] rounded-md flex items-center">
          {value ? value : `No ${text} Provided`}
        </div>
      )}
    </div>
  );
};

export default DisplayInput;
