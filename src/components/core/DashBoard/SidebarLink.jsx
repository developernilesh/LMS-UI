import React from "react";
import { matchPath, NavLink, useLocation } from "react-router-dom";
import * as Icons from "react-icons/vsc";

const SidebarLink = ({ linkPath, iconName, linkName }) => {
  const Icon = Icons[iconName];

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
          ? "bg-yellow-800 border-l-2 border-yellow-50 text-yellow-50"
          : "text-richblack-100"
      } py-2 px-6 flex justify-start items-center gap-3`}
    >
      <Icon className="w-4 h-4" />
      <div>{linkName}</div>
    </NavLink>
  );
};

export default SidebarLink;
