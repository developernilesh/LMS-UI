import apiConnector from "../apiConnector";
import endpoints from "../apiEndpoints";
import { setLoading } from "../../redux/slices/loaderSlice";
import toast from "react-hot-toast";

const { SIGNUP_API, RESET_PASSWORD_TOKEN_API } = endpoints;

export const signup = (
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });
      if (response?.data?.success) {
        toast.success("Signup successful");
        navigate("/login");
      }
    } catch (error) {
      console.log("Error in signup", error);
    }
  };
};

export const resetPassowrdToken = (email, setIsEmailSent) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESET_PASSWORD_TOKEN_API, {
        email,
      });
      if (response?.data?.success) {
        toast.success(response.data.message);
        setIsEmailSent(true);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };
};
