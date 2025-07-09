import React, { useState } from "react";
import SubmitButton from "../../../../Form/SubmitButton";
import { FaChevronLeft } from "react-icons/fa";
import {
  setCourse,
  setIsEditCourse,
  setStep,
} from "../../../../../redux/slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import apiConnector from "../../../../../services/apiConnector";
import endpoints from "../../../../../services/apiEndpoints";
import { handleError } from "../../../../../services/operations/handleError";

const { PUBLISH_COURSE_API } = endpoints;

const PublishCourse = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (course.status === "Published") {
      setIsPublished(true);
    }
  }, []);

  const resetFunction = () => {
    dispatch(setStep(1));
    dispatch(setCourse(null));
    dispatch(setIsEditCourse(false));
    navigate("/dashboard/my-courses");
  };

  const publishCourse = async () => {
    if (!isChecked) {
      toast.error("Please Make the Course Public to Publish!");
      return;
    }
    try {
      setLoading(true);
      const response = await apiConnector("POST", PUBLISH_COURSE_API, {
        courseId: course?._id,
        status: "Published",
      }, {
        Authorization: `Bearer ${token}`,
      });
      if (response?.data?.success) {
        toast.success(response.data.message);
        resetFunction();
      }
    } catch (error) {
      dispatch(handleError(navigate, error));
    } finally {
      setLoading(false);
    }
  };

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
              onChange={(e) => setIsChecked(e.target.checked)}
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
            disabled={loading ? true : false}
            buttonType="button"
            width="w-fit"
            background="bg-richblack-900 border border-richblack-600"
            text="text-richblack-200"
          />
          <div className="flex justify-end items-center gap-3">
            {isPublished ? (
              <SubmitButton
                buttonContent="Go To Your Courses"
                onClick={resetFunction}
                buttonType="button"
                width="w-fit"
              />
            ) : (
              <>
                <SubmitButton
                  buttonContent="Save as Draft"
                  onClick={resetFunction}
                  buttonType="button"
                  width="w-fit"
                  disabled={loading ? true : false}
                  background="bg-richblack-900 border border-richblack-600"
                  text="text-richblack-200"
                />
                <SubmitButton
                  buttonContent={
                    loading ? "Publishing Course..." : "Save and Publish"
                  }
                  onClick={publishCourse}
                  disabled={loading ? true : false}
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
