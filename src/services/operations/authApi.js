import apiConnector from "../apiConnector";
import { authEndpoints } from "../apiEndpoints";
import { setLoading } from "../../redux/slices/loaderSlice";

const { SIGNUP_API } = authEndpoints;

export const signup = async (
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
      if (response.data.success) {
        toast.success("Signup successful");
        navigate("/login");
      }
    } catch (error) {
      console.log("Error in signup", error);
    }
  };
};
