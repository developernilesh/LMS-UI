import React from "react";
import { Link } from "react-router-dom";

const CtaButton = ({ children, active = false, linkto = "/" }) => {
  return (
    <Link to={`${linkto}`}>
      <button
        className={`px-6 py-3 rounded-lg text-base font-medium text-center
      ${active
            ? "bg-yellow-50 text-black hover:bg-yellow-25"
            : "bg-richblack-800 text-richblack-100 border-b-2 border-r hover:border border-richblack-700 hover:bg-richblack-900"
          }
      transition-all duration-200 ease-linear hover:scale-95`}
      >
        {children}
      </button>
    </Link>
  );
};

export default CtaButton;
