import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import { useParams } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import InputField from "../components/core/Form/InputField";
import { useForm } from "react-hook-form";
import SubmitButton from "../components/core/Form/SubmitButton";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loading } = useSelector((state) => state.loader);
  const { token } = useParams();

  const onSubmit = (data) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }
    reset();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full pt-[20vh] pb-5 flex justify-center items-center">
      <div className="w-full max-w-[400px] px-4">
        <h3>Choose New Password</h3>
        <p>Almost done. Enter your new password and youre all set.</p>
        <div className="text-xl font-semibold">Token: {token}</div>
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full mt-4"
      >

        <div className="relative">
          <InputField
            label="Password"
            name="newPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            register={register}
            validation={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            error={errors.newPassword}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] cursor-pointer"
          >
            {showPassword ? (
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
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            register={register}
            validation={{
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("newPassword") || "Password does not match",
            }}
            error={errors.confirmNewPassword}
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-[38px] cursor-pointer"
          >
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </div>

        <button className="w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6">
          Create Account
        </button>

        {/* <div className="text-center">
          <span className="text-richblack-200">Already have an account?</span>
          &nbsp;
          <span>
            <Link to="/login" className="text-blue-100 underline">
              Sign in
            </Link>
          </span>
        </div> */}
      </form>
      </div>
    </div>
  );
};

export default ResetPassword;
