import ReviewSlider from "../components/common/ReviewSlider";
import Footer from "../components/common/Footer";
import Loader from "../components/Loader/Loader";
import { useSelector } from "react-redux";
import HeroSection from "../components/core/HomePage/HeroSection";
import FeaturesSection from "../components/core/HomePage/FeaturesSection";
import PopularCoursesSection from "../components/core/HomePage/PopularCoursesSection";
import CtaSection from "../components/core/HomePage/CtaSection";

export default function LearnVerseLanding() {
  const { loading } = useSelector((state) => state.loader);

  if (loading) return <Loader />;

  return (
    <div className="bg-richblack-900 text-white font-inter">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Popular Courses Section */}
      <PopularCoursesSection />

      {/* Call to Action Section */}
      <CtaSection />

      {/* Review Section */}
      <ReviewSlider />

      {/* Review Section */}
      <footer className="w-full bg-richblack-800 text-richblack-200">
        <Footer />
      </footer>
    </div>
  );
}
