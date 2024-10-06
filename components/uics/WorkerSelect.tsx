import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { BASE_URL } from "../../app/env";
export interface Worker {
  _id: string; // Unique identifier for the worker
  mobileNo: number; // Mobile number of the worker
  workerName: {
    first: string; // First name of the worker
    last: string; // Last name of the worker
  };
  deviceId: string; // Unique device ID for the worker
  isDeleted: boolean; // Status indicating if the worker is deleted
  password: string; // Password hash for the worker (ensure to handle securely)
  token: string; // Authentication token
  isSuspended: boolean; // Status indicating if the worker is suspended
  isMaster: boolean; // Status indicating if the worker is a master
  totalOrders: number; // Number of orders assigned to the worker
  isVerified: boolean; // Status indicating if the worker is verified
  __v: number; // Version key for the schema (used by MongoDB)
} // Assuming Worker interface is in interfaces/Worker.ts

interface WorkerSelectProps {
  onWorkerSelect: any; // Use the Worker type for better type safety
  defaultWorkerId?: string; // Optional prop for default worker ID
}

const WorkerSelect: React.FC<WorkerSelectProps> = ({
  onWorkerSelect,
  defaultWorkerId,
}) => {
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    value: string;
  } | null>(null);

  useEffect(() => {
    // Fetch workers from the API
    const fetchWorkers = async () => {
      try {
        const response = await axios.get<Worker[]>(`${BASE_URL}/workers`);
        console.log("API Response:", response.data); // Debug: Check API response

        const workerOptions = response.data
          .filter((worker) => !worker.isDeleted) // Exclude deleted workers
          .map((worker) => ({
            label: `${worker.workerName.first} ${worker.workerName.last}`,
            value: worker._id,
          }));

        console.log("Worker Options:", workerOptions); // Debug: Check options array
        setOptions(workerOptions);

        // If defaultWorkerId is provided, find the matching worker
        if (defaultWorkerId) {
          const defaultOption = workerOptions.find(
            (worker) => worker.value === defaultWorkerId
          );

          if (defaultOption) {
            setSelectedOption(defaultOption);
            handleWorkerSelection(defaultOption); // Trigger selection for the default worker
          }
        }
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    fetchWorkers();
  }, [defaultWorkerId]);

  const handleWorkerSelection = (
    option: { label: string; value: string } | null
  ) => {
    const worker = option
      ? {
          _id: option.value,
          workerName: {
            first: option.label.split(" ")[0],
            last: option.label.split(" ")[1],
          },
          deviceId: option.value,
          mobileNo: 0, // Or fetch this data if available
          isDeleted: false,
          password: "", // Or fetch this data if needed
          token: "", // Or fetch this data if needed
          isSuspended: false, // Or fetch this data if needed
          isMaster: false, // Or fetch this data if needed
          totalOrders: 0, // Or fetch this data if needed
          isVerified: true, // Or fetch this data if needed
          __v: 0, // Or fetch this data if needed
        }
      : null;

    setSelectedOption(option);
    onWorkerSelect(worker);
  };

  const handleChange = (
    selectedOption: { label: string; value: string } | null
  ) => {
    handleWorkerSelection(selectedOption);
  };

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={handleChange}
      placeholder="Select a worker..."
      className="w-full"
    />
  );
};

export default WorkerSelect;
