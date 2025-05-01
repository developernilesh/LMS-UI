import React, { useState } from "react";
import SubmitButton from "../../../../Form/SubmitButton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { setStep } from "../../../../../redux/slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const PublishCourse = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);

  const handleCheckboxChange = (event) => {
    console.log(event.target.checked);
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    if (course.status === "Published") {
      setIsPublished(true);
    }
  }, []);

  return (
    <>
      <div className="w-full flex flex-col gap-6 rounded-md bg-richblack-800 p-6">
        <h3 className="text-2xl font-semibold text-richblack-5">
          Publish Settings
        </h3>
        {isPublished ? (
          <div className="text-richblack-100">
            This Course is Already Published!
          </div>
        ) : (
          <label className="flex cursor-pointer items-center gap-3">
            {/* Hidden default checkbox */}
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="hidden"
            />

            {/* Custom checkbox */}
            <div
              className={`flex h-4 w-4 items-center justify-center rounded border ${
                isChecked
                  ? "border-caribbeangreen-400 bg-caribbeangreen-400"
                  : "border-richblack-200 bg-richblack-800 hover:border-richblack-50"
              } transition-all duration-200`}
            >
              {/* Checkmark SVG */}
              <svg
                className={`h-4 w-4 text-richblack-900 transition-all duration-200 ${
                  isChecked ? "opacity-100" : "opacity-0"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <span className="text-richblack-200 font-medium transition-all duration-200">
              Make This Course Public
            </span>
          </label>
        )}
        <div className="flex justify-between items-center">
          <SubmitButton
            buttonContent=<div className="flex gap-1 items-center">
              <FaChevronLeft className="h-3" />
              <span className="pr-2">Back</span>
            </div>
            onClick={() => {
              dispatch(setStep(2));
            }}
            buttonType="button"
            width="w-fit"
            background="bg-richblack-900 border border-richblack-600"
            text="text-richblack-200"
          />
          <div className="flex justify-end items-center gap-3">
            {isPublished ? (
              <SubmitButton
                buttonContent="Go To Your Courses"
                // onClick={gotoNextStep}
                buttonType="button"
                width="w-fit"
              />
            ) : (
              <>
                <SubmitButton
                  buttonContent="Save as Draft"
                  // onClick={() => {
                  //   dispatch(setStep(1));
                  //   dispatch(setIsEditCourse(true));
                  // }}
                  buttonType="button"
                  width="w-fit"
                  background="bg-richblack-900 border border-richblack-600"
                  text="text-richblack-200"
                />
                <SubmitButton
                  buttonContent="Save and Publish"
                  // onClick={gotoNextStep}
                  buttonType="button"
                  width="w-fit"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PublishCourse;
