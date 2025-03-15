import React from "react";
import HighlightedText from "../components/core/HomePage/HighlightedText";
import aboutus1 from "../assets/Images/aboutus1.webp";
import aboutus2 from "../assets/Images/aboutus2.webp";
import aboutus3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png";
import InfoSubSectionContainer from "../components/core/About/InfoSubSectionContainer";
import ContentBlock from "../components/core/About/ContentBlock";
import { infoParas } from "../data/aboutUs";

const AboutUs = () => {
  return (
    <>
      <section className="bg-richblack-800">
        <div className="container mx-auto flex flex-col items-center gap-4 text-white pt-10">
          <h2 className="font-semibold text-4xl text-center w-[90%] sm:w-[80%] md:w-[60%]">
            Driving Innovation in Online Education for a<br />
            <HighlightedText>Brighter Future</HighlightedText>
          </h2>
          <p className="w-[90%] sm:w-[80%] md:w-[60%] text-center text-base font-medium text-richblack-200 mb-4">
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>
          <div className="flex flex-wrap justify-center gap-6 -mb-10 mx-4">
            <img
              src={aboutus1}
              className="w-full max-w-[384px]"
              alt="aboutus1"
            />
            <img
              src={aboutus2}
              className="w-full max-w-[384px]"
              alt="aboutus2"
            />
            <img
              src={aboutus3}
              className="w-full max-w-[384px]"
              alt="aboutus3"
            />
          </div>
        </div>
      </section>
      <section className="container mx-auto flex justify-center gap-4 pt-10">
        <p className="font-semibold text-4xl text-center w-11/12 max-w-[1200px] my-24 text-richblack-100">
          "We are passionate about revolutionizing the way we learn. Our
          innovative platform
          <HighlightedText> combines technology,</HighlightedText>
          <span className="bg-gradient-to-br from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text">
            {" "}
            expertise,{" "}
          </span>
          and community to create an
          <span className="bg-gradient-to-br from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text">
            {" "}
            unparalleled educational experience.
          </span>
          "
        </p>
      </section>
      <section className="container mx-auto">
        <InfoSubSectionContainer>
          <ContentBlock
            title="Our Founding Story"
            gradient="from-[#833AB4] via-[#FD1D1D] to-[#FCB045]"
          >
            <p>{infoParas[0]}</p>
            <p>{infoParas[1]}</p>
          </ContentBlock>
          <img
            src={FoundingStory}
            className="w-full max-w-[470px]"
            alt="FoundingStory"
          />
        </InfoSubSectionContainer>

        <InfoSubSectionContainer alignItems="items-start">
          <ContentBlock
            title="Our Vision"
            gradient="from-[#E65C00] to-[#F9D423]"
          >
            <p>{infoParas[2]}</p>
          </ContentBlock>

          <ContentBlock
            title="Our Mission"
            gradient="from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"
          >
            <p>{infoParas[3]}</p>
          </ContentBlock>
        </InfoSubSectionContainer>
      </section>
    </>
  );
};

export default AboutUs;
