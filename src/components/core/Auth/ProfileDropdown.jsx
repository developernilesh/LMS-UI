import React, { useRef, useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { PiSignOut } from "react-icons/pi";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { Link } from "react-router-dom";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false));

  return (
    <button className="relative" onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-center ml-1">
        <img
          src={`https://api.dicebear.com/5.x/initials/svg?seed=Arghya Mukherjee`}
          alt="User"
          className="w-6 h-6 rounded-full"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              // dispatch(logout(navigate));
              setOpen(false);
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <PiSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
};
export default ProfileDropdown;
