import React, { FC, ReactNode, MouseEvent } from "react";
import Link from "next/link"; // Using Next.js Link component
import { LucideIcon } from "lucide-react"; // Adjust the import based on your icon usage

interface LinkButtonProps {
  className?: string;
  children: ReactNode;
  bgPrimary?: boolean;
  link?: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  icon?: LucideIcon;
  disabled?: boolean;
}

const LinkButton: FC<LinkButtonProps> = ({
  className = "",
  children,
  bgPrimary = false,
  link = "",
  onClick = () => {},
  icon: Icon,
  disabled = false,
}) => {
  const buttonClass = `flex items-center px-2 py-3  rounded-md justify-around items-center ${
    bgPrimary ? "bg-primary" : ""
  } ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick(event);
  };

  const content = (
    <div className={buttonClass} onClick={handleClick}>
      {Icon && <Icon className="mr-2" />} {/* Adjust margin as needed */}
      {children}
    </div>
  );

  return link && !disabled ? <Link href={link}>{content}</Link> : content;
};

export default LinkButton;
