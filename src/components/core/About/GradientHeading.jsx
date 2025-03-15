import React from "react";

const GradientHeading = ({ gradient, children }) => {
  return (
    <h3
      className={`font-semibold text-4xl bg-gradient-to-br ${gradient} text-transparent bg-clip-text`}
    >
      {children}
    </h3>
  );
};

export default GradientHeading;
