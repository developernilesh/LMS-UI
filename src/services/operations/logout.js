import toast from "react-hot-toast";
import { setToken } from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/profileSLice";

export const logout = (navigate) => {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    // dispatch(resetCart())
    localStorage.removeItem("token");
    toast.success("Logged Out");
    navigate("/login");
  };
};
