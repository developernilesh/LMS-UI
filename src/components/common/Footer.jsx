import React from "react";
import { FaFacebook } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import { RiTwitterXLine } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { FooterLink2 } from "../../data/footer-links";
import Logo from "../../assets/Logo/MainLogo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row">
        {/* left side */}
        <div className="w-full">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Section */}
            <div className="space-y-6">
              <div className="flex items-center text-white text-xl font-bold">
                <img src={Logo} alt="Logo" className="w-32" />
              </div>
              <div className="space-y-2">
                <h3 className="text-white font-semibold">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Affiliates
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-white transition-colors">
                  <FaFacebook size={20} />
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  <AiFillGoogleCircle size={20} />
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  <RiTwitterXLine size={20} />
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  <FaYoutube size={20} />
                </Link>
              </div>
            </div>

            {/* Resources Section */}
            <div className="space-y-2">
              <h3 className="text-white font-semibold">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Articles
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Chart Sheet
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Code challenges
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Docs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Videos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Workspaces
                  </Link>
                </li>
              </ul>
              <div className="pt-4">
                <h3 className="text-white font-semibold">Support</h3>
                <ul className="mt-2">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Help Center
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Plans & Community Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-semibold">Plans</h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Paid memberships
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      For students
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Business solutions
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold">Community</h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Forums
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Chapters
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Events
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="border-r border-richblack-700 mx-2 lg:mx-10 hidden md:block"></div>

        {/* right side */}
        <div className="w-full">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
            {FooterLink2.map((item, index) => (
              <div className="space-y-2" key={index}>
                <h3 className="text-white font-semibold">{item.title}</h3>
                <ul className="space-y-2">
                  {item.links.map((elem, idx) => (
                    <li key={idx}>
                      <Link
                        to={elem.link}
                        className="hover:text-white transition-colors"
                      >
                        {elem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-12 pt-8 border-t border-richblack-700 flex flex-col md:flex-row justify-between items-center">
        <div className="flex gap-4 mb-4 md:mb-0">
          <Link href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Cookie Policy
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Terms
          </Link>
        </div>
        <div className="text-sm">Made with ❤️ CodeHelp © 2023 LearnVerse</div>
      </div>
    </div>
  );
};

export default Footer;
