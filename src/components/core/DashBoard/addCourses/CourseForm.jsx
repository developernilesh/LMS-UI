import React from "react";
import CourseInformation from "./courseInformation/CourseInformation";
import CourseBuilder from "./courseBuilder/CourseBuilder";
import { useSelector } from "react-redux";
import RenderSteps from "./RenderSteps";
import PublishCourse from "./publishCourse/PublishCourse";
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

const CourseForm = () => {
  const { step, isEditCourse } = useSelector((state) => state.course);

  return (
    <div className="flex flex-col-reverse xl:flex-row gap-6 w-11/12 mt-4 justify-center">
      <div className="w-full max-w-[665px]">
        <h3 className="text-3xl text-richblack-5 font-medium">
          {isEditCourse ? "Edit" : "Add"} Course
        </h3>
        <RenderSteps />
        {step === 1 && <CourseInformation />}
        {step === 2 && <CourseBuilder />}
        {step === 3 && <PublishCourse />}
      </div>
      <div className="w-full max-w-[384px] bg-richblack-800 p-6 flex flex-col gap-5 rounded-md h-fit">
        <div className="flex gap-1 items-center">
          <AiFillThunderbolt className="text-yellow-100" />
          <h3 className="text-lg font-semibold text-richblack-5">
            Course Upload Tips
          </h3>
        </div>
        <ul className="flex flex-col gap-2">
          {courseUploadTipsTextsArray.map((item, index) => (
            <li className="text-xs" key={index}>
              &#x2022; {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseForm;
