import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputField from "../../../../Form/InputField";
import { useDispatch, useSelector } from "react-redux";
import CoursePriceInput from "./CoursePriceInput";
import TagsInputField from "./TagsInputField";
import RequirementsInputField from "./RequirementsInputField";
import SubmitButton from "../../../../Form/SubmitButton";
import { FaChevronRight, FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { setCourse, setStep } from "../../../../../redux/slices/courseSlice";
import toast from "react-hot-toast";
import apiConnector from "../../../../../services/apiConnector";
import endpoints from "../../../../../services/apiEndpoints";
import Loader from "../../../../Loader/Loader";

const { CREATE_COURSE_API, EDIT_COURSE_API, GET_SPECIFIC_COURSE_API } =
  endpoints;

const CourseInformation = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { categories, isEditCourse, course } = useSelector(
    (state) => state.course
  );

  const [loading, setLoading] = useState(false);
  const [instructionsList, setInstructionsList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [previewSource, setPreviewSource] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (course) {
      reset({
        courseName: course?.courseName,
        courseDescription: course?.courseDescription,
        price: course?.price,
        tags: course?.tags,
        instructorPromise: course?.instructorPromise,
        category: course?.category,
        instructions: course?.instructions,
      });
      setImageFile(course?.thumbNail);
      setPreviewSource(course?.thumbNail?.secure_url);
      setTagsList(course?.tags);
      setInstructionsList(course?.instructions);
    }
  }, [course]);

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
      toast.error(error?.message || error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // checking if image file or not
      if (!file.type.includes("image")) {
        toast.error("Please upload an image file");
        return;
      }
      // checking if image file type supported
      const supportedTypes = ["jpg", "jpeg", "png"];
      const fileType = file.type.split("/")[1];
      if (!supportedTypes.includes(fileType)) {
        toast.error("Image file type not supported");
        return;
      }
      // setting image file and preview-source
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const submitAddCourseForm = async (data) => {
    if (!imageFile) {
      toast.error("Course thumbnail is required");
      return;
    }
    const formData = new FormData();
    formData.append("thumbnail", imageFile);
    formData.append("courseName", data.courseName);
    formData.append("courseDescription", data.courseDescription);
    formData.append("price", data.price);
    formData.append("tags", JSON.stringify(data.tags));
    formData.append("instructorPromise", data.instructorPromise);
    formData.append("category", data.category);
    formData.append("instructions", JSON.stringify(data.instructions));
    if (isEditCourse && course?._id) {
      formData.append("courseId", course._id);
    }
    try {
      setLoading(true);
      const endpoint = isEditCourse ? EDIT_COURSE_API : CREATE_COURSE_API;
      const method = isEditCourse ? "PUT" : "POST";

      const response = await apiConnector(method, endpoint, formData);
      if (response?.data?.success) {
        toast.success(response.data.message);
        reset();
        setImageFile(null);
        setPreviewSource(null);
        fetchSpecificCourse(response.data.courseInfo._id);
        dispatch(setStep(2));
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

      {/* What will you learn */}
      <Controller
        name="instructions"
        control={control}
        rules={{
          required: "At least one point is required",
          validate: (value) =>
            value.length > 0 || "At least one point is required",
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

      {/* Course ThumbNail */}
      <label>
        <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
          Course Thumbnail<sup className="text-pink-200">*</sup>
        </p>
        <div className="h-[206px] w-full bg-richblack-700 rounded-lg border border-dashed border-richblack-400 flex justify-center items-center">
          <input
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => handleFileChange(e)}
          />
          {previewSource ? (
            <div className="relative h-full">
              <img
                src={previewSource}
                alt="Course-thumbnail"
                className="h-full w-[371.5px]"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-richblack-800 rounded-full p-2"
                onClick={(e) => {
                  e.preventDefault();
                  setImageFile(null);
                  setPreviewSource(null);
                }}
              >
                <FaTimes className="text-pink-200" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 cursor-pointer">
              <FaCloudUploadAlt className="text-4xl" />
              <p className="text-center text-richblack-200">
                Drag and drop an image, or&nbsp;
                <span className="text-yellow-100 font-semibold">Browse</span>
              </p>
              <p className="text-center text-sm text-richblack-300">
                Upload a .jpg, .jpeg, or .png File (Maximum 6MB)
              </p>
              <p className="flex gap-5 text-sm text-richblack-300">
                <span>Aspect ratio 16:9</span>
                <span>Recommended size 1024x576</span>
              </p>
            </div>
          )}
        </div>
      </label>

      {/* Promise to students */}
      <label className="relative w-full text-richblack-5">
        <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
          Promise Statement For Students<sup className="text-pink-200">*</sup>
        </p>
        <textarea
          rows="3"
          placeholder="Enter your promise statement for the students"
          {...register("instructorPromise", {
            required: "Promise Statement is required",
          })}
          className="bg-richblack-700 rounded-[0.5rem] w-full p-[12px] border-b border-richblack-500"
        />
        {errors.instructorPromise && (
          <p className="text-pink-200 text-sm mt-1">
            {errors.instructorPromise.message}
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
      <div className="flex justify-end gap-3">
        {isEditCourse && (
          <SubmitButton
            buttonContent="Continue Without Saving"
            onClick={() => dispatch(setStep(2))}
            buttonType="button"
            width="w-fit"
            background="bg-richblack-900 border border-richblack-600"
            text="text-richblack-200"
          />
        )}
        <SubmitButton
          buttonContent={
            isEditCourse ? (
              "Save Changes"
            ) : (
              <div className="flex gap-1 items-center">
                <span className="pl-2">Next</span>
                <FaChevronRight className="h-3" />
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
