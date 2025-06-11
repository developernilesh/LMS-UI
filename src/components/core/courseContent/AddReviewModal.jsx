import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import SubmitButton from "../../Form/SubmitButton";
import StarRatings from "react-star-ratings";
import toast from "react-hot-toast";
import { setLoading } from "../../../redux/slices/loaderSlice";
import apiConnector from "../../../services/apiConnector";
import endpoints from "../../../services/apiEndpoints";

const { ADD_RATING_REVIEW_API } = endpoints;

const AddReviewModal = ({ courseId, setopenReviewModal }) => {
  const [starRating, setStarRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const { register, handleSubmit, reset } = useForm();

  const submitReviewForm = async (data) => {
    if (starRating === 0) {
      toast.error("Please Give Star Rating");
      return;
    }
    setLoading(true);
    try {
      const response = await apiConnector("POST", ADD_RATING_REVIEW_API, {
        courseId,
        rating: starRating,
        review: data?.review,
      });
      if (response?.data?.success) {
        toast.success(response.data.message);
        setopenReviewModal(false);
        reset();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-richblack-800/60 flex justify-center items-center backdrop-blur-md z-40"
      onClick={() => !loading && setopenReviewModal(false)}
    >
      <div
        className="w-11/12 max-w-[665px] shadow-lg transform transition-all duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex flex-col">
          <div className="bg-richblack-700 border-b border-richblack-600 px-6 py-3 rounded-t-lg flex justify-between items-center scale-">
            <h3 className="font-medium text-richblack-5">Add Review</h3>
            <MdOutlineCancel
              className="scale-125 cursor-pointer"
              onClick={() => !loading && setopenReviewModal(false)}
            />
          </div>
          <div className="bg-richblack-900 px-6 py-3 rounded-b-lg flex flex-col gap-3">
            <div className="flex gap-3 justify-center items-center">
              <img
                src={user?.image}
                alt={user?.firstName}
                className="w-12 h-12 rounded-full"
              />
              <div className="text-lg text-richblack-25 font-medium">
                {user?.firstName}&nbsp;{user?.lastName}
              </div>
            </div>
            <div className="flex justify-center">
              <StarRatings
                rating={starRating}
                starDimension="25px"
                starSpacing="2px"
                starRatedColor="#E7C009"
                starEmptyColor="#424854"
                starHoverColor="#E7C009"
                changeRating={(newVal) => !loading && setStarRating(newVal)}
                numberOfStars={5}
                name="rating"
              />
            </div>
            <form onSubmit={handleSubmit(submitReviewForm)}>
              <label className="relative w-full text-richblack-5">
                <p className="text-[0.875rem] mb-1 leading-[1.375rem] text-richblack-25">
                  Add Your Experience
                </p>
                <textarea
                  rows="3"
                  placeholder="Share Details of your own experience for this course"
                  {...register("review")}
                  className="bg-richblack-800 rounded-[0.5rem] w-full p-[12px] border-b border-richblack-500"
                  disabled={loading}
                />
              </label>
              <div className="mt-3 flex justify-end items-center gap-2">
                <SubmitButton
                  buttonContent="Cancel"
                  onClick={() => setopenReviewModal(false)}
                  buttonType="button"
                  width="w-fit"
                  background="bg-richblack-800 border border-richblack-600"
                  text="text-richblack-100"
                  disabled={loading}
                />
                <SubmitButton
                  buttonContent={`${
                    loading ? "Uploading Review..." : "Submit Review"
                  }`}
                  width="w-fit"
                  disabled={loading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;
