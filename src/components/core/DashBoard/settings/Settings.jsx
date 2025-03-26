import React from "react";
import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";

const Settings = () => {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-11/12 max-w-[800px] space-y-4">
        <h3 className="text-3xl text-richblack-5 font-medium pt-3">
          Profile Settings
        </h3>
        <ChangeProfilePicture />
        <EditProfile/>
      </div>
    </div>
  );
};

export default Settings;
