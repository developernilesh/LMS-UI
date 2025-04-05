import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../Form/InputField";

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

const CourseInformation = () => {
  // keydown handler function
  const handlePriceKeyDown = (e) => {
    // Prevent invalid characters
    if (!allowedPriceInputKeys.includes(e.key)) {
      e.preventDefault();
      return;
    }
    const currentValue = e.target.value;
    const cursorPosition = e.target.selectionStart;
    // Prevent multiple decimals
    if (e.key === "." && currentValue.includes(".")) {
      e.preventDefault();
      return;
    }
    // Decimal precision check
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitProfileForm = () => {};

  return (
    <form onSubmit={handleSubmit(submitProfileForm)} className="w-full">
      <div className="flex flex-col gap-5 rounded-md bg-richblack-800 p-6">
        <InputField
          label="Course Title"
          name="courseTitle"
          placeholder="Enter course title"
          register={register}
          validation={{ required: "Course title is required" }}
          error={errors.courseTitle}
          background="bg-richblack-700"
        />
        <label className="relative w-full text-richblack-5">
          <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
            Course Description<sup className="text-pink-200">*</sup>
          </p>
          <textarea
            rows="2"
            placeholder="Enter short description"
            {...register("description", {
              required: "Course description is required",
            })}
            className="bg-richblack-700 rounded-[0.5rem] w-full p-[12px] border-b border-richblack-500"
          />
          {errors.description && (
            <p className="text-pink-200 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </label>

        <label className="w-full text-richblack-5">
          <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
            Course Price<sup className="text-pink-200">*</sup>
          </p>
          <input
            type="text"
            name="price"
            placeholder="Enter course price"
            onKeyDown={(e)=>handlePriceKeyDown(e)}
            {...register("price", {
              required: "Course price is required",
              validate: (value) => {
                if (value.includes(".") && value.split(".")[0]?.length < 1)
                  return "Missing leading zero";
                if (value.includes(".") && value.split(".")[1]?.length < 1)
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
      </div>
      <button>Save</button>
    </form>
  );
};

export default CourseInformation;
