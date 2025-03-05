import React, { useState } from "react";
import { useSelector } from "react-redux";

const VerifyOtp = () => {
  const { loading } = useSelector((state) => state.loader);
  const [otp, setOtp] = useState('');
  if (loading) return <Loader />;

  return (
    <div className="w-full h-screen min-h-min py-14 flex justify-center items-center">
      <div className="w-full max-w-[400px] px-4 -mt-12">
        <h3 className="text-3xl font-semibold ">Reset Complete!</h3>
        <p className=" mb-4">All done! You are all set to login.</p>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
        />
      </div>
    </div>
  );
};

export default VerifyOtp;
