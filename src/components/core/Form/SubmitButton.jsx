import React from "react";

const SubmitButton = ({buttonContent, buttonType = "submit"}) => {
  return (
    <button
      className="w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px]"
      type={buttonType}
    >
      {buttonContent}
    </button>
  );
};

export default SubmitButton;
