import React from "react";

const HighlightedText = ({text}) => {
  return <span className="bg-gradient-to-br from-blue-200 to-caribbeangreen-200 text-transparent bg-clip-text">{text}</span>;
};

export default HighlightedText;
