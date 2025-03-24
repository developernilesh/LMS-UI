import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../../../data/dashboard-links";
import SidebarLink from "./SidebarLink";
import { LuLogOut } from "react-icons/lu";
import { logout } from "../../../../services/operations/logout";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../common/ConfirmationModal";

const Sidebar = ({ addClassName }) => {
  const [confirmationModal, setConfirmationModal] = useState(null);

  const { user } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  return (
    <>
      <div
        className={`md:h-[calc(100vh-48px)] bg-richblack-900 md:bg-richblack-800 border-t md:border-r border-richblack-700 
        w-full md:w-[222px] md:py-5 flex flex-row md:flex-col justify-between md:justify-start gap-3 md:gap-0 z-30 ${addClassName}`}
      >
        {sidebarLinks.map(
          (link) =>
            (!link.type || user?.accountType === link.type) && (
              <SidebarLink
                key={link.id}
                linkPath={link.path}
                linkName={link.name}
                iconName={link.icon}
              />
            )
        )}
        <div className="bg-richblack-600 h-[1px] w-[190px] my-2 mx-auto hidden md:block"></div>
        <SidebarLink
          linkPath="/dashboard/settings"
          linkName="Settings"
          iconName="VscSettingsGear"
        />
        <button
          className="text-richblack-100 py-2 px-2 md:px-6 flex flex-col md:flex-row justify-start items-center gap-1 md:gap-3"
          onClick={() =>
            setConfirmationModal({
              text1: "Are you sure?",
              text2: "You will be Logged out of your Account!",
              btn1text: "Logout",
              btn2text: "Cancel",
              btn1handler: () => dispatch(logout(navigate)),
              btn2handler: () => setConfirmationModal(null),
            })
          }
        >
          <LuLogOut className="w-4 h-4" />
          <div className="text-xs sm:text-sm md:text-base">Logout</div>
        </button>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default Sidebar;
