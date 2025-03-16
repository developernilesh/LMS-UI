import React, { useState } from "react";
import { setLoading } from "../redux/slices/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import InputField from "../components/Form/InputField";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import SubmitButton from "../components/Form/SubmitButton";
import Loader from "../components/Loader/Loader";
import endpoints from "../services/apiEndpoints";
import toast from "react-hot-toast";
import apiConnector from "../services/apiConnector";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { RESET_PASSWORD_TOKEN_API } = endpoints;

  const { loading } = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState();

  const sendResetPasswordEmail = async (email) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESET_PASSWORD_TOKEN_API, {
        email,
      });
      if (response?.data?.success) {
        toast.success(response.data.message);
        setIsEmailSent(true);
        return true;
      }
      return false;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong!");
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onSubmit = async (data) => {
    const { email } = data;
    const isMailSuccessfullySent = await sendResetPasswordEmail(email);
    if (isMailSuccessfullySent) {
      setEmail(email);
      reset();
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-screen min-h-min py-14 flex justify-center items-center">
      <div className="w-full max-w-[400px] px-4 -mt-12">
        {isEmailSent ? (
          <div className="flex flex-col gap-6">
            <h3 className="font-semibold text-3xl">Check email</h3>
            <p>
              We have sent the reset email to:
              <br /> {email}
            </p>
            <SubmitButton
              buttonContent="Resend Email"
              buttonType="button"
              onClick={() => sendResetPasswordEmail(email)}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-3xl">Check Your Email</h3>
              <p>
                Have no fear. We’ll email you instructions to reset your
                password. If you dont have access to your email we can try
                account recovery
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 w-full"
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
                    message: "Your email format is not valid",
                  },
                }}
                error={errors.email}
              />
              <SubmitButton buttonContent="Reset Password" />
            </form>
          </div>
        )}
        <div className="flex justify-left">
          <Link to="/login">
            <button className="flex items-center gap-2 mt-3">
              <GoArrowLeft />
              <span>Back to Login</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
