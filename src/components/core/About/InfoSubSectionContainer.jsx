import React from "react";

const InfoSubSectionContainer = ({
  children,
  className,
  alignItems = "items-center",
}) => {
  return (
    <div
      className={`mx-auto flex flex-col lg:flex-row justify-center lg:justify-between gap-10 ${alignItems} py-24 w-11/12 max-w-6xl ${className}`}
    >
      {children}
    </div>
  );
};

export default InfoSubSectionContainer;
