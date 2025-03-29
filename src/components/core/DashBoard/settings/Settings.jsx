import React from "react";
import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import Loader from "../../../Loader/Loader";
import { useSelector } from "react-redux";

const Settings = () => {
  const { loading } = useSelector((state) => state.loader);

  if (loading)
    return (
      <div className="fixed bottom-0 z-50">
        <Loader />
      </div>
    );

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-11/12 max-w-[800px] space-y-4">
        <h3 className="text-3xl text-richblack-5 font-medium pt-3">
          Profile Settings
        </h3>
        <ChangeProfilePicture />
        <EditProfile />
      </div>
    </div>
  );
};

export default Settings;
