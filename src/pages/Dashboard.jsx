import React from "react";
import Sidebar from "../components/core/DashBoard/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar addClassName="" />
      <div className="min-h-[calc(100vh-48px)] flex justify-center w-full">
        <Outlet/>
      </div>
    </div>
  );
};

export default Dashboard;
