import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import InputField from "../../../../Form/InputField";
import SubmitButton from "../../../../Form/SubmitButton";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  edit = false,
  view = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const [previewSource, setPreviewSource] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      // checking if video file or not
      if (!file.type.includes("video")) {
        toast.error("Please upload a video file");
        return;
      }
      // checking if video file type supported
      const supportedTypes = ["mp4", "webm", "ogg"];
      const fileType = file.type.split("/")[1];
      if (!supportedTypes.includes(fileType)) {
        toast.error(
          "Video file type not supported. Please upload MP4, WebM, or OGG"
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

  const submitAddCourseForm = async (data) => {
    console.log("data", data);
  };

  return (
    <div
      className="fixed inset-0 bg-richblack-700/50 flex justify-center items-center backdrop-blur-md z-50"
      onClick={() => setModalData(null)}
    >
      <div
        className="w-11/12 max-w-[665px] border border-richblack-600 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-3 flex justify-between items-center bg-richblack-700 rounded-t-lg border-b border-richblack-600">
          <span>
            {add ? "Add" : edit ? "Edit" : view ? "View" : ""} Lecture
          </span>
          <IoClose />
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
                  accept="video/mp4,video/webm,video/ogg"
                  onChange={(e) => handleFileChange(e)}
                />
                {previewSource ? (
                  <div className="relative h-full w-full">
                    <video
                      src={previewSource}
                      controls
                      className="h-full w-[371.5px] mx-auto"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-richblack-800 rounded-full p-2"
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
                      Upload a .mp4, .webm, or .ogg File (Maximum 100MB)
                    </p>
                    <p className="flex gap-5 text-sm text-richblack-300">
                      <span>Recommended resolution: 1080p</span>
                      <span>Duration: 5-15 minutes</span>
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
                className="bg-richblack-700 rounded-[0.5rem] w-full p-[12px] border-b border-richblack-500"
              />
              {errors.description && (
                <p className="text-pink-200 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </label>
            <div className="flex justify-end gap-3">
              <SubmitButton
                buttonContent={(add || edit) ? "Cancel" : "Close"}
                onClick={() => setModalData(null)}
                buttonType="button"
                width="w-fit"
                background="bg-richblack-900 border border-richblack-600"
                text="text-richblack-200"
              />
              {(add || edit) && (
                <SubmitButton
                  buttonContent={add ? "Save" : "Update"}
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
