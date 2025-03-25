import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import InputField from "../components/Form/InputField";
import { useForm } from "react-hook-form";
import SubmitButton from "../components/Form/SubmitButton";
import toast from "react-hot-toast";
import { setLoading } from "../redux/slices/loaderSlice";
import apiConnector from "../services/apiConnector";
import endpoints from "../services/apiEndpoints";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { CHANGE_PASSWORD_API } = endpoints;

  const onSubmit = async (data) => {
    const { newPassword, confirmNewPassword } = data;
    if (newPassword !== confirmNewPassword) {
      toast.error("Confirm password doesn't match the new passowrd.");
      return;
    }
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", CHANGE_PASSWORD_API, {
        ...data,
        email: user.email,
      });
      if (response?.data?.success) {
        toast.success(response.data.message);
        navigate("/dashboard/my-profile");
        reset();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-[calc(100vh-130px)]">
      <div className="w-full max-w-[400px] px-4">
        <h3 className="text-3xl font-semibold">Change Your Password</h3>
        <p>Keep your account secure!</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full mt-4"
        >
          <div className="relative">
            <InputField
              label="Old Password"
              name="oldPassword"
              type={showOldPassword ? "text" : "password"}
              placeholder="Enter Old password"
              register={register}
              validation={{
                required: "Old Password is required",
              }}
              error={errors.oldPassword}
            />
            <span
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-3 top-[38px] cursor-pointer"
            >
              {showOldPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>
          <div className="relative">
            <InputField
              label="New Password"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter New password"
              register={register}
              validation={{
                required: "New Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }}
              error={errors.newPassword}
            />
            <span
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-[38px] cursor-pointer"
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>

          <div className="relative">
            <InputField
              label="Confirm Password"
              name="confirmNewPassword"
              type={showConfirmNewPassword ? "text" : "password"}
              placeholder="Enter Confirm password"
              register={register}
              validation={{
                required: "Confirm New Password is required",
              }}
              error={errors.confirmNewPassword}
            />
            <span
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
              className="absolute right-3 top-[38px] cursor-pointer"
            >
              {showConfirmNewPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>
          <SubmitButton buttonContent="Reset Password" />
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
