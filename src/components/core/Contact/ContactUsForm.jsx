import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../Form/InputField";
import SubmitButton from "../../Form/SubmitButton";
import countrycode from "../../../data/countrycode.json";

const ContactUsForm = ({ title, subtitle, alignItems = 'center' }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("formData : ", data);
    reset();
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
            validation={{ required: "Firstname is required" }}
            error={errors.firstName}
          />
          <InputField
            label="Last Name"
            name="lastName"
            placeholder="Enter last name"
            register={register}
            validation={{ required: "Lastname is required" }}
            error={errors.lastName}
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
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          }}
          error={errors.email}
        />
        <label className="w-full text-richblack-5">
          <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
            Phone Number<sup className="text-pink-200">*</sup>
          </p>
          <div className="flex items-start gap-5">
            <select
              name="countryCode"
              {...register("countryCode", {
                required: "countryCode is required",
              })}
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
              type="number"
              name="phoneNo"
              placeholder="1234567890"
              {...register("phoneNo", { required: "Phone no. is required" })}
              className="bg-richblack-800 rounded-[0.5rem] w-full p-[12px] border-b border-richblack-500"
            />
          </div>
          {errors.phoneNo && (
            <p className="text-pink-200 text-sm mt-1">
              {errors.phoneNo.message}
            </p>
          )}
        </label>
        <label className="w-full text-richblack-5">
          <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
            Message<sup className="text-pink-200">*</sup>
          </p>
          <textarea
            rows="4"
            name="message"
            placeholder="Enter you message"
            {...register("message", { required: "Message is required" })}
            className="bg-richblack-800 rounded-[0.5rem] w-full p-[12px] border-b border-richblack-500"
          />
          {errors.message && (
            <p className="text-pink-200 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </label>
        <SubmitButton buttonContent="Send Message" />
      </form>
    </div>
  );
};

export default ContactUsForm;
