import React, { useEffect, useState } from "react";
import apiConnector from "../../services/apiConnector";
import endpoints from "../../services/apiEndpoints";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import StarRatings from "react-star-ratings";

const { GET_ALL_RATING_REVIEW_API } = endpoints;

const ReviewSlider = () => {
  const [allReviews, setAllReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllReviews = async () => {
    try {
      const response = await apiConnector("GET", GET_ALL_RATING_REVIEW_API);
      if (response?.data?.success) {
        setAllReviews(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  return isLoading ? null : (
    <div className="container mx-auto pb-12">
      <div className="w-11/12 mx-auto">
        <div className="text-2xl text-richblack-5 text-center font-semibold py-6">
          Reviews From Other Learners
        </div>
        <Swiper
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            waitForTransition: true,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          spaceBetween={10}
        >
          {allReviews
            ?.filter((item) => item.course)
            ?.map((item) => (
              <SwiperSlide key={item._id}>
                <div className="w-full flex justify-center">
                  <div className="w-full max-w-[300px] bg-richblack-700 cursor-pointer flex flex-col gap-3 rounded-lg p-3">
                    <div className="bg-richblack-800 flex flex-col gap-3 rounded-lg p-3">
                      <div className="flex gap-2 items-center">
                        <img
                          src={item.user?.image}
                          alt={item.user?.firstName}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="text-sm font-bold text-ricjblack-5">
                          {item.user?.firstName}&nbsp;{item.user?.lastName}
                        </div>
                      </div>
                      <p className="text-sm font-medium text-richblack-50">
                        {item?.course?.courseName}
                      </p>
                      <div className="flex gap-2 items-center">
                        <div className="text-sm font-semibold text-[#E7C009]">
                          {item?.rating}
                        </div>
                        <StarRatings
                          rating={item?.rating}
                          starDimension="16px"
                          starSpacing="2px"
                          starRatedColor="#E7C009"
                          starEmptyColor="#424854"
                          numberOfStars={5}
                          name="rating"
                        />
                      </div>
                      <p className="text-xs font-medium text-richblack-200">
                        {item?.review}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSlider;
