import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import SubmitButton from "../components/core/Form/SubmitButton";
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { GiBackwardTime } from "react-icons/gi";
import { setLoading } from "../redux/slices/loaderSlice";
import endpoints from "../services/apiEndpoints";
import apiConnector from "../services/apiConnector";
import toast from "react-hot-toast";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");

  const { loading } = useSelector((state) => state.loader);
  const { signupData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { SIGNUP_API, SEND_OTP_API } = endpoints;

  const verifyGivenOtp = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        ...signupData,
        otp,
      });
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const resendOtp = async () => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SEND_OTP_API, {
        email: signupData.email,
      });
      if (response?.data?.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="w-full h-screen min-h-min py-14 flex justify-center items-center">
      <div className="w-full max-w-[400px] px-4 -mt-12">
        <h3 className="text-3xl font-semibold">Verify Email</h3>
        <p className="mb-6">
          A verification code has been sent to you. Enter the code below.
        </p>
        <form onSubmit={verifyGivenOtp}>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            containerStyle="flex justify-between gap-4 mb-6" // Ensures inputs are evenly spaced
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                className="bg-richblack-800 rounded-[0.5rem] p-[12px] text-center text-white border border-transparent focus:border-yellow-50 outline-none"
                style={{ width: "100%" }}
              />
            )}
          />
          <SubmitButton buttonContent="Verify email" />
        </form>
        <div className="flex justify-between">
          <Link to="/login">
            <button className="flex items-center gap-2 mt-3">
              <GoArrowLeft />
              <span>Back to Login</span>
            </button>
          </Link>
          <button
            onClick={resendOtp}
            className="flex items-center gap-1 mt-3 text-blue-100"
          >
            <GiBackwardTime />
            <span>Resend otp</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
