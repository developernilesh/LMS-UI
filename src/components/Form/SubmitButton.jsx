import React from "react";

const SubmitButton = ({buttonContent, buttonType, onClick, width = 'w-full', hoverState}) => {
  return (
    <button
      className={`${width} bg-yellow-50 ${hoverState} rounded-md font-medium text-richblack-900 px-[12px] py-[8px]`}
      type={buttonType ? buttonType : "submit"}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
};

export default SubmitButton;
