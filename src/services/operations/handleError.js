import toast from "react-hot-toast";
import { logout } from "./logout";

export const handleError = (navigate, error, showToast = true) => {
  return (dispatch) => {
    showToast
      ? toast.error(error?.response?.data?.message || "Something Went Wrong!")
      : console.error(error);
    if (
      error.response.data.message ===
        "Something went wrong while verifying token" ||
      error.response.statusText === "Unauthorized" ||
      error.message === "Request failed with status code 401"
    ) {
      dispatch(logout(navigate));
    }
  };
};
