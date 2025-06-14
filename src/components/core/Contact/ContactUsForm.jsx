import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../Form/InputField";
import SubmitButton from "../../Form/SubmitButton";
import countrycode from "../../../data/countrycode.json";
import { toast } from "react-hot-toast";
import apiConnector from "../../../services/apiConnector";
import endpoints from "../../../services/apiEndpoints";

const { CONTACT_US_FORM_SUBMISSION_API } = endpoints;

const ContactUsForm = ({ title, subtitle, alignItems = "center" }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formattedData = {
        firstName: capitalizeFirstLetter(data.firstName),
        lastName: capitalizeFirstLetter(data.lastName),
        email: data.email,
        message: capitalizeFirstLetter(data.message),
        phoneNo:
          data.countryCode && data.phoneNo
            ? `${data.countryCode}-${data.phoneNo}`
            : "",
      };
      const response = await apiConnector(
        "POST",
        CONTACT_US_FORM_SUBMISSION_API,
        formattedData
      );
      if (response?.data?.success) {
        toast.success(response.data.message);
        reset();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[600px] space-y-8">
      <div className={`flex flex-col items-${alignItems} gap-4`}>
        <div className="text-richblack-5 text-3xl font-semibold">{title}</div>
        <p className="text-richblack-100">{subtitle}</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full mt-4"
      >
        <div className="flex flex-row md:flex-col lg:flex-row w-full gap-4">
          <InputField
            label="First Name"
            name="firstName"
            placeholder="Enter first name"
            register={register}
            validation={{
              required: "First name is required",
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters",
              },
            }}
            error={errors.firstName}
            disabled={loading}
          />
          <InputField
            label="Last Name"
            name="lastName"
            placeholder="Enter last name"
            register={register}
            validation={{
              required: "Last name is required",
              minLength: {
                value: 2,
                message: "Last name must be at least 2 characters",
              },
            }}
            error={errors.lastName}
            disabled={loading}
          />
        </div>
        <InputField
          label="Email Address"
          name="email"
          placeholder="Enter email address"
          register={register}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          error={errors.email}
          disabled={loading}
        />
        <label className="w-full text-richblack-5">
          <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
            Phone Number
          </p>
          <div className="flex items-start gap-5">
            <select
              name="countryCode"
              {...register("countryCode")}
              disabled={loading}
              defaultValue="+91"
              className="bg-richblack-800 rounded-[0.5rem] p-3 pb-4 w-[75px] border-b border-richblack-500"
            >
              {countrycode.map((item, index) => (
                <option key={index} value={item.code}>
                  {item.code} - {item.country}
                </option>
              ))}
            </select>
            <input
              type="tel"
              name="phoneNo"
              placeholder="1234567890"
              {...register("phoneNo")}
              onKeyDown={(e) => {
                if (
                  !/[0-9]/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Delete" &&
                  e.key !== "ArrowLeft" &&
                  e.key !== "ArrowRight"
                ) {
                  e.preventDefault();
                }
              }}
              disabled={loading}
              className="bg-richblack-800 rounded-[0.5rem] w-full p-[12px] border-b border-richblack-500"
            />
          </div>
        </label>
        <label className="w-full text-richblack-5">
          <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
            Message<sup className="text-pink-200">*</sup>
          </p>
          <textarea
            rows="4"
            name="message"
            placeholder="Enter your message"
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters long",
              },
              maxLength: {
                value: 500,
                message: "Message cannot exceed 500 characters",
              },
            })}
            disabled={loading}
            className="bg-richblack-800 rounded-[0.5rem] w-full p-[12px] border-b border-richblack-500"
          />
          {errors.message && (
            <p className="text-pink-200 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </label>
        <SubmitButton
          buttonContent={loading ? "Sending..." : "Send Message"}
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default ContactUsForm;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
