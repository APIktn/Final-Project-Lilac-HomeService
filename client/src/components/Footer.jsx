import React, { useState } from "react";
import HouseLogo from "../assets/images/HouseLogo.png";
import Tel_icon from "../assets/images/Tel_Icon.png";
import Mail_icon from "../assets/images/Mail_Icon.png";
import PolicyPopup from "../components/popup/PolicyPopup";
import TermsPopup from "../components/popup/TermsPopup";

const Footer = () => {
  const [showPolicyPopup, setShowPolicyPopup] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);

  const handlePolicyClick = (e) => {
    e.preventDefault();
    setShowPolicyPopup(true);
  };

  const handleTermsClick = (e) => {
    e.preventDefault();
    setShowTermsPopup(true);
  };

  return (
    <>
      <footer className="bg-white ">
        {/* แสดงเฉพาะ pc */}
        <div className="px-28 mt-4 pb-4 pt-4 flex-col md:flex-row items-center justify-between hidden sm:block">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-8">
              <a href="/" className="flex items-center">
                <img
                  src={HouseLogo}
                  alt="HomeServices Logo"
                  className="h-8 sm:h-10 mr-2"
                />
                <span className="text-[29.33px] font-medium text-blue-600">
                  HomeServices
                </span>
              </a>
            </div>
            <div className="text-lg text-left md:text-left mt-4 md:mt-0">
              <p className="text-black font-medium">
                บริษัท โฮมเซอร์วิสเซส จำกัด
              </p>
              <p className="text-gray-600 text-sm">
                452 ซอยสุขุมวิท 79 แขวงพระโขนงเหนือ เขตวัฒนา
              </p>
              <p className="text-gray-600 text-sm">กรุงเทพมหานคร 10260</p>
            </div>
            <div className=" text-base text-left mt-4 md:mt-0">
              <div className="flex items-center">
                <img src={Tel_icon} alt="Tel_icon" className="mr-2 h-4 w-4" />
                <p className="text-gray-600 text-base">080-540-63XX</p>
              </div>
              <div className="flex items-center mt-2">
                <img src={Mail_icon} alt="Mail_icon" className="mr-2 h-4 w-4" />
                <p className="text-gray-600 text-base">
                  contact@homeservices.co
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-28 mt-4 pb-4 pt-4 flex-col md:flex-row items-center justify-between bg-gray-100 hidden sm:block">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
            <p className="font-prompt text-xs font-normal leading-6 text-left text-gray-600">
              copyright © 2021 HomeServices.com All rights reserved
            </p>

            <div className="flex space-x-4 md:mt-0">
              <a
                href="#"
                className="text-gray-600 text-sm"
                onClick={handleTermsClick}
              >
                เงื่อนไขและข้อตกลงการใช้งานเว็บไซต์
              </a>
              <a
                href="#"
                className="text-gray-600 text-sm"
                onClick={handlePolicyClick}
              >
                นโยบายความเป็นส่วนตัว
              </a>
            </div>
          </div>
        </div>
        {/* แสดงเฉพาะ Mobile */}

        <div className="mt-4 pb-4 pt-4 flex flex-col md:flex-row items-center justify-between md:hidden">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-left justify-between">
            <div className=" flex items-center">
              <a href="/">
                <img
                  src={HouseLogo}
                  alt="HomeServices Logo"
                  className="h-8 sm:h-10"
                />
              </a>
              <a href="/" className=" text-[29.33px] font-medium text-blue-600">
                HomeServices
              </a>
            </div>
            <div className="text-lg text-left md:text-left mt-4 md:mt-0">
              <p className="text-black font-medium">
                บริษัท โฮมเซอร์วิสเซส จำกัด
              </p>
              <p className="text-gray-600 text-sm">
                452 ซอยสุขุมวิท 79 แขวงพระโขนงเหนือ เขตวัฒนา
              </p>
              <p className="text-gray-600 text-sm">กรุงเทพมหานคร 10260</p>
            </div>
            <div className=" text-base text-left mt-4 md:mt-0">
              <div className="flex items-center">
                <img src={Tel_icon} alt="Tel_icon" className="mr-2 h-4 w-4" />
                <p className="text-gray-600 text-base">080-540-63XX</p>
              </div>
              <div className="flex items-center mt-2">
                <img src={Mail_icon} alt="Mail_icon" className="mr-2 h-4 w-4" />
                <p className="text-gray-600 text-base">
                  contact@homeservices.co
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 pb-4 pt-4 flex flex-col md:flex-row items-center justify-between bg-gray-100 md:hidden">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-left justify-between">
            <div className="flex space-x-4 md:mt-0">
              <a
                href="#"
                className="text-gray-600 text-sm"
                onClick={handleTermsClick}
              >
                เงื่อนไขและข้อตกลงการใช้งานเว็บไซต์
              </a>
            </div>
            <div className="flex space-x-4 md:mt-0 pt-1">
              <a
                href="#"
                className="text-gray-600 text-sm"
                onClick={handlePolicyClick}
              >
                นโยบายความเป็นส่วนตัว
              </a>
            </div>
            <p className="font-prompt text-[12px] pt-4  text-left text-gray-600">
              copyright © 2021 HomeServices.com All rights reserved
            </p>
          </div>
        </div>
      </footer>
      {showPolicyPopup && (
        <PolicyPopup onClose={() => setShowPolicyPopup(false)} />
      )}
      {showTermsPopup && (
        <TermsPopup onClose={() => setShowTermsPopup(false)} />
      )}
    </>
  );
};

export default Footer;
