import React from "react";

interface Order {
  _id: string;
  orderName: string;
  createdAt: string;
  createdBy: string;
  desc: string;
  imgUrl: string[];
  audioFileUrl: string;
  worker: string;
  workerRate: number;
  designCode: string;
  trackingCode: string;
  measurements: {
    upperBody: {
      chestSize: number;
      sleeveLength: number;
      shoulderWidth: number;
    };
    lowerBody: {
      waistSize: number;
      inseamLength: number;
    };
  };
  deleted: boolean;
  __v: number;
  isCompleted: boolean;
}

interface StatusIndicatorProps {
  order: Order;
  bgType: "primary" | "secondary";
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ order, bgType }) => {
  // Highlight conditions
  const isConfirmed = true; // Highlight Confirmed if worker exists
  const isWorking = isConfirmed && order.worker; // Highlight Working if worker exists and not completed
  const isCompleted = order.isCompleted; // Highlight Completed if order is completed

  // Determine the container class based on bgType
  const containerClass =
    bgType === "primary"
      ? "flex mt-8 gap-1 w-[95%] justify-center items-center"
      : "flex absolute top-2 left-2 gap-1 w-[95%] justify-center items-center";

  return (
    <div className={containerClass}>
      {/* Confirmed */}
      <div
        className={`w-[15%] self-center border-[1px] h-0 border-primary border-dashed ${
          isConfirmed ? "text-primary font-bold" : "text-black"
        }`}
      ></div>
      <p
        className={`self-center text-[8px] ${
          isConfirmed ? "text-primary font-bold" : "text-black"
        }`}
      >
        Confirmed
      </p>

      {/* Working */}
      <div
        className={`w-[15%] self-center border-[1px] h-0 border-primary border-dashed ${
          isWorking ? "text-primary font-bold" : "text-black"
        }`}
      ></div>
      <p
        className={`self-center text-[8px] ${
          isWorking ? "text-primary font-bold" : "text-black"
        }`}
      >
        Working
      </p>

      {/* Completed */}
      <div
        className={`w-[15%] self-center border-[1px] h-0 border-primary border-dashed ${
          isCompleted ? "text-primary font-bold" : "text-black"
        }`}
      ></div>
      <p
        className={`self-center text-[8px] ${
          isCompleted ? "text-primary font-bold" : "text-black"
        }`}
      >
        Completed
      </p>

      {/* Last segment without any text */}
      <div className="w-[15%] self-center border-[1px] h-0 border-primary border-dashed"></div>
    </div>
  );
};

export default StatusIndicator;
