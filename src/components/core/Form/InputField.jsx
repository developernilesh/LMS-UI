import React from "react";

const InputField = ({ label, name, type = "text", placeholder, register, validation, error, isMandatory = true }) => {
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
        className="bg-richblack-800 rounded-[0.5rem] w-full p-[12px]"
      />
      {error && <p className="text-pink-200 text-sm mt-1">{error.message}</p>}
    </label>
  );
};

export default InputField;
