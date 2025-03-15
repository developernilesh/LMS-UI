import React from "react";

const GradientSpan = ({children}) => {
  return (
    <span className="bg-gradient-to-br from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text">
      {children}
    </span>
  );
};

export default GradientSpan;
