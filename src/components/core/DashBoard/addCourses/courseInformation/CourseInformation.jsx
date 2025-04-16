import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputField from "../../../../Form/InputField";
import { useDispatch, useSelector } from "react-redux";
import CoursePriceInput from "./CoursePriceInput";
import TagsInputField from "./TagsInputField";
import RequirementsInputField from "./RequirementsInputField";
import SubmitButton from "../../../../Form/SubmitButton";
import {
  FaAngleRight,
  FaCloudUploadAlt,
  FaTimes,
  FaUpload,
} from "react-icons/fa";
import { setStep } from "../../../../../redux/slices/courseSlice";
import toast from "react-hot-toast";

const CourseInformation = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm();

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const [instructionsList, setInstructionsList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [previewSource, setPreviewSource] = useState(null);

  const { categories, isEditCourse, course } = useSelector(
    (state) => state.course
  );

  useEffect(() => {
    if (course) {
      reset({
        courseName: course?.courseName,
        courseDescription: course?.courseDescription,
        price: course?.price,
        tags: course?.tags,
        whatYouWillLearn: course?.whatYouWillLearn,
        category: course?.category,
        instructions: course?.instructions,
        thumbnailImage: course?.thumbnailImage,
      });
    }
  }, [course]);

  const isFormUpdated = (currentValues) => {
    if (
      currentValues.courseName !== course.courseName ||
      currentValues.courseDescription !== course.courseDescription ||
      currentValues.price !== course.price ||
      //currentValues.tags.toString() !== course.tags.toString() ||
      currentValues.whatYouWillLearn !== course.whatYouWillLearn ||
      currentValues.category._id !== course.category._id ||
      //currentValues.thumbnailImage !== course.thumbnailImage ||
      currentValues.instructions.toString() !== course.instructions.toString()
    )
      return true;
    else return false;
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const submitAddCourseForm = (data) => {
    if (isEditCourse && isFormUpdated(data)) {
      // call edit-course api
    } else if (isEditCourse && !isFormUpdated(data)) {
      toast.error("No changes made so far");
    } else {
      console.log("form-data", data);
      // call add course api
    }
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
      <label>
        <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
          Course Thumbnail<sup className="text-pink-200">*</sup>
        </p>
        <div className="h-[206px] w-full bg-richblack-700 rounded-lg border border-dashed border-richblack-400 flex justify-center items-center">
          <input
            type="file"
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
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => {
              if (e.target.files[0]) {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(e.target.files[0]);
                fileReader.onload = () => {
                  setPreviewSource(fileReader.result);
                };
              }
            }}
          />
          {previewSource ? (
            <div className="relative h-full">
              <img
                src={previewSource}
                alt="Course thumbnail"
                className="h-full w-[371.5px] object-cover"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-richblack-800 rounded-full p-2"
                onClick={(e) => {
                  e.preventDefault();
                  setValue("thumbnailImage", null);
                  setPreviewSource(null);
                }}
              >
                <FaTimes className="text-pink-200" />
              </button>
            </div>
          ) : (
            <div
              onClick={handleFileInputClick}
              className="flex flex-col items-center gap-3 cursor-pointer"
            >
              <FaCloudUploadAlt className="text-4xl" />
              <p className="text-center">
                Drag and drop an image, or&nbsp;
                <span className="text-yellow-100 font-semibold">Browse</span>
              </p>
              <p className="text-center text-sm">
                Upload a .jpg, .jpeg, or .png File (Maximum 6MB)
              </p>
              <p className="flex gap-5 text-sm">
                <span>Aspect ratio 16:9</span>
                <span>Recommended size 1024x576</span>
              </p>
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
