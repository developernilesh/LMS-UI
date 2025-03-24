import React from "react";
import { CgProfile } from "react-icons/cg";
import SubmitButton from "../../../Form/SubmitButton";
import { MdEditSquare } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TbLockPassword } from "react-icons/tb";

const MyProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-11/12 max-w-[800px] space-y-4">
        <h3 className="text-3xl text-richblack-5 font-medium pt-3">
          My Profile
        </h3>

        {/* profile section */}
        <div className="flex justify-between items-center p-6 bg-richblack-800 rounded-lg border border-richblack-600">
          {/* profile info */}
          <div className="flex justify-start items-center gap-3 sm:gap-6">
            {user?.image ? (
              <img
                src={user?.image}
                alt="profile"
                className="w-10 h-10 sm:w-20 sm:h-20 rounded-full"
              />
            ) : (
              <CgProfile className="w-10 h-10 sm:w-20 sm:h-20 rounded-full" />
            )}
            <div className="flex flex-col gap-0.5">
              <h4 className="text-lg font-semibold">
                {user?.firstName}&nbsp;{user?.lastName}
              </h4>
              <div className="text-richblack-100">{user?.email}</div>
            </div>
          </div>
          {/* edit button */}
          <SubmitButton
            buttonContent=<div className="flex items-center">
              <span>
              <TbLockPassword />
              </span>
              <span>&nbsp;Change Password</span>
            </div>
            onClick={() => navigate("/dashboard/change-password")}
            buttonType="button"
            width="w-fit"
          />
        </div>

        {/* personal details section */}
        <div className="flex flex-col gap-3 p-6 bg-richblack-800 rounded-lg border border-richblack-600">
          {/* 1st row */}
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold">Personal Details</h4>
            <SubmitButton
              buttonContent=<div className="flex items-center">
                <span>
                  <MdEditSquare />
                </span>
                <span>&nbsp;Edit</span>
              </div>
              onClick={() => navigate("/dashboard/settings")}
              buttonType="button"
              width="w-fit"
            />
          </div>
          {/* 2nd row */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
            <div className="w-full sm:w-1/2">
              <div className="text-richblack-400">First Name</div>
              <div className="text-richblack-5">{user?.firstName}</div>
            </div>
            <div className="w-full sm:w-1/2">
              <div className="text-richblack-400">Last Name</div>
              <div className="text-richblack-5">{user?.lastName}</div>
            </div>
          </div>
          {/* 3rd row */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
            <div className="w-full sm:w-1/2">
              <div className="text-richblack-400">Email</div>
              <div className="text-richblack-5">{user?.email}</div>
            </div>
            <div className="w-full sm:w-1/2">
              <div className="text-richblack-400">Contact No</div>
              <div className="text-richblack-5">
                {user?.additionalDetails?.contact}
              </div>
            </div>
          </div>
          {/* 4th row */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
            <div className="w-full sm:w-1/2">
              <div className="text-richblack-400">Gender</div>
              <div className="text-richblack-5">
                {user?.additionalDetails?.gender}
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <div className="text-richblack-400">Date of Birth</div>
              <div className="text-richblack-5">
                {user?.additionalDetails?.dateOfBirth}
              </div>
            </div>
          </div>
        </div>

        {/* about section */}
        <div className="flex flex-col gap-3 p-6 bg-richblack-800 rounded-lg border border-richblack-600">
          {/* 1st row */}
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold">About</h4>
            <SubmitButton
              buttonContent=<div className="flex items-center">
                <span>
                  <MdEditSquare />
                </span>
                <span>&nbsp;Edit</span>
              </div>
              onClick={() => navigate("/dashboard/settings")}
              buttonType="button"
              width="w-fit"
            />
          </div>
          {/* 2nd row */}
          <div>
            <div className="text-richblack-400">About</div>
            <div className="text-richblack-5">
              {user?.additionalDetails?.about}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
