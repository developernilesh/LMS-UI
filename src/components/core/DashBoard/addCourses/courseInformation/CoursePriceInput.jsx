import React from "react";

const allowedPriceInputKeys = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  "Backspace",
  "Delete",
  "Tab",
  "ArrowLeft",
  "ArrowRight",
];

const CoursePriceInput = ({ register, errors }) => {
  const handlePriceKeyDown = (e) => {
    if (!allowedPriceInputKeys.includes(e.key)) {
      e.preventDefault();
      return;
    }

    const currentValue = e.target.value;
    const cursorPosition = e.target.selectionStart;

    if (e.key === "." && currentValue.includes(".")) {
      e.preventDefault();
      return;
    }

    if (currentValue.includes(".")) {
      const [integerPart, decimalPart] = currentValue.split(".");
      if (
        decimalPart?.length >= 2 &&
        cursorPosition > currentValue.indexOf(".") &&
        !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(e.key)
      ) {
        e.preventDefault();
      }
    }
  };

  return (
    <label className="w-full text-richblack-5">
      <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
        Course Price (&#8377;)<sup className="text-pink-200">*</sup>
      </p>
      <input
        type="text"
        name="price"
        placeholder="Enter course price"
        onKeyDown={handlePriceKeyDown}
        {...register("price", {
          required: "Course price is required",
          validate: (value) => {
            if (String(value)?.includes(".") && String(value)?.split(".")[0]?.length < 1)
              return "Missing leading zero";
            if (String(value)?.includes(".") && String(value)?.split(".")[1]?.length < 1)
              return "Invalid format";
            return true;
          },
        })}
        className="bg-richblack-700 rounded-[0.5rem] w-full p-[12px] border-b border-richblack-500"
      />
      {errors.price && (
        <p className="text-pink-200 text-sm mt-1">{errors.price.message}</p>
      )}
    </label>
  );
};

export default CoursePriceInput;
