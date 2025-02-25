import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import InputField from "../../core/Form/InputField";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    toast.success("Logged In Successfully");
    console.log(data);
    reset()
  };

  return (
    <>
      <h2 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
        Welcome Back to LearnVerse
      </h2>

      <p className="flex flex-col text-[1.125rem] leading-[1.625rem] mt-4">
        <span className="text-richblack-100">to the Universe of Learning</span>
        <span className="text-blue-100 italic">where education meets success</span>
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-4 mt-6"
      >
        <InputField
          label="Email Address"
          name="email"
          placeholder="Enter email address"
          register={register}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Please include '@' in your email address",
            },
          }}
          error={errors.email}
        />

        <div className="relative">
          <InputField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            register={register}
            validation={{ required: "Password is required" }}
            error={errors.password}
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
          <Link to="/forgot-password">
            <p className="text-xs mt-1 text-blue-100 max-w-max ml-auto">
              Forgot Password?
            </p>
          </Link>
        </div>

        <button className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6">
          Sign In
        </button>

        <div className="text-center">
          <span className="text-richblack-200">Not yet registered?</span>&nbsp;
          <span>
            <Link to="/signup" className="text-blue-100 underline">
              Sign up
            </Link>
          </span>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
