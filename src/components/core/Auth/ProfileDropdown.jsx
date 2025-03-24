import React, { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { PiSignOut } from "react-icons/pi";
import { VscDashboard } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { useDispatch } from "react-redux";
import { logout } from "../../../services/operations/logout";
import ConfirmationModal from "../../common/ConfirmationModal";

const ProfileDropdown = ({ user }) => {
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [open, setOpen] = useState(false);

  const ref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useOnClickOutside(ref, () => setOpen(false));

  const onLogout = () => {
    setConfirmationModal({
      text1: "Are you sure?",
      text2: "You will be Logged out of your Account!",
      btn1text: "Logout",
      btn2text: "Cancel",
      btn1handler: () => dispatch(logout(navigate)),
      btn2handler: () => setConfirmationModal(null),
    });
    setOpen(false);
  };

  return (
    <>
      <div className="relative" ref={ref}>
        <button
          className="flex items-center justify-center ml-1"
          onClick={() => setOpen(!open)}
        >
          <img src={user?.image} alt="User" className="w-6 h-6 rounded-full" />
          <AiOutlineCaretDown
            className={`text-sm text-richblack-100 ${
              open ? "rotate-180" : ""
            } transition-all duration-300`}
          />
        </button>
        {open && (
          <div className="absolute top-full mt-1 right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800">
            <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
              <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                <VscDashboard className="text-lg" />
                Dashboard
              </div>
            </Link>
            <button
              onClick={onLogout}
              className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
            >
              <PiSignOut className="text-lg" />
              Logout
            </button>
          </div>
        )}
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};
export default ProfileDropdown;
