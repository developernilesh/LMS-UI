import { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import SubmitButton from "../../../Form/SubmitButton";
import apiConnector from "../../../../services/apiConnector";
import endpoints from "../../../../services/apiEndpoints";
import { setUser } from "../../../../redux/slices/profileSLice";
import toast from "react-hot-toast";

const { UPLOAD_PROFILE_PICTURE_API } = endpoints;

export default function ChangeProfilePicture() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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

  const handleFileUpload = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("displayPicture", imageFile);
      const response = await apiConnector(
        "PUT",
        UPLOAD_PROFILE_PICTURE_API,
        formData
      );
      if (response?.data?.success) {
        toast.success(response.data.message);
        const presentUser = { ...user };
        presentUser.image = response.data.data.image;
        dispatch(setUser(presentUser));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full p-6 bg-richblack-800 rounded-lg border border-richblack-700">
        <div className="flex items-center gap-4">
          <img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-richblack-5">
              Change Profile Picture
            </h3>
            <div className="flex flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                disabled={isLoading}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-medium text-richblack-50 border border-richblack-600
                hover:bg-richblack-600 hover:text-richblack-5 transition-all duration-200 ease-in-out"
              >
                Select
              </button>
              <SubmitButton
                buttonContent=<div className="flex items-center">
                  <span>
                    <FiUpload />
                  </span>
                  <span>&nbsp;{isLoading ? "Uploading..." : "Upload"}</span>
                </div>
                onClick={handleFileUpload}
                buttonType="button"
                width="w-fit"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
