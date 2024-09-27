import React from "react";
import { Link } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaRegCopyright,
  FaTwitter,
} from "react-icons/fa";
import logo from "../assets/favicon_io/favicon-32x32.png";
import Email from "./contact/Email";
import Phone from "./contact/Phone";

const Footer = () => {
  const quickLink = ["Home", "About", "Contact"];

  const copyrightLinks = [
    "Terms of Use",
    // <RxDividerVertical />,
    "Privacy Policy",
    // <RxDividerVertical />,
    "Cookie Policy",
  ];
  return (
    <>
      <footer className="bg-slate-100">
        <div className="w-10/12 mx-auto flex flex-col gap-8 pt-10">
          <div className="content flex">
            <div className="grid md:grid-cols-2 gap-4 items-start justify-between">
              {/* <div className="about flex flex-col gap-6">
                <div className="about-text flex flex-col gap-4">
                  <p className="font-semibold text-lg">About</p>
                  <p>
                    Welcome to our Diabetes Prediction platform! We're dedicated
                    to empowering individuals with tools and knowledge to manage
                    and understand their health better.
                  </p>
                </div>
                <Email />
                <Phone />
              </div> */}
            </div>
          </div>

          <hr className="border-black" />

          <div className="copyright flex flex-col gap-4 md:flex-row items-center justify-between py-4">
            <div className="flex gap-2 items-center">
              <img src={logo} alt="" className="w-14" />
              <div>
                <h2>Diabetes Prediction</h2>
                <div className="copyright-info flex items-center gap-1">
                  <FaRegCopyright />
                  All Rights Reservd
                </div>
              </div>
            </div>
            <div className="quick-link flex justify-center gap-20">
              <div className="flex flex-col gap-4">
                {/* <h2 className="font-semibold text-lg">Quick Link</h2> */}
                <div className="flex flex-col gap-2">
                  {quickLink.map((item, i) => (
                    <Link
                      to={`/${item.toLowerCase().replace(" ", "-")}`}
                      key={i}
                      className="hover:underline hover:text-blue-400"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="social-link">
              <div className="flex gap-4">
                <Link
                  to="https://facebook.com"
                  className="hover:scale-150 transition-transform duration-300 hover:text-white hover:bg-blue-600 hover:rounded-full p-1"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  to="https://x.com/"
                  className="hover:scale-150 transition-transform duration-300 hover:text-white hover:bg-blue-400 hover:rounded-full p-1"
                >
                  <FaTwitter />
                </Link>
                <Link
                  to="https://instagram.com"
                  className="hover:scale-150 transition-transform duration-300 p-1 hover:bg-gradient-to-tr from-orange-500 via-pink-500  to-blue-600 hover:rounded-md hover:text-white"
                >
                  <FaInstagram />
                </Link>
                <Link
                  to="https://linkedin.com"
                  className="hover:scale-150 transition-transform duration-300 hover:text-white p-1 hover:bg-blue-500 hover:rounded-md"
                >
                  <FaLinkedin />
                </Link>
              </div>
            </div>
            <div className="links flex gap-4">
              {copyrightLinks.map((item, i) => (
                <div className="flex items-center" key={i}>
                  <Link
                    to={`/${item.toLowerCase().replaceAll(" ", "-")}`}
                    key={i}
                    className="hover:text-blue-400 hover:underline"
                  >
                    {item}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
