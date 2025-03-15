import React from "react";
import GradientHeading from "./GradientHeading";

const ContentBlock = ({ title, gradient, children }) => {
  return (
    <div className="flex flex-col justify-center items-start gap-6 w-full max-w-[486px]">
      <GradientHeading gradient={gradient}>{title}</GradientHeading>
      <div className="text-richblack-100 space-y-6">{children}</div>
    </div>
  );
};

export default ContentBlock;
