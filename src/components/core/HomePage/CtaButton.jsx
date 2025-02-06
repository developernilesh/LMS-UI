import React from "react";
import { Link } from "react-router-dom";

const CtaButton = ({ children, active=false, linkto }) => {
  return (
    <Link to={`/${linkto}`}>
      <button 
      className={`px-6 py-3 rounded-lg text-base font-medium text-center
      ${active ? 'bg-yellow-50 text-black hover:bg-yellow-100' : 'bg-richblack-800 border-b border-r border-richblack-100 hover:bg-richblack-700'}
      transition-all duration-200 hover:scale-95`}>
        {children}
      </button>
    </Link>
  );
};

export default CtaButton;
