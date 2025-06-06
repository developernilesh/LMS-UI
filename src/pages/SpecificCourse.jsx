import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading } from "../redux/slices/loaderSlice";
import toast from "react-hot-toast";
import apiConnector from "../services/apiConnector";
import endpoints from "../services/apiEndpoints";
import Loader from "../components/Loader/Loader";
import StarRatings from "react-star-ratings";
import SubmitButton from "../components/Form/SubmitButton";
import Footer from "../components/common/Footer";
import AccordionContent from "../components/core/specificCourse/AccordionContent";
import { setCartItems } from "../redux/slices/cartSlice";
import { setUser } from "../redux/slices/profileSLice";
import ConfirmationModal from "../components/common/ConfirmationModal";

const {
  GET_SPECIFIC_COURSE_API,
  ADD_TO_CART_API,
  GET_CART_ITEMS_API,
  USER_DETAILS_API,
  ENROLL_TO_COURSE_API,
} = endpoints;

const SpecificCourse = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loader);
  const { user } = useSelector((state) => state.profile);

  const [courseinfo, setCourseInfo] = useState(null);
  const [avgRating, setAvgRating] = useState(0);
  const [isCartItem, setIsCartItem] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const fetchCategoryPageDetails = async () => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        GET_SPECIFIC_COURSE_API + `/${params.courseId}`
      );
      if (response?.data?.success) {
        const course = response.data.data;
        setCourseInfo(course);
        course.ratingAndReview?.length >= 1 &&
          setAvgRating(
            course.ratingAndReview?.reduce(
              (acc, curr) => acc + curr.rating,
              0
            ) / course.ratingAndReview?.length
          );
      }
    } catch (error) {
      toast.error(error?.message || error?.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const addToCart = async () => {
    if (user) {
      try {
        dispatch(setLoading(true));
        const response = await apiConnector("POST", ADD_TO_CART_API, {
          courseId: params.courseId,
        });
        if (response?.data?.success) {
          fetchUserDetails();
          toast.success(response.data.message);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || error?.message);
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      toast.error("Please login to add this course to cart!");
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

  const fetchUserDetails = async () => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", USER_DETAILS_API);
      if (response?.data?.success) {
        dispatch(setUser(response.data.data));
        fetchCartItems();
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const enrollFreeToCourse = async () => {
    if (user) {
      try {
        dispatch(setLoading(true));
        const response = await apiConnector("POST", ENROLL_TO_COURSE_API, {
          courseId: params.courseId,
        });
        if (response?.data?.success) {
          toast.success(response.data.message);
          navigate("/dashboard/enrolled-courses");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || error?.message);
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      toast.error("Please login to enroll to this course!");
    }
  };

  useEffect(() => {
    fetchCategoryPageDetails();
  }, []);

  useEffect(() => {
    user?.cartItems?.includes(params.courseId) && setIsCartItem(true);
    user?.courses?.includes(params.courseId) && setIsEnrolled(true);
  }, [user]);

  if (loading) return <Loader />;

  return (
    <>
      <div className="w-full bg-richblack-800">
        <div className="container mx-auto">
          <div className="w-11/12 mx-auto flex flex-col lg:flex-row gap-3 justify-between lg:items-end">
            <div className="flex flex-col gap-3 lg:pr-3 py-6">
              <h2 className="text-richblack-5 text-3xl font-medium">
                {courseinfo?.courseName}
              </h2>
              <p className="text-sm text-richblack-200">
                {courseinfo?.courseDescription}
              </p>
              <div className="flex flex-col min-[442px]:flex-row gap-3 min-[442px]:gap-4">
                <div className="flex gap-3 items-center">
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
                  <div className="text-richblack-100">
                    ({courseinfo?.ratingAndReview?.length}&nbsp;
                    {courseinfo?.ratingAndReview?.length > 1
                      ? "reviews"
                      : "review"}
                    )
                  </div>
                </div>
                <div className="hidden min-[442px]:block">&#8226;</div>
                <div className="text-richblack-100">
                  {courseinfo?.studentsEnrolled?.length || 0}&nbsp;Students
                  Enrolled
                </div>
              </div>
              <p className="text-richblack-100">
                Created by&nbsp;
                <span className="italic">
                  {courseinfo?.instructor?.firstName}&nbsp;
                  {courseinfo?.instructor?.lastName}
                </span>
              </p>
              <div className="text-richblack-100">
                Course created on: {formatDateTime(courseinfo?.createdAt)}
              </div>
              <div className="flex gap-2 flex-wrap">
                {courseinfo?.tags?.map((item, index) => (
                  <span className="italic text-blue-100" key={index}>
                    #{item?.split(" ")?.join("")}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-full max-w-[384px] bg-richblack-700 lg:mt-6 rounded-t-lg">
              <img
                src={courseinfo?.thumbNail?.secure_url}
                alt={courseinfo?.courseName}
                className="w-full h-[201px] rounded-t-lg"
              />
              <div className="text-lg font-medium text-richblack-5 pt-3 px-6">
                Rs. {formatNumberWithCommas(courseinfo?.price)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-richblack-900">
        <div className="container mx-auto">
          <div className="w-11/12 mx-auto flex flex-col-reverse lg:flex-row gap-3 justify-between items-start pb-6">
            <div className="flex flex-col gap-3 lg:pr-3 py-6 w-full">
              <div className="p-6 border border-richblack-600 w-full">
                <h3 className="text-2xl font-medium text-richblack-25 mb-3">
                  What you'll learn
                </h3>
                <div className="flex flex-col gap-1 text-richblack-200">
                  {courseinfo?.instructions?.map((item, index) => (
                    <p key={index}>&#8226;&nbsp;{item}</p>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-2xl font-medium text-richblack-25 mb-3">
                  Course Content
                </h3>
                <AccordionContent content={courseinfo?.courseContent} />
              </div>
              <div className="flex flex-col gap-1 mt-3">
                <h3 className="text-xl font-medium text-richblack-25">
                  Author
                </h3>
                <div className="flex gap-3 items-center">
                  <img
                    src={courseinfo?.instructor?.image}
                    alt={courseinfo?.instructor?.firstName}
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="text-richblack-50">
                    {courseinfo?.instructor?.firstName}&nbsp;
                    {courseinfo?.instructor?.lastName}
                  </div>
                </div>
                <p className="text-richblack-100 text-sm">
                  {courseinfo?.instructorPromise}
                </p>
              </div>
            </div>
            <div className="w-full max-w-[384px] bg-richblack-700 px-6 py-3 flex flex-col gap-3 rounded-b-lg">
              {(!user || user.accountType === "Student") && (
                <div className="flex flex-col gap-3">
                  {isEnrolled ? (
                    <SubmitButton
                      buttonContent="View Course Content"
                      buttonType="button"
                      background="bg-richblack-800 border-b border-r border-richblack-400"
                      text="text-richblack-100 font-medium"
                      onClick={() => navigate("")}
                    />
                  ) : (
                    <>
                      {isCartItem ? (
                        <SubmitButton
                          buttonContent="Go to Cart"
                          buttonType="button"
                          onClick={() => navigate("/dashboard/my-wishlist")}
                        />
                      ) : (
                        <SubmitButton
                          buttonContent="Add to Cart"
                          buttonType="button"
                          onClick={addToCart}
                        />
                      )}
                      <SubmitButton
                        buttonContent="Enroll to this course"
                        buttonType="button"
                        background="bg-richblack-800 border-b border-r border-richblack-400"
                        text="text-richblack-100 font-medium"
                        onClick={() =>
                          setConfirmationModal({
                            text1: "Click on Enroll",
                            text2:
                              "You will be enrolled to this course for free!",
                            btn1text: "Enroll",
                            btn2text: "Cancel",
                            btn1handler: () => enrollFreeToCourse(),
                            btn2handler: () => setConfirmationModal(null),
                          })
                        }
                      />
                    </>
                  )}
                  <p className="text-richblack-100 italic text-center text-sm">
                    30-Day Money-Back Guarantee
                  </p>
                </div>
              )}
              <p className="text-richblack-100">This course includes:</p>
              <div className="flex flex-col gap-1 text-caribbeangreen-300">
                <p>Full lifetime access</p>
                <p>Access on Mobile and TV</p>
                <p>Certificate of completion</p>
              </div>
              <SubmitButton
                buttonContent="Share"
                buttonType="button"
                background="bg-richblack-700 my-3"
                text="text-yellow-50 font-medium"
              />
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full bg-richblack-800 text-richblack-200">
        <Footer />
      </footer>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default SpecificCourse;

function formatNumberWithCommas(number) {
  number = Number(number);
  if (isNaN(number)) return;
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  // Format date as dd-mm-yy
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${date.getFullYear().toString().substr(-2)}`;

  return formattedDate;
}
