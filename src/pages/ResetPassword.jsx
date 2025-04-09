import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import { Link, useParams } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import InputField from "../components/Form/InputField";
import { useForm } from "react-hook-form";
import SubmitButton from "../components/Form/SubmitButton";
import toast from "react-hot-toast";
import { GoArrowLeft } from "react-icons/go";
import { setLoading } from "../redux/slices/loaderSlice";
import apiConnector from "../services/apiConnector";
import endpoints from "../services/apiEndpoints";
import Footer from "../components/common/Footer";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [isResetSucessful, setIsResetSucessful] = useState(false);

  const { loading } = useSelector((state) => state.loader);
  const { token } = useParams();
  const dispatch = useDispatch();
  const { RESET_PASSWORD_API } = endpoints;

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    const { newPassword, confirmNewPassword } = data;
    try {
      const response = await apiConnector("POST", RESET_PASSWORD_API, {
        resetPassword: newPassword,
        confirmResetPassword: confirmNewPassword,
        token,
      });
      if (response?.data?.success) {
        toast.success(response.data.message);
        setIsResetSucessful(true);
        reset();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="w-full h-screen min-h-min py-14 flex justify-center items-center">
        <div className="w-full max-w-[400px] px-4 -mt-12">
          {isResetSucessful ? (
            <>
              <h3 className="text-3xl font-semibold ">Reset Complete!</h3>
              <p className=" mb-4">All done! You are all set to login.</p>
              <Link to="/login">
                <SubmitButton
                  buttonContent="Return to Login"
                  buttonType="button"
                />
              </Link>
            </>
          ) : (
            <>
              <h3 className="text-3xl font-semibold">Choose New Password</h3>
              <p>Almost done! Enter your new password and youre all set.</p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 w-full mt-4"
              >
                <div className="relative">
                  <InputField
                    label="New Password"
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter password"
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
                    placeholder="Confirm password"
                    register={register}
                    validation={{
                      required: "Confirm New Password is required",
                      // validate: (value) =>
                      //   value === watch("newPassword") || "Password does not match",
                    }}
                    error={errors.confirmNewPassword}
                  />
                  <span
                    onClick={() =>
                      setShowConfirmNewPassword(!showConfirmNewPassword)
                    }
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
              <div className="flex justify-left">
                <Link to="/login">
                  <button className="flex items-center gap-2 mt-3">
                    <GoArrowLeft />
                    <span>Back to Login</span>
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      <footer className="w-full bg-richblack-800 text-richblack-200">
        <Footer />
      </footer>
    </>
  );
};

export default ResetPassword;
