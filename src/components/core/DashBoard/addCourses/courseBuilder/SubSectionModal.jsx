import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import InputField from "../../../../Form/InputField";
import SubmitButton from "../../../../Form/SubmitButton";
import apiConnector from "../../../../../services/apiConnector";
import endpoints from "../../../../../services/apiEndpoints";

const { ADD_SUB_SECTION_API, EDIT_SUB_SECTION_API } = endpoints;

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  edit = false,
  view = false,
  fetchCourseData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [previewSource, setPreviewSource] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // checking if video file or not
      if (!file.type.includes("video")) {
        toast.error("Please upload a video file");
        return;
      }
      // checking if video file type supported
      const supportedTypes = ["mp4", "webm", "ogg", "mpg"];
      const fileType = file.type.split("/")[1];
      if (!supportedTypes.includes(fileType)) {
        toast.error(
          "Video file type not supported. Please upload MP4, WebM, OGG, or MPG"
        );
        return;
      }
      // checking file size (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        toast.error("Video file size should be less than 100MB");
        return;
      }
      // setting video file and preview-source
      setVideoFile(file);
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

  useEffect(() => {
    if (view || edit) {
      reset({
        description: modalData?.description,
        title: modalData?.title,
      });
      setVideoFile(modalData?.SubSectionVideo);
      setPreviewSource(modalData?.SubSectionVideo?.secure_url);
    }
  }, []);

  const submitAddCourseForm = async (data) => {
    if (!videoFile) {
      toast.error("Lecture video is required");
      return;
    }
    const formData = new FormData();
    formData.append("videoFile", videoFile);
    formData.append("title", data.title);
    formData.append("description", data.description);

    const method = edit ? "PUT" : "POST";
    const url = edit ? EDIT_SUB_SECTION_API : ADD_SUB_SECTION_API;
    const idField = edit ? "subSectionId" : "sectionId";
    const idValue = edit ? modalData._id : modalData;

    formData.append(idField, idValue);
    try {
      setLoading(true);
      const response = await apiConnector(method, url, formData);
      if (response?.data?.success) {
        toast.success(response.data.message);
        reset();
        setVideoFile(null);
        setPreviewSource(null);
        setModalData(null);
        fetchCourseData();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-richblack-800/50 flex justify-center items-center backdrop-blur-md z-50">
      <div className="w-11/12 max-w-[600px] border border-richblack-600 rounded-lg">
        <div className="px-6 py-3 flex justify-between items-center bg-richblack-700 rounded-t-lg border-b border-richblack-600">
          <span>
            {add ? "Add" : edit ? "Edit" : view ? "View" : ""} Lecture
          </span>
          <IoClose
            className="cursor-pointer"
            onClick={() => setModalData(null)}
          />
        </div>
        <div className="bg-richblack-800 px-6 py-3 rounded-b-lg">
          <form
            onSubmit={handleSubmit(submitAddCourseForm)}
            className="w-full flex flex-col gap-4 rounded-md bg-richblack-800"
          >
            <label>
              <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
                Course Video<sup className="text-pink-200">*</sup>
              </p>
              <div className="h-[206px] w-full bg-richblack-700 rounded-lg border border-dashed border-richblack-400 flex justify-center items-center">
                <input
                  type="file"
                  className="hidden"
                  accept="video/mp4,video/webm,video/ogg,video/mpg"
                  onChange={(e) => handleFileChange(e)}
                  disabled={view ? true : false}
                />
                {previewSource ? (
                  <div className="relative h-full w-full">
                    <video
                      src={previewSource}
                      controls={view ? true : false}
                      // autoPlay={(add || edit) ? true : false}
                      className="h-full w-[371.5px] mx-auto"
                    />
                    <button
                      type="button"
                      className={`absolute top-2 right-2 bg-richblack-800 rounded-full p-2 ${
                        view ? "hidden" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setVideoFile(null);
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
                      Drag and drop a video, or&nbsp;
                      <span className="text-yellow-100 font-semibold">
                        Browse
                      </span>
                    </p>
                    <p className="text-center text-sm text-richblack-300">
                      Upload a .mp4, .webm, .mpg or .ogg File (Maximum 100MB)
                    </p>
                    <p className="flex text-sm text-richblack-300 justify-center items-center">
                      <span>Recommended resolution: 720p / 1080p</span>
                    </p>
                  </div>
                )}
              </div>
            </label>

            <InputField
              label="Lecture Title"
              name="title"
              placeholder="Enter lecture title"
              register={register}
              validation={{ required: "Lecture title is required" }}
              error={errors.title}
              background="bg-richblack-700"
              disabled={add || edit ? false : true}
            />

            <label className="relative w-full text-richblack-5">
              <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
                Lecture Description<sup className="text-pink-200">*</sup>
              </p>
              <textarea
                rows="2"
                placeholder="Enter short description of lecture"
                {...register("description", {
                  required: "Lecture description is required",
                })}
                className={`bg-richblack-700 rounded-[0.5rem] w-full p-[12px] border-b border-richblack-500 ${
                  add || edit ? "text-richblack-5" : "text-richblack-200"
                }`}
                disabled={add || edit ? false : true}
              />
              {errors.description && (
                <p className="text-pink-200 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </label>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setModalData(null)}
                disabled={loading}
                className={`rounded-md font-medium px-3 py-1 w-fit text-richblack-200 bg-richblack-900 border border-richblack-600 ${
                  loading ? "cursor-not-allowed" : ""
                }`}
              >
                {add || edit ? "Cancel" : "Close"}
              </button>
              {(add || edit) && (
                <SubmitButton
                  buttonContent={
                    loading ? "Uploading..." : add ? "Save" : "Update"
                  }
                  width="w-fit"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubSectionModal;
