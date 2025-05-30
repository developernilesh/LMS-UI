import React from "react";
import SubmitButton from "../../../Form/SubmitButton";
import TimelineImage from "../../../../assets/Images/TimelineImage.png";
import { RiDeleteBin6Fill } from "react-icons/ri";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../../redux/slices/loaderSlice";
import apiConnector from "../../../../services/apiConnector";
import endpoints from "../../../../services/apiEndpoints";
import Loader from "../../../Loader/Loader";
import { setCartItems } from "../../../../redux/slices/cartSlice";

const { REMOVE_FROM_CART_API, GET_CART_ITEMS_API } = endpoints;

const MyWishlist = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loader);

  const removeFromCart = async (courseId) => {
    try {
      dispatch(setLoading(true));
      const response = await apiConnector("POST", REMOVE_FROM_CART_API, {
        courseId,
      });
      if (response?.data?.success) {
        fetchCartItems();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchCartItems = async () => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_CART_ITEMS_API);
      if (response?.data?.success) {
        dispatch(setCartItems(response.data.data));
      }
    } catch (error) {
      toast.error(error?.message || error?.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (loading)
    return (
      <div className="fixed bottom-0 z-50">
        <Loader />
      </div>
    );

  return (
    <div className="w-11/12">
      <p className="py-3 text-richblack-100">
        {cartItems.length} Courses in Wishlist
      </p>
      <div className="flex flex-col-reverse lg:flex-row w-full">
        <div className="w-full max-w-[780px] ">
          {cartItems?.map((item, index) => {
            let avgRating = 0;
            if (item?.ratingAndReview?.length >= 1) {
              avgRating =
                item.ratingAndReview?.reduce(
                  (acc, curr) => acc + curr.rating,
                  0
                ) / item.ratingAndReview?.length;
            }
            return (
              <div
                className="flex flex-row lg:flex-col xl:flex-row gap-3 py-6 border-t border-richblack-700"
                key={index}
              >
                <img
                  src={item?.thumbNail?.secure_url}
                  alt=""
                  className="w-[150px] sm:w-[185px] h-[85px] sm:h-[104px] rounded-md"
                />
                <div className="w-full flex flex-col sm:flex-row gap-3">
                  <div className="w-full flex flex-col gap-1">
                    <h4 className="text-richblack-5 font-medium">
                      {item?.courseName}
                    </h4>
                    <div className="text-richblack-200 text-sm">
                      Instructor:&nbsp;
                      <span className="text-richblack-50 italic">
                        {item?.instructor?.firstName}&nbsp;
                        {item?.instructor?.lastName}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="text-yellow-100">{avgRating}</div>
                      <StarRatings
                        rating={avgRating}
                        starDimension="16px"
                        starSpacing="2px"
                        starRatedColor="#E7C009"
                        starEmptyColor="#424854"
                        // changeRating={changeRating}
                        numberOfStars={5}
                        name="rating"
                      />
                      <div className="text-sm text-richblack-200">
                        ({item?.ratingAndReview?.length} Reviews)
                      </div>
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
                      onClick={() => removeFromCart(item?._id)}
                      background="bg-richblack-800 border border-richblack-700"
                      text="text-[#ed4539]"
                      buttonType="button"
                      width="w-fit"
                    />

                    <div className="flex flex-row lg:flex-col items-center lg:items-start gap-1 mb-4">
                      <div className="text-2xl font-semibold text-yellow-100 whitespace-nowrap">
                        Rs. {formatWithCommas(0)}
                      </div>
                      <div className="text-sm text-richblack-200 line-through">
                        Rs. {formatWithCommas(item?.price)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="border-t border-richblack-700">
          <div className="w-full sm:w-[282px] ml-0 my-6 lg:ml-6 bg-richblack-800 rounded-lg p-6">
            <div className="flex flex-row lg:flex-col items-center lg:items-start gap-1 mb-4">
              <div className="text-richblack-100 text-sm">Total:&nbsp;</div>
              <div className="text-2xl font-semibold text-yellow-100 flex items-center">
                <span>Rs. {formatWithCommas(0)}&nbsp;</span>
                <span className="text-sm italic font-normal text-richblack-50">
                  (All Courses Are Free)
                </span>
              </div>
              <div className="text-sm text-richblack-200 line-through">
                Rs.{" "}
                {formatWithCommas(
                  cartItems?.reduce((acc, curr) => acc + curr.price, 0)
                )}
              </div>
            </div>
            <SubmitButton
              buttonContent="Enroll For Free"
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

const formatWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
