import toast from "react-hot-toast";
import { setTokenExpiresIn } from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/profileSLice";

export const logout = (navigate) => {
  return (dispatch) => {
    dispatch(setTokenExpiresIn(Date.now() - 100000));
    dispatch(setUser(null));
    localStorage.removeItem("tokenExpiresIn");
    toast.success("Logged Out");
    navigate("/login");
  };
};
