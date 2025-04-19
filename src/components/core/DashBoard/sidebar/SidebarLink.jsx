import React from "react";
import { matchPath, NavLink, useLocation } from "react-router-dom";
import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { setCourse, setIsEditCourse, setStep } from "../../../../redux/slices/courseSlice";

const SidebarLink = ({ linkPath, iconName, linkName }) => {
  const Icon = Icons[iconName];
  const dispatch = useDispatch;
  // matching the route with the current path
  const location = useLocation();
  const matchRoute = (route) => {
    if (!route) return false;
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <NavLink
      to={linkPath}
      className={`${
        matchRoute(linkPath)
          ? "bg-yellow-800 border-b-2 md:border-b-0 md:border-l-2 border-yellow-50 text-yellow-50"
          : "text-richblack-100"
      } py-2 px-1 md:px-6 flex flex-col md:flex-row justify-start items-center gap-1 md:gap-3`}
      onClick={() => {
        dispatch(setStep(1))
        dispatch(setCourse(null))
        dispatch(setIsEditCourse(false))
      }}
    >
      <Icon className="w-4 h-4" />
      <div className="text-xs sm:text-sm md:text-base text-center md:text-start">
        {linkName}
      </div>
    </NavLink>
  );
};

export default SidebarLink;
