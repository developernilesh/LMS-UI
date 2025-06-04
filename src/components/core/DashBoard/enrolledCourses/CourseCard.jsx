import React from "react";
import SubmitButton from "../../../Form/SubmitButton";
import { BsFileEarmarkCheckFill } from "react-icons/bs";
import ProgressBar from "./ProgressBar";

const CourseCard = ({ course }) => {
  return (
    <div
      className="w-full max-w-sm border rounded-lg shadow-sm bg-richblack-800 border-richblack-700 hover:scale-[1.01] 
        transtion-all duration-200 ease-in-out cursor-pointer"
    >
      <img
        className="rounded-t-lg h-56 w-full"
        src={course.thumbNail?.secure_url}
        alt={course.courseName}
      />
      <div className="p-5 flex flex-col gap-3">
        <div>
          <h4 className="text-xl font-medium text-richblack-5 truncate">
            {course.courseName}
          </h4>
          <p className="text-richblack-200 truncate">
            {course.courseDescription}
          </p>
        </div>
        <ProgressBar progress={course.progress} />
        <div className="flex justify-between items-center">
          <div className="text-[#d191ff]">
            <span className="">Valid till:</span> <span>Lifetime</span>
          </div>
          <div className="flex gap-3 justify-end items-center">
            <SubmitButton
              buttonContent=<div className="flex items-center">
                <span>
                  <BsFileEarmarkCheckFill />
                </span>
                <span>&nbsp;Mark as Completed</span>
              </div>
              // onClick={() => navigate("/dashboard/settings")}
              background="bg-richblack-900 border border-richblack-600"
              text="text-[#E7C009]"
              buttonType="button"
              width="w-fit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
