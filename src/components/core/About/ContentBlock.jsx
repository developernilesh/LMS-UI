import React from "react";
import GradientText from "./GradientText";

const ContentBlock = ({ title, gradient, children }) => {
  return (
    <div className="flex flex-col justify-center items-start gap-6 w-full max-w-[486px]">
      <h3 className="font-semibold text-4xl">
        <GradientText gradient={gradient}>{title}</GradientText>
      </h3>
      <div className="text-richblack-100 space-y-6">{children}</div>
    </div>
  );
};

export default ContentBlock;
