import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../Loader/Loader";

const Sidebar = ({ addClassName }) => {
  const { user } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.loader);

  if (loading) return <Loader />;

  return (
    <div
      className={`h-[calc(100vh-48px)] bg-richblack-800 border-r border-richblack-700 min-w-[222px] pt-14 ${addClassName}`}
    >
      Sidebar
    </div>
  );
};

export default Sidebar;
