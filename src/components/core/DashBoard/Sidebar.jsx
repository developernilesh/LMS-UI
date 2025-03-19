import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import { sidebarLinks } from "../../../data/dashboard-links";
import SidebarLink from "./SidebarLink";
import { LuLogOut } from "react-icons/lu";
import { logout } from "../../../services/operations/logout";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../common/ConfirmationModal";

const Sidebar = ({ addClassName }) => {
  const [confirmationModal, setConfirmationModal] = useState(null);

  const { user } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.loader);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (loading) return <Loader />;

  return (
    <>
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
            <div>Logout</div>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </>
  );
};

export default Sidebar;
