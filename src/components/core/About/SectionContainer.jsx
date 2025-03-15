import React from "react";

const SectionContainer = ({ addClassName, children }) => {
  return (
    <div className={`w-11/12 max-w-6xl mx-auto py-20 flex justify-center ${addClassName}`}>
      {children}
    </div>
  );
};

export default SectionContainer;
