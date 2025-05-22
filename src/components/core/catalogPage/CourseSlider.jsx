import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import CategoryCourseCard from "./CategoryCourseCard";

const CourseSlider = ({ courses }) => {
  return (
    <Swiper
      modules={[Navigation]}
      loop={true}
      navigation={true}
      breakpoints={{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      spaceBetween={10}
    >
      {courses?.filter((course) => course.status === "Published")?.map((item) => (
        <SwiperSlide key={item._id}>
          <div className="w-full flex justify-center">
            <CategoryCourseCard data={item} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CourseSlider;
