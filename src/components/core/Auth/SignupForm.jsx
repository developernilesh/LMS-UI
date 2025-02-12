import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import InputField from "../../common/InputField";

const SignupForm = ({ setIsloggedin }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState("student");

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsloggedin(true);
    toast.success("Created Account Successfully");

    const finalData = { ...data, accountType };
    console.log(finalData);

    navigate("/dashboard");
  };

  return (
    <div>
      <div className="mt-6 bg-richblack-800 p-1 flex gap-1 rounded-full max-w-max">
        <button
          className={`${
            accountType === "student"
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200"
          } py-2 px-5 rounded-full transition-all duration-200`}
          onClick={() => setAccountType("student")}
        >
          Student
        </button>
        <button
          className={`${
            accountType === "instructor"
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200"
          } py-2 px-5 rounded-full transition-all duration-200`}
          onClick={() => setAccountType("instructor")}
        >
          Instructor
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full mt-4"
      >
        <div className="flex flex-row md:flex-col lg:flex-row w-full gap-4">
          <InputField
            label="Firstname"
            name="firstName"
            placeholder="Enter Firstname"
            register={register}
            validation={{ required: "Firstname is required" }}
            error={errors.firstName}
          />
          <InputField
            label="Lastname"
            name="lastName"
            placeholder="Enter Lastname"
            register={register}
            validation={{ required: "Lastname is required" }}
            error={errors.lastName}
          />
        </div>

        <InputField
          label="Email Address"
          name="email"
          placeholder="Enter email address"
          register={register}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^\S+@$/i,
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
            validation={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
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
        </div>

        <div className="relative">
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            register={register}
            validation={{
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            }}
            error={errors.confirmPassword}
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
      </form>
    </div>
  );
};

export default SignupForm;
