import React, { useEffect, useState } from "react";
import Sidebar from "../components/core/DashBoard/sidebar/Sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  // const navigate = useNavigate();
  const [breadCrumb, setBreadCrumb] = useState(null);

  const currentPath = useLocation().pathname;

  const getBreadCrumb = () => {
    const currentBreadCrumb = currentPath
      .split("/")
      .filter(Boolean)
      .map((path, index, array) => {
        // const routePath = `/${array.slice(0, index + 1).join("/")}`;
        const isLast = index === array.length - 1;
        return (
          <div key={index}>
            {index === 1 && <span>/ </span>}
            {index < 2 && (
              <span
                className={`capitalize ${index === 1 ? "text-yellow-50" : ""}`}
              >
                {/* onClick={() => !isLast && navigate(routePath)}> */}
                {path.split("-").join(" ")}
              </span>
            )}
          </div>
        );
      });
    setBreadCrumb(currentBreadCrumb);
  };

  useEffect(() => {
    getBreadCrumb();
  }, [currentPath]);

  return (
    <div className="flex">
      <Sidebar addClassName="fixed bottom-0 left-0" />
      <div className="w-full py-7 md:ml-[222px]">
        <div className="flex items-center w-11/12 mx-auto text-richblack-100">
          <div className="flex items-center gap-2">{breadCrumb}</div>
        </div>
        <div className="flex justify-center w-full mb-16 md:mb-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
