import React, { useEffect, useState } from "react";
import InputField from "../../../../Form/InputField";
import { useForm } from "react-hook-form";
import SubmitButton from "../../../../Form/SubmitButton";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourse,
  setIsEditCourse,
  setStep,
} from "../../../../../redux/slices/courseSlice";
import { FaChevronLeft, FaChevronRight, FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import apiConnector from "../../../../../services/apiConnector";
import endpoints from "../../../../../services/apiEndpoints";

const CourseBuilder = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { ADD_SECTION_API, GET_SPECIFIC_COURSE_API } = endpoints;
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isEditSection, setIsEditSection] = useState(false);
  const [sectionInfo, setSectionInfo] = useState(false);

  const gotoNextStep = () => {
    if (course?.courseContent?.length === 0) {
      toast.error("Please add atleast one section!");
      return;
    }
    if (
      course?.courseContent?.some(
        (section) => section?.subSection?.length === 0
      )
    ) {
      toast.error("Please add atleast one lecture in each section!");
      return;
    }
    dispatch(setStep(3));
  };

  const cancelEdit = () => {
    setIsEditSection(false);
    setValue("sectionName", "");
  };

  const editSection = (item) => {
    setIsEditSection(true);
    setSectionInfo(item);
    setValue("sectionName", item.sectionName);
  };

  const createSection = async (data) => {
    setIsLoading(true);
    if (isEditSection) {
      // call edit-section api
      const payload = { courseId: sectionInfo._id, ...data };
      console.log("payload", payload);
    } else {
      try {
        const payload = { courseId: course?._id, ...data };
        const response = await apiConnector("POST", ADD_SECTION_API, payload);
        if (response?.data?.success) {
          toast.success(response.data.message);
          fetchSpecificCourse(course?._id)
          reset();
        }
      } catch (error) {
        toast.error(error?.message || error?.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const fetchSpecificCourse = async (courseId) => {
    setIsLoading(true);
    try {
      const response = await apiConnector(
        "GET",
        GET_SPECIFIC_COURSE_API + `/${courseId}`
      );
      if (response?.data?.success) {
        dispatch(setCourse(response.data.data));
      }
    } catch (error) {
      toast.error(error?.message || error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 rounded-md bg-richblack-800 p-6">
      <form
        onSubmit={handleSubmit(createSection)}
        className="w-full flex flex-col gap-5"
      >
        <InputField
          label="Section Name"
          name="sectionName"
          placeholder="Add a section to build your course"
          register={register}
          validation={{ required: "Name of the sectionn required" }}
          error={errors.sectionName}
          background="bg-richblack-700"
        />
        <div className="flex justify-start items-center gap-3">
          <SubmitButton
            buttonContent={
              isEditSection ? (
                "Update Section Name"
              ) : (
                <div className="flex gap-1 items-center">
                  <span>Create Section</span>
                  <IoMdAddCircleOutline />
                </div>
              )
            }
            width="w-fit"
            background="bg-richblack-900 border border-yellow-100"
            text="text-yellow-100"
          />
          {isEditSection && (
            <button
              className="text-richblack-200 text-sm"
              type="button"
              onClick={cancelEdit}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {/* {course.courseContent.length>0 && <NestedContent/> } */}
      {course?.courseContent?.length > 0 && (
        <div>
          {course.courseContent.map((item) => (
            <div
              className="mb-1 italic text-blue-100 flex items-center gap-2"
              key={item._id}
            >
              <span>{item.sectionName}</span>
              <span onClick={() => editSection(item)}>
                <FaEdit />
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-end items-center gap-3">
        <SubmitButton
          buttonContent=<div className="flex gap-1 items-center">
            <FaChevronLeft className="h-3" />
            <span className="pr-2">Back</span>
          </div>
          onClick={() => {
            dispatch(setStep(1));
            dispatch(setIsEditCourse(true));
          }}
          buttonType="button"
          width="w-fit"
          background="bg-richblack-900 border border-richblack-600"
          text="text-richblack-200"
        />
        <SubmitButton
          buttonContent=<div className="flex gap-1 items-center">
            <span className="pl-2">Next</span>
            <FaChevronRight className="h-3" />
          </div>
          onClick={gotoNextStep}
          buttonType="button"
          width="w-fit"
        />
      </div>
    </div>
  );
};

export default CourseBuilder;
