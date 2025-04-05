import React from "react";
import CourseInformation from "./CourseInformation";
import { AiFillThunderbolt } from "react-icons/ai";

const courseUploadTipsTextsArray = [
  "Set the Course Price option or make it free.",
  "Standard size for the course thumbnail is 1024x576.",
  "Video section controls the course overview video.",
  "Course Builder is where you create & organize a course.",
  "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
  "Information from the Additional Data section shows up on the course single page.",
  "Make Announcements to notify any important",
  "Notes to all enrolled students at once.",
];

const AddCourse = () => {
  return (
    <div className="flex flex-col-reverse xl:flex-row gap-4 w-11/12 mt-4 justify-center">
      <div className="w-full max-w-[665px]">
        <CourseInformation />
      </div>
      <div className="w-full max-w-[384px] bg-richblack-800 p-6 flex flex-col gap-5 rounded-md">
        <div className="flex gap-1 items-center">
          <AiFillThunderbolt className="text-yellow-100" />
          <h3 className="text-lg font-semibold text-richblack-5">
            Course Upload Tips
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          {courseUploadTipsTextsArray.map((item, index) => (
            <div className="text-xs" key={index}>&#x2022; {item}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
