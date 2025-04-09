import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputField from "../../../../Form/InputField";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../../../redux/slices/loaderSlice";
import apiConnector from "../../../../../services/apiConnector";
import endpoints from "../../../../../services/apiEndpoints";
import CoursePriceInput from "./CoursePriceInput";
import TagsInputField from "./TagsInputField";
import RequirementsInputField from "./RequirementsInputField";

const { VIEW_ALL_CATEGORIES } = endpoints;

const CourseInformation = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const fetchAllCategories = async () => {
    setCategories([]);
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", VIEW_ALL_CATEGORIES);
      if (response?.data?.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const submitAddCourseForm = (data) => {
    console.log("call", data);
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <form onSubmit={handleSubmit(submitAddCourseForm)} className="w-full">
      <div className="flex flex-col gap-5 rounded-md bg-richblack-800 p-6">
        {/* Course Title Field */}
        <InputField
          label="Course Title"
          name="courseTitle"
          placeholder="Enter course title"
          register={register}
          validation={{ required: "Course title is required" }}
          error={errors.courseTitle}
          background="bg-richblack-700"
        />

        {/* Course Description Field */}
        <label className="relative w-full text-richblack-5">
          <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
            Course Description<sup className="text-pink-200">*</sup>
          </p>
          <textarea
            rows="3"
            placeholder="Enter short description"
            {...register("description", {
              required: "Course description is required",
            })}
            className="bg-richblack-700 rounded-[0.5rem] w-full p-[12px] border-b border-richblack-500"
          />
          {errors.description && (
            <p className="text-pink-200 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </label>

        {/* Course Price Field */}
        <CoursePriceInput register={register} errors={errors} />

        {/* Course Category Field */}
        <label className="relative w-full text-richblack-5">
          <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
            Select Course Category<sup className="text-pink-200">*</sup>
          </p>
          <select
            {...register("cousreCategory", {
              required: "Course category is required",
            })}
            className="bg-richblack-700 rounded-[0.5rem] w-full p-[12px] border-b border-richblack-500"
            defaultValue=""
          >
            <option value="" disabled>
              Choose a category
            </option>
            {categories?.map((item) => (
              <option value={item._id} key={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.cousreCategory && (
            <p className="text-pink-200 text-sm mt-1">
              {errors.cousreCategory.message}
            </p>
          )}
        </label>

        {/* Course Tags Field */}
        <Controller
          name="tags"
          control={control}
          rules={{
            required: "At least one tag is required",
            validate: (value) =>
              value.length > 0 || "Minimum one tag is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <TagsInputField
              value={field.value || []} // Ensure array is always defined
              onChange={field.onChange}
              error={error}
            />
          )}
        />

        {/* Benefits of Course Field */}
        <label className="relative w-full text-richblack-5">
          <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
            Benefits of the Course<sup className="text-pink-200">*</sup>
          </p>
          <textarea
            rows="3"
            placeholder="Enter benefits of taking the course"
            {...register("courseBenefit", {
              required: "Course benefit is required",
            })}
            className="bg-richblack-700 rounded-[0.5rem] w-full p-[12px] border-b border-richblack-500"
          />
          {errors.courseBenefit && (
            <p className="text-pink-200 text-sm mt-1">
              {errors.courseBenefit.message}
            </p>
          )}
        </label>

        {/* Requirements/Instructions Field */}
        <Controller
          name="instructions"
          control={control}
          rules={{
            required: "At least one instruction is required",
            validate: (value) =>
              value.length > 0 || "Minimum one instruction is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <RequirementsInputField
              value={field.value || []} // Ensure array is always defined
              onChange={field.onChange}
              error={error}
            />
          )}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default CourseInformation;
