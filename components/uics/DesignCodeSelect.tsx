import React, { useState } from "react";
import Select from "react-select";

// Define the design codes statically
const designCodes = [
  { label: "Traditional Traio", value: "1" },
  { label: "Shahi Nawabi", value: "2" },
  { label: "Shahi Jodhpuri", value: "3" },
  { label: "Royal Groom Wear", value: "4" },
  { label: "Classic Ethnic", value: "5" },
  { label: "Wedding For Mens", value: "6" },
  { label: "Suit", value: "7" },
];

// Interface for the component props
interface DesignCodeSelectProps {
  onDesignCodeSelect: (selectedDesignCode: string | null) => void;
}

// DesignCodeSelect Component
const DesignCodeSelect: React.FC<DesignCodeSelectProps> = ({
  onDesignCodeSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    value: string;
  } | null>(null);

  // Handle selection changes
  const handleChange = (
    selectedOption: { label: string; value: string } | null
  ) => {
    const formattedDesignCode = selectedOption
      ? selectedOption.label.toLowerCase().replace(/ /g, "-")
      : null;

    setSelectedOption(selectedOption);
    onDesignCodeSelect(formattedDesignCode);
  };

  return (
    <Select
      options={designCodes}
      value={selectedOption}
      onChange={handleChange}
      placeholder="Select a design code..."
      className="w-full"
    />
  );
};

export default DesignCodeSelect;
