import React, { useState } from "react";
import { MdCancel } from "react-icons/md";

const TagsInputField = ({
  value = [],
  onChange,
  error,
  tagsList,
  setTagsList,
}) => {
  const [tagInput, setTagInput] = useState("");
  const [emptyTagError, setEmptyTagError] = useState(false);

  const handleAddTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedTag = tagInput.trim();
      if (trimmedTag) {
        setTagsList([...tagsList, trimmedTag]);
        onChange([...value, trimmedTag]);
        setTagInput("");
      } else {
        setEmptyTagError(true);
      }
    }
  };

  const handleRemoverTag = (index) => {
    const updatedTagsList = [...tagsList];
    updatedTagsList.splice(index, 1);
    setTagsList(updatedTagsList);
    onChange(updatedTagsList);
  };

  return (
    <div className="relative w-full text-richblack-5">
      <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
        Tags<sup className="text-pink-200">*</sup>
      </p>
      {tagsList.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-1 mb-2">
          {tagsList.map((item, index) => (
            <div
              key={index}
              className="bg-caribbeangreen-600 pl-2 pr-1 text-sm rounded-xl flex gap-1 items-center"
            >
              <span>{item}</span>
              <span
                onClick={() => handleRemoverTag(index)}
                className="cursor-pointer"
              >
                <MdCancel />
              </span>
            </div>
          ))}
        </div>
      )}
      <input
        type="text"
        placeholder="Please press 'Enter' after adding each tag!"
        value={tagInput}
        onChange={(e) => {
          setTagInput(e.target.value);
          setEmptyTagError(false);
        }}
        onKeyDown={handleAddTag}
        className="bg-richblack-700 rounded-[0.5rem] w-full p-[12px] border-b border-richblack-500"
      />

      {/* Display validation errors */}
      {error && <p className="text-pink-200 text-sm mt-1">{error.message}</p>}

      {/* Display empty tag error */}
      {!error && emptyTagError && (
        <p className="text-pink-200 text-sm mt-1">Please enter a valid tag</p>
      )}
    </div>
  );
};

export default TagsInputField;
