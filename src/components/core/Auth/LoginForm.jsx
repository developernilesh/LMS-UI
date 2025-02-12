import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../common/InputField";

const LoginForm = ({ setIsloggedin }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    setIsloggedin(true);
    toast.success("Logged In Successfully");
    console.log(data);
    navigate("/dashboard");
  };

  return (
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
        <Link to="#">
          <p className="text-xs mt-1 text-blue-100 max-w-max ml-auto">
            Forgot Password?
          </p>
        </Link>
      </div>

      <button className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6">
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
