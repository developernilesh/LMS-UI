import React from "react";

const SectionContainer = ({ addClassName, children }) => {
  return (
    <div className={`w-11/12 max-w-[1200px] mx-auto py-20 flex ${addClassName}`}>
      {children}
    </div>
  );
};

export default SectionContainer;
