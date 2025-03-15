import React from "react";

const GradientHeading = ({ gradient, children }) => {
  return (
    <span
      className={`bg-gradient-to-br ${gradient} text-transparent bg-clip-text`}
    >
      {children}
    </span>
  );
};

export default GradientHeading;
