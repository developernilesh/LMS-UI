import React from "react";
import CourseInformation from "./CourseInformation";
import CourseUploadTips from "./CourseUploadTips";

const AddCourse = () => {
  return (
    <div className="flex flex-col-reverse xl:flex-row gap-4 w-11/12 mt-4 justify-center">
      <div className="w-full max-w-[665px]">
        <CourseInformation />
      </div>
      <CourseUploadTips/>
    </div>
  );
};

export default AddCourse;
