import { Plus, Trash } from "lucide-react";
import React, { useState, ChangeEvent } from "react";

interface Measurement {
  [key: string]: number | string;
}

interface MeasurementsTableProps {
  measurements?: Measurement;
  onMeasurementChange?: any;
  onAddMeasurement?: (key: string, value: number) => void;
  onDeleteMeasurement?: (key: string) => void;
  editable?: boolean;
}

const ManagersTable: React.FC<MeasurementsTableProps> = ({
  measurements,
  onMeasurementChange,
  onAddMeasurement,
  onDeleteMeasurement,
  editable,
}) => {
  const [newMeasurementKey, setNewMeasurementKey] = useState<string>("");
  const [newMeasurementValue, setNewMeasurementValue] = useState<number>(0);
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  const handleMeasurementChange = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value);
    if (onMeasurementChange) {
      onMeasurementChange(key, value);
    }
  };

  const handleAddMeasurement = () => {
    if (newMeasurementKey && !isNaN(newMeasurementValue)) {
      if (onAddMeasurement) {
        onAddMeasurement(newMeasurementKey, newMeasurementValue);
      }
      setNewMeasurementKey("");
      setNewMeasurementValue(0);
    }
  };

  const handleDeleteMeasurement = (key: string) => {
    if (onDeleteMeasurement) {
      onDeleteMeasurement(key);
    }
  };

  const toggleExpand = (key: string) => {
    setExpandedKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  return (
    <div className="p-0  text-[14px]">
      <div className="overflow-x-auto">
        <table className="border w-full border-dashed border-secondary">
          <tbody>
            {Object.entries(measurements || {}).map(([key, value]) => {
              const isExpanded = expandedKeys.has(key);
              const displayValue =
                typeof value === "string" && value.length > 15 && !isExpanded
                  ? `${value.substring(0, 10)}...`
                  : value;

              return (
                <tr
                  key={key}
                  className="border-2 mt-22  border-dashed border-primary"
                >
                  <td className="py-7 px-4 text-left">
                    <span className="font-semibold">{key}</span>
                  </td>
                  <td className="py-2 px-4 text-right">
                    {editable ? (
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => handleMeasurementChange(key, e)}
                        className="w-1/2 px-2 py-1 border border-secondary focus:outline-none rounded"
                      />
                    ) : (
                      <span
                        className="text-primary font-medium cursor-pointer"
                        onClick={() => toggleExpand(key)}
                        title={typeof value === "string" ? value : undefined}
                      >
                        {displayValue}
                      </span>
                    )}
                  </td>
                  {editable && (
                    <td className="py-2 px-4 text-center">
                      <button
                        onClick={() => handleDeleteMeasurement(key)}
                        className="text-primary self-center mt-1"
                      >
                        <Trash />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {editable && (
        <div
          className={`flex border-secondary border-dashed border-2 mt-4 p-4 flex-col space-y-2 `}
        >
          <div className="flex gap-2 h-[2.6rem]">
            <input
              type="text"
              placeholder="New Measurement"
              value={newMeasurementKey}
              onChange={(e) => setNewMeasurementKey(e.target.value)}
              className="w-3/5 px-2 py-1 border border-secondary rounded"
            />
            <input
              type="number"
              placeholder="Value"
              value={newMeasurementValue}
              onChange={(e) =>
                setNewMeasurementValue(parseFloat(e.target.value))
              }
              className="w-1/5 px-2 py-1 border border-secondary rounded"
            />
            <button
              onClick={handleAddMeasurement}
              className="w-1/5 px-2 items-center h-full bg-white border-primary border-solid border-2 text-primary text-center flex justify-center rounded"
            >
              <Plus />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagersTable;
