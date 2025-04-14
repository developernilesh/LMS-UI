import React, { useState } from "react";

const RequirementsInputField = ({
  value = [],
  onChange,
  error,
  instructionsList,
  setInstructionsList,
}) => {
  const [instructionInput, setInstructionInput] = useState("");
  const [emptyInputError, setEmptyInputError] = useState(false);

  const handleAddInstruction = () => {
    const trimmedInstruction = instructionInput.trim();
    if (trimmedInstruction) {
      setInstructionsList([...instructionsList, trimmedInstruction]);
      onChange([...value, trimmedInstruction]);
      setInstructionInput("");
    } else {
      setEmptyInputError(true);
    }
  };

  const handleRemoverInstruction = (index) => {
    const updatedInstructionsList = [...instructionsList];
    updatedInstructionsList.splice(index, 1);
    setInstructionsList(updatedInstructionsList);
    onChange(updatedInstructionsList);
  };

  return (
    <div className="relative w-full text-richblack-5">
      <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
        Instructions/Requirements<sup className="text-pink-200">*</sup>
      </p>
      <input
        type="text"
        placeholder="Please press 'Add' after entering each instruction!"
        value={instructionInput}
        onChange={(e) => {
          setInstructionInput(e.target.value);
          setEmptyInputError(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
        className="bg-richblack-700 rounded-[0.5rem] w-full p-[12px] border-b border-richblack-500"
      />
      {/* add button */}
      <button
        className="text-yellow-100 font-semibold mt-1 px-2"
        onClick={handleAddInstruction}
        type="button"
      >
        Add
      </button>

      {/* Display validation errors */}
      {error && <p className="text-pink-200 text-sm mt-1">{error.message}</p>}

      {/* Display empty input error */}
      {!error && emptyInputError && (
        <p className="text-pink-200 text-sm mt-1">
          Please enter a valid instruction
        </p>
      )}

      {/* displaying instructions */}
      {instructionsList.length > 0 && (
        <div className="flex gap-2 flex-col mt-2">
          {instructionsList.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm text-richblack-50"
            >
              <span>{index + 1}.</span>
              <span>{item}</span>
              <span
                onClick={() => handleRemoverInstruction(index)}
                className="text-richblack-5 text-xs cursor-pointer bg-pink-700 px-1 rounded-full"
              >
                clear
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequirementsInputField;
