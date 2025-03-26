import React from "react";

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  validation,
  error,
  isMandatory = true,
  background = "bg-richblack-800",
  defaultValue = null,
  disabled = false
}) => {
  return (
    <label className="relative w-full text-richblack-5">
      <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
        {label}
        {isMandatory && <sup className="text-pink-200">*</sup>}
      </p>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}
        defaultValue={defaultValue}
        disabled={disabled}
        className={`${background} rounded-[0.5rem] w-full p-3 border-b border-richblack-500 ${disabled ? 'text-richblack-200 cursor-not-allowed' : 'text-richblack-5'}`}
      />
      {error && <p className="text-pink-200 text-sm mt-1">{error.message}</p>}
    </label>
  );
};

export default InputField;
