import React from "react";
import SubmitButton from "../../../Form/SubmitButton";
import TimelineImage from "../../../../assets/Images/TimelineImage.png";
import { RiDeleteBin6Fill } from "react-icons/ri";
import StarRatings from "react-star-ratings";

const MyWishlist = () => {
  const formatWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="w-11/12">
      <p className="py-3 text-richblack-100">2 Courses in Wishlist</p>
      <div className="flex flex-col-reverse lg:flex-row w-full">
        <div className="w-full max-w-[780px] ">
          {[1, 2, 3, 4].map((item, index) => (
            <div
              className="flex flex-row lg:flex-col xl:flex-row gap-3 py-6 border-t border-richblack-700"
              key={index}
            >
              <img
                src={TimelineImage}
                alt=""
                className="w-[150px] sm:w-[185px] h-[120px] sm:h-[148px] rounded-md"
              />
              <div className="w-full flex flex-col sm:flex-row gap-3">
                <div className="w-full flex flex-col gap-2">
                  <h4 className="text-lg text-richblack-5 font-medium">
                    The Complete Python Bootcamp From Zero to Hero in Python
                  </h4>
                  <div className="text-richblack-200">Name</div>
                  <div className="flex gap-2 items-center">
                    <div className="text-yellow-100">4.5</div>
                    <StarRatings
                      rating={3.4}
                      starDimension="16px"
                      starSpacing="2px"
                      starRatedColor="#E7C009"
                      starEmptyColor="#424854"
                      // changeRating={changeRating}
                      numberOfStars={5}
                      name="rating"
                    />
                  </div>
                  <div className="text-richblack-200 text-sm">
                    Total Courses &#x2022; Lessons &#x2022; Beginner
                  </div>
                </div>
                <div className="flex flex-col-reverse sm:flex-col gap-3">
                  <SubmitButton
                    buttonContent=<div className="flex items-center">
                      <span>
                        <RiDeleteBin6Fill />
                      </span>
                      <span>&nbsp;Remove</span>
                    </div>
                    // onClick={() => navigate("/dashboard/settings")}
                    background="bg-richblack-800 border border-richblack-700"
                    text="text-[#ed4539]"
                    buttonType="button"
                    width="w-fit"
                  />
                  <div className="text-2xl font-semibold text-yellow-100 whitespace-nowrap">
                    Rs. {formatWithCommas(1700)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-richblack-700">
          <div className="w-full sm:w-[282px] ml-0 my-6 lg:ml-6 bg-richblack-800 rounded-lg p-6">
            <div className="flex flex-row lg:flex-col items-center lg:items-start gap-1 mb-4">
              <div className="text-richblack-100 text-sm">Total:&nbsp;</div>
              <div className="text-2xl font-semibold text-yellow-100">
                Rs. {formatWithCommas(3150)}
              </div>
              <div className="text-sm text-richblack-200 line-through">
                Rs. {formatWithCommas(3500)}
              </div>
            </div>
            <SubmitButton
              buttonContent="Buy Now"
              // onClick={() => navigate("/dashboard/settings")}
              buttonType="button"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWishlist;
