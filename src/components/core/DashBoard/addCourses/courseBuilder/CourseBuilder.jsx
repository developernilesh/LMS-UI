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
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import toast from "react-hot-toast";
import apiConnector from "../../../../../services/apiConnector";
import endpoints from "../../../../../services/apiEndpoints";
import NestedContent from "./NestedContent";
import Loader from "../../../../Loader/Loader";
import { handleError } from "../../../../../services/operations/handleError";
import { useNavigate } from "react-router-dom";

const CourseBuilder = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { ADD_SECTION_API, UPDATE_SECTION_API, GET_SPECIFIC_COURSE_API } =
    endpoints;
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditSection, setIsEditSection] = useState(false);
  const [sectionInfo, setSectionInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  const gotoNextStep = () => {
    if (!course || Object.keys(course).length === 0) {
      toast.error("Course Not Found!");
      return;
    }
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
    setLoading(true);
    try {
      const payload = isEditSection
        ? { sectionId: sectionInfo._id, ...data }
        : { courseId: course?._id, ...data };

      const endpoint = isEditSection ? UPDATE_SECTION_API : ADD_SECTION_API;
      const method = isEditSection ? "PUT" : "POST";

      const response = await apiConnector(method, endpoint, payload, {
        Authorization: `Bearer ${token}`,
      });

      if (response?.data?.success) {
        toast.success(response.data.message);
        fetchSpecificCourse(course?._id);
        setIsEditSection(false);
        reset();
      }
    } catch (error) {
      dispatch(handleError(navigate, error));
    } finally {
      setLoading(false);
    }
  };

  const fetchSpecificCourse = async (courseId) => {
    setLoading(true);
    try {
      const response = await apiConnector(
        "GET",
        GET_SPECIFIC_COURSE_API + `/${courseId}`
      );
      if (response?.data?.success) {
        dispatch(setCourse(response.data.data));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full rounded-md bg-richblack-900 p-6 -mt-36">
        <Loader />
      </div>
    );
  }

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
      {course?.courseContent?.length > 0 && (
        <NestedContent
          editSection={editSection}
          fetchSpecificCourse={fetchSpecificCourse}
          setLoading={setLoading}
          loading={loading}
        />
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
