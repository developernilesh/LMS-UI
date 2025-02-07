import React from "react";

const HighlightedText = ({children}) => {
  return <span className="bg-gradient-to-br from-blue-200 to-caribbeangreen-200 text-transparent bg-clip-text">{children}</span>;
};

export default HighlightedText;
