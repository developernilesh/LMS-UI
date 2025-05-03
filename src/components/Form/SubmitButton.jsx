import React from "react";

const SubmitButton = ({
  buttonContent,
  buttonType,
  onClick,
  disabled = false,
  width = "w-full",
  background = "bg-yellow-50",
  text = "text-richblack-900",
  hoverState,
}) => {
  return (
    <button
      className={`${width} ${background} ${hoverState} rounded-md font-medium ${text} px-3 py-1`}
      type={buttonType ? buttonType : "submit"}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonContent}
    </button>
  );
};

export default SubmitButton;
