import React, { useState } from "react";
import { setLoading } from "../redux/slices/loaderSlice";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div>
      {isEmailSent ? (
        <div>
          <h1>Check Your Email</h1>
          <p>
            Have no fear. We’ll email you instructions to reset your password.
            If you dont have access to your email we can try account recovery
          </p>
        </div>
      ) : (
        <div>
          <h1>Reset Your Password</h1>
          <p>We have sent the reset email to {email}</p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
