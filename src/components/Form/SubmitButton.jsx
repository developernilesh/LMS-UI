import React from "react";

const SubmitButton = ({
  buttonContent,
  buttonType,
  onClick,
  width = "w-full",
  background = "bg-yellow-100",
  text = "richblack-900",
  hoverState,
}) => {
  return (
    <button
      className={`${width} ${background} ${hoverState} rounded-md font-medium text-${text} px-[12px] py-[8px]`}
      type={buttonType ? buttonType : "submit"}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
};

export default SubmitButton;
