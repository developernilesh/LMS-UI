import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import { sidebarLinks } from "../../../data/dashboard-links";
import SidebarLink from "./SidebarLink";
import { LuLogOut } from "react-icons/lu";

const Sidebar = ({ addClassName }) => {
  const { user } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.loader);

  if (loading) return <Loader />;

  console.log("user : ", user);

  return (
    <div
      className={`h-[calc(100vh-48px)] bg-richblack-800 border-r border-richblack-700 min-w-[222px] pt-7 space-y-3 ${addClassName}`}
    >
      <div>
        {sidebarLinks.map(
          (link, index) =>
            (!link.type || user?.accountType === link.type) && (
              <SidebarLink
                key={link.id}
                linkPath={link.path}
                linkName={link.name}
                iconName={link.icon}
              />
            )
        )}
      </div>
      <div className="bg-richblack-600 h-[1px] w-[190px] mx-auto"></div>
      <div>
        <SidebarLink
          linkPath="/dashboard/settings"
          linkName="Settings"
          iconName="VscSettingsGear"
        />
        <button
          className="text-richblack-100 py-2 px-6 flex justify-start items-center gap-3"
        >
          <LuLogOut className="w-4 h-4" />
          <div>Logout</div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
