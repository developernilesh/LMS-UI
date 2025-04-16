import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../../Form/SubmitButton";
import InputField from "../../../Form/InputField";
import countrycode from "../../../../data/countrycode.json";
import { useEffect } from "react";
import endpoints from "../../../../services/apiEndpoints";
import { setLoading } from "../../../../redux/slices/loaderSlice";
import toast from "react-hot-toast";
import { setUser } from "../../../../redux/slices/profileSLice";
import apiConnector from "../../../../services/apiConnector";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];
const { PROFILE_UPDATE_API } = endpoints;

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        countryCode: user?.additionalDetails?.contact?.split("-")[0] || "+91",
        phoneNo: user?.additionalDetails?.contact?.split("-")[1] || "",
        dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
        gender: user?.additionalDetails?.gender || "",
        about: user?.additionalDetails?.about || "",
      });
    }
  }, [user, reset]);

  const submitProfileForm = async (data) => {
    const payload = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      contact: data?.phoneNo ? `${data.countryCode}-${data.phoneNo}` : "",
      dateOfBirth: data?.dateOfBirth || null,
      gender: data?.gender || "",
      about: data?.about || "",
    };
    try {
      dispatch(setLoading(true));
      const response = await apiConnector("PUT", PROFILE_UPDATE_API, payload);
      if (response?.data?.success) {
        toast.success(response.data.message);
        const presentUser = { ...user };
        presentUser.firstName = response.data.userDetails.firstName;
        presentUser.lastName = response.data.userDetails.lastName;
        presentUser.image = response.data.userDetails.image;
        presentUser.additionalDetails = { ...response.data.profileDetails };
        dispatch(setUser(presentUser));
        navigate("/dashboard/my-profile");
      }
    } catch (error) {
      console.log("error : ", error);
      toast.error(error?.response?.data?.message || "Something Went Wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="flex flex-col gap-5 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
          <h3 className="text-lg font-medium text-richblack-5">
            Profile Information
          </h3>
          <div className="flex flex-col gap-5 lg:flex-row">
            <InputField
              label="First Name"
              name="firstName"
              placeholder="Enter first name"
              register={register}
              validation={{ required: "Firstname is required" }}
              error={errors.firstName}
              background="bg-richblack-700"
            />
            <InputField
              label="Last Name"
              name="lastName"
              placeholder="Enter last name"
              register={register}
              validation={{ required: "Lastname is required" }}
              error={errors.lastName}
              background="bg-richblack-700"
            />
          </div>
          <div className="flex flex-col gap-5 lg:flex-row">
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
              background="bg-richblack-700"
              disabled={true}
            />
            <label className="w-full text-richblack-5">
              <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
                Phone Number
              </p>
              <div className="flex items-start gap-2">
                <select
                  name="countryCode"
                  {...register("countryCode", {
                    required: false,
                  })}
                  className="bg-richblack-700 rounded-[0.5rem] pl-3 pr-2 py-3 pb-4 w-[75px] border-b border-richblack-500"
                >
                  {countrycode.map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.code.length === 2
                        ? `${item.code}\u00A0\u00A0\u00A0\u00A0- ${item.country}`
                        : item.code.length === 3
                        ? `${item.code}\u00A0\u00A0\u00A0- ${item.country}`
                        : item.code.length === 4
                        ? `${item.code}\u00A0\u00A0- ${item.country}`
                        : `${item.code} - ${item.country}`}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="phoneNo"
                  placeholder="Enter contact number"
                  onKeyDown={(e) => {
                    // Allow only numbers and control keys
                    if (!/[0-9]|Backspace|Delete|Tab|Arrow/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  {...register("phoneNo", {
                    required: false,
                    maxLength: {
                      value: 15,
                      message:
                        "Contact no should not be greater than 15 digits",
                    },
                    minLength: {
                      value: 7,
                      message: "Contact no should not be less than 7 digits",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Only numbers are allowed",
                    },
                  })}
                  className="bg-richblack-700 rounded-[0.5rem] w-full p-[12px] border-b border-richblack-500"
                />
              </div>
              {errors.phoneNo && (
                <p className="text-pink-200 text-sm mt-1">
                  {errors.phoneNo.message}
                </p>
              )}
            </label>
          </div>
          <div className="flex flex-col gap-5 lg:flex-row">
            <InputField
              type="date"
              isMandatory={false}
              label="Date of Birth"
              name="dateOfBirth"
              register={register}
              validation={{ required: false }}
              error={errors.dateOfBirth}
              background="bg-richblack-700"
            />
            <label className="relative w-full text-richblack-5">
              <p className="text-[0.875rem] mb-1 leading-[1.375rem]">Gender</p>
              <select
                name="gender"
                {...register("gender", { required: false })}
                className="bg-richblack-700 rounded-[0.5rem] w-full p-3 py-4 border-b border-richblack-500 text-richblack-5"
              >
                <option value="">Select</option>
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="relative w-full text-richblack-5">
              <p className="text-[0.875rem] mb-1 leading-[1.375rem]">About</p>
              <textarea
                rows="2"
                placeholder="Enter bio details"
                {...register("about", { required: false })}
                className="bg-richblack-700 rounded-[0.5rem] w-full p-[12px] border-b border-richblack-500"
              />
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                navigate("/dashboard/my-profile");
              }}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
              Cancel
            </button>
            <SubmitButton buttonContent="Save" width="w-fit" />
          </div>
        </div>
      </form>
    </>
  );
}
