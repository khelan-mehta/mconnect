import React from "react";

interface ProgressBarProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  setCurrentStep,
}) => {
  const steps = ["Step 1", "Step 2", "Step 3"];
  const totalSteps = steps.length;
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100; // Calculate the percentage for filled width

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col  items-center mb-8 w-[80vw]">
        <div className="relative w-full h-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-primary transition-all duration-300 ease-in-out"
            style={{ width: `${progressPercentage}%` }} // Dynamically set width based on progress
          />
        </div>
        <div className="flex justify-between items-center mt-4 w-full ">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setCurrentStep(index + 1)}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === index + 1
                    ? "bg-primary text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {index + 1}
              </div>
              <span className="text-sm mt-2">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
