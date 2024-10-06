import React from "react";

interface InputComponentProps {
  text: string;
  classNames?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  value: string | number;
  placeholder: string;
  isTextArea?: boolean;
  isEditable?: boolean; // New prop for toggle editable state
}

const InputComponent: React.FC<InputComponentProps> = ({
  text,
  classNames,
  children,
  onClick,
  onChange,
  value,
  placeholder,
  isTextArea = false,
  isEditable = true, // Default to true (editable)
}) => {
  return (
    <div className={classNames}>
      <p className="text-[14px] font-bold mt-4">{text}</p>
      {isTextArea ? (
        <textarea
          className="px-5 min-h-[150px] py-3 max-h-[150px] placeholder:text-[black] rounded-md h-[2.5rem] bg-[#ecedfa] border-solid border-[1px] border-secondary-foreground text-[14px]"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onClick={onClick}
          rows={4}
          readOnly={!isEditable} // Conditionally apply readOnly
        />
      ) : (
        <input
          type="text"
          className="px-5  placeholder:text-[black] rounded-md h-[44px] min-h-[44px] bg-[#ecedfa] border-solid border-[1px] border-secondary-foreground text-[14px]"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onClick={onClick}
          readOnly={!isEditable} // Conditionally apply readOnly
        />
      )}
      {children}
    </div>
  );
};

export default InputComponent;
