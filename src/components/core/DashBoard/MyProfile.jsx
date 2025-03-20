import React from "react";
import { CgProfile } from "react-icons/cg";
import SubmitButton from "../../Form/SubmitButton";
import { MdEditSquare } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.profile)

  if(user){
    console.log("ussseerr : ", user)
  }

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-11/12 max-w-[600px] space-y-4">
        <h3 className="text-3xl text-richblack-5 font-medium pt-3">
          My Profile
        </h3>
        {/* profile section */}
        <div className="flex justify-between items-center p-6 bg-richblack-800 rounded-lg border border-richblack-600">
          {/* profile info */}
          <div className="flex justify-start items-center gap-3 sm:gap-6">
            {/* <img src={icon} alt="profile" className="w-20 h-20 rounded-full" /> */}
            <CgProfile className="w-10 h-10 sm:w-20 sm:h-20 rounded-full" />
            <div className="flex flex-col gap-0.5">
              <h4 className="text-lg font-semibold">{user?.firstName}&nbsp;{user?.lastName}</h4>
              <div className="text-richblack-100">{user?.email}</div>
            </div>
          </div>
          {/* edit button */}
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
        {/* personal details section */}
        <div className="flex flex-col gap-5 p-6 bg-richblack-800 rounded-lg border border-richblack-600">
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
          <div className="flex">
            <div className="w-1/2">
              <div className="text-richblack-400">First Name</div>
              <div className="text-richblack-5">{user?.firstName}</div>
            </div>
            <div className="w-1/2">
              <div className="text-richblack-400">Last Name</div>
              <div className="text-richblack-5">{user?.lastName}</div>
            </div>
          </div>
          {/* 3rd row */}
          <div className="flex">
            <div className="w-1/2">
              <div className="text-richblack-400">Email</div>
              <div className="text-richblack-5">{user?.email}</div>
            </div>
            <div className="w-1/2">
              <div className="text-richblack-400">Contact No</div>
              <div className="text-richblack-5">{user?.additionalDetails?.contact}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
