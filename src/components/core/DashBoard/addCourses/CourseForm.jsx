import React from "react";
import CourseInformation from "./courseInformation/CourseInformation";
import CourseBuilder from "./courseBuilder/CourseBuilder";
import CourseUploadTips from "./CourseUploadTips";
import { useSelector } from "react-redux";
import RenderSteps from "./RenderSteps";
import Loader from "../../../Loader/Loader";

const CourseForm = () => {
  const { step, isEditCourse } = useSelector((state) => state.course);

  return (
    <div className="flex flex-col-reverse xl:flex-row gap-6 w-11/12 mt-4 justify-center">
      <div className="w-full max-w-[665px]">
        <h3 className="text-3xl text-richblack-5 font-medium">{isEditCourse ? 'Edit' : 'Add'} Course</h3>
        <RenderSteps />
        {step === 1 && <CourseInformation />}
        {step === 2 && <CourseBuilder />}
      </div>
      <CourseUploadTips />
    </div>
  );
};

export default CourseForm;
