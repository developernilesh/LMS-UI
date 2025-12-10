import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../Form/InputField";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../redux/slices/loaderSlice";
import endpoints from "../../../services/apiEndpoints";
import { setToken, setTokenExpiresIn } from "../../../redux/slices/authSlice";
import apiConnector from "../../../services/apiConnector";
import { handleError } from "../../../services/operations/handleError";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { LOGIN_API } = endpoints;

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    const { email, password } = data;
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        dispatch(setTokenExpiresIn(response?.data?.tokenExpiresIn));
        localStorage.setItem(
          "tokenExpiresIn",
          JSON.stringify(response?.data?.tokenExpiresIn)
        );
        dispatch(setToken(response?.data?.token));
        localStorage.setItem("token", JSON.stringify(response?.data?.token));
        navigate("/dashboard/my-profile");
        reset();
      }
    } catch (error) {
      dispatch(handleError(navigate, error));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <h2 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
        Welcome Back to LearnVerse
      </h2>

      <p className="flex flex-col text-[1.125rem] leading-[1.625rem] mt-4">
        <span className="text-richblack-100">to the Universe of Learning</span>
        <span className="text-blue-100 italic">
          where education meets success
        </span>
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full mt-6"
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
              message: "Invalid email format",
            },
          }}
          error={errors.email}
        />
        <div className="flex flex-col items-end">
          <div>
            <span className="italic text-pure-greys-400">
              Testing Instructor Account:
            </span>{" "}
            test.instructor@yopmail.com
          </div>
          <div>
            <span className="italic text-pure-greys-400">
              Testing Student Account:
            </span>{" "}
            wedapa9878@jarars.com
          </div>
        </div>
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
          <div className="text-end">
            <span className="italic text-pure-greys-400">
              Testing Password:
            </span>{" "}
            Abc@1234
          </div>
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
