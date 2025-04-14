import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputField from "../../../../Form/InputField";
import { useDispatch, useSelector } from "react-redux";
import CoursePriceInput from "./CoursePriceInput";
import TagsInputField from "./TagsInputField";
import RequirementsInputField from "./RequirementsInputField";
import SubmitButton from "../../../../Form/SubmitButton";
import { FaAngleRight, FaTimes, FaUpload } from "react-icons/fa";
import { setStep } from "../../../../../redux/slices/courseSlice";

const CourseInformation = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const [instructionsList, setInstructionsList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  
  const { categories, isEditCourse, course } = useSelector(
    (state) => state.course
  );
  const dispatch = useDispatch();

  const submitAddCourseForm = (data) => {
    console.log("form-data",data)
    // dispatch(setStep(2));
  };

  return (
    <form
      onSubmit={handleSubmit(submitAddCourseForm)}
      className="w-full flex flex-col gap-5 rounded-md bg-richblack-800 p-6"
    >
      {/* Course Title Field */}
      <InputField
        label="Course Title"
        name="courseName"
        placeholder="Enter course title"
        register={register}
        validation={{ required: "Course title is required" }}
        error={errors.courseName}
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
          {...register("courseDescription", {
            required: "Course description is required",
          })}
          className="bg-richblack-700 rounded-[0.5rem] w-full p-[12px] border-b border-richblack-500"
        />
        {errors.courseDescription && (
          <p className="text-pink-200 text-sm mt-1">
            {errors.courseDescription.message}
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
          {...register("category", {
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
        {errors.category && (
          <p className="text-pink-200 text-sm mt-1">
            {errors.category.message}
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
            tagsList={tagsList}
            setTagsList={setTagsList}
          />
        )}
      />

      {/* Course ThumbNail */}
      <label className="relative w-full text-richblack-5">
        <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
          Course Thumbnail<sup className="text-pink-200">*</sup>
        </p>
        <div className="flex items-center gap-3">
          <label
            htmlFor="thumbnailImage"
            className="flex items-center gap-2 bg-richblack-700 rounded-[0.5rem] py-3 px-4 border-b border-richblack-500 cursor-pointer"
          >
            <FaUpload className="text-richblack-300" />
            <span className="text-richblack-200">Upload Thumbnail</span>
            <input
              type="file"
              id="thumbnailImage"
              accept="image/png, image/jpeg, image/jpg"
              {...register("thumbnailImage", {
                required: "Course thumbnail is required",
                validate: (value) => {
                  if (!value[0]) return "Course thumbnail is required";
                  const fileType = value[0]?.type;
                  if (!fileType.includes("image")) {
                    return "Please upload an image file";
                  }
                  return true;
                },
              })}
              className="hidden"
              onChange={(e) => {
                register("thumbnailImage").onChange(e);
                if (e.target.files[0]) {
                  const fileReader = new FileReader();
                  fileReader.readAsDataURL(e.target.files[0]);
                  fileReader.onload = () => {
                    setValue("thumbnailImagePreview", fileReader.result);
                  };
                }
              }}
            />
          </label>
          {watch("thumbnailImagePreview") && (
            <div className="relative h-14 w-14 rounded-md overflow-hidden">
              <img
                src={watch("thumbnailImagePreview")}
                alt="Course thumbnail"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-richblack-800 rounded-full p-1"
                onClick={(e) => {
                  e.preventDefault();
                  setValue("thumbnailImage", null);
                  setValue("thumbnailImagePreview", null);
                }}
              >
                <FaTimes className="text-pink-200 text-xs" />
              </button>
            </div>
          )}
        </div>
        {errors.thumbnailImage && (
          <p className="text-pink-200 text-sm mt-1">
            {errors.thumbnailImage.message}
          </p>
        )}
      </label>

      {/* Benefits of Course Field */}
      <label className="relative w-full text-richblack-5">
        <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
          Benefits of the Course<sup className="text-pink-200">*</sup>
        </p>
        <textarea
          rows="3"
          placeholder="Enter benefits of taking the course"
          {...register("whatYouWillLearn", {
            required: "Course benefit is required",
          })}
          className="bg-richblack-700 rounded-[0.5rem] w-full p-[12px] border-b border-richblack-500"
        />
        {errors.whatYouWillLearn && (
          <p className="text-pink-200 text-sm mt-1">
            {errors.whatYouWillLearn.message}
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
            instructionsList={instructionsList}
            setInstructionsList={setInstructionsList}
          />
        )}
      />
      <div className="flex justify-end gap-3">
        {isEditCourse && (
          <SubmitButton
            buttonContent="Continue Without Saving"
            onClick={() => dispatch(setStep(2))}
            buttonType="button"
            width="w-fit"
            background="bg-richblack-900 border border-richblack-700"
            text="text-richblack-300"
          />
        )}
        <SubmitButton
          buttonContent={
            isEditCourse ? (
              "Save Changes"
            ) : (
              <div className="flex gap-1 items-center">
                <span>Next</span>
                <FaAngleRight />
              </div>
            )
          }
          width="w-fit"
        />
      </div>
    </form>
  );
};

export default CourseInformation;
