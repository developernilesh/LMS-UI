import React from "react";

const SubmitButton = ({buttonContent, buttonType, onClick}) => {
  return (
    <button
      className="w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px]"
      type={buttonType ? buttonType : "submit"}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
};

export default SubmitButton;
