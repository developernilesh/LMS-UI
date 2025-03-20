import React from "react";
import Sidebar from "../components/core/DashBoard/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  // const navigate = useNavigate();
  return (
    <div className="flex">
      <Sidebar addClassName="fixed bottom-0 left-0" />
      <div className="w-full py-7 md:ml-[222px]">
        <div className="flex items-center w-11/12 mx-auto text-richblack-100">
          <div className="flex items-center gap-2">
            {window.location.pathname
              .split("/")
              .filter(Boolean)
              .map((path, index, array) => {
                const routePath = `/${array.slice(0, index + 1).join("/")}`;
                const isLast = index === array.length - 1;
                return (
                  <div key={index}>
                    {index > 0 && <span>/ </span>}
                    <span
                      className={`capitalize ${isLast ? "text-yellow-50" : ""}`}
                    >
                      {/* onClick={() => !isLast && navigate(routePath)}> */}
                      {path.split("-").join(" ")}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex justify-center w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
