import toast from "react-hot-toast";
import { setToken } from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/profileSLice";

export const logout = (navigate) => {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiresIn");
    toast.success("Logged Out");
    navigate("/login");
  };
};
