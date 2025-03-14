import React from "react";

const HighlightedText = ({children}) => {
  return <span className="bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text">{children}</span>;
};

export default HighlightedText;
